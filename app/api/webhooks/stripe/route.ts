import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createPrintfulOrder, printfulConfigured, type FulfillmentItem } from "@/lib/printful";
import { SIZES, isStyle, type Size } from "@/lib/products";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 500 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(raw, req.headers.get("stripe-signature") ?? "", secret);
  } catch (e) {
    return NextResponse.json({ error: `Bad signature: ${(e as Error).message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status === "unpaid") {
    // Delayed payment method; we'll get async_payment_succeeded later.
    return NextResponse.json({ received: true, pending: true });
  }

  if (!printfulConfigured()) {
    // Payment is safe in Stripe; fulfill manually until Printful is connected.
    console.warn(`[fulfillment] PRINTFUL_API_TOKEN not set; order ${session.id} needs manual fulfillment`);
    return NextResponse.json({ received: true, fulfillment: "manual" });
  }

  try {
    const lineItems = await stripe().checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ["data.price.product"],
    });
    const items: FulfillmentItem[] = lineItems.data.map((li) => {
      const product = li.price?.product as Stripe.Product;
      const size = product.metadata.size as Size;
      // Orders placed before hoodies existed have no style: they're tees.
      const style = product.metadata.style ?? "tee";
      if (!product.metadata.slug || !SIZES.includes(size) || !isStyle(style)) {
        throw new Error(`Line item missing metadata: ${li.id}`);
      }
      return {
        slug: product.metadata.slug,
        style,
        size,
        qty: li.quantity ?? 1,
        unitCents: li.price?.unit_amount ?? 0,
        name: product.name,
      };
    });

    const shipping =
      session.collected_information?.shipping_details ??
      (session as unknown as { shipping_details?: Stripe.Checkout.Session.CollectedInformation.ShippingDetails })
        .shipping_details;
    const addr = shipping?.address;
    if (!addr?.line1 || !addr.city || !addr.country || !addr.postal_code) {
      throw new Error(`Session ${session.id} has no shipping address`);
    }

    const result = await createPrintfulOrder({
      externalId: `stt_${session.id.slice(-28)}`,
      recipient: {
        name: shipping!.name ?? session.customer_details?.name ?? "Customer",
        address1: addr.line1,
        address2: addr.line2 ?? undefined,
        city: addr.city,
        state_code: addr.state ?? undefined,
        country_code: addr.country,
        zip: addr.postal_code,
        email: session.customer_details?.email ?? undefined,
        phone: session.customer_details?.phone ?? undefined,
      },
      items,
      shippingCents: session.shipping_cost?.amount_total ?? 0,
      taxCents: session.total_details?.amount_tax ?? 0,
      totalCents: session.amount_total ?? 0,
    });
    console.log(`[fulfillment] session ${session.id} -> printful`, result);
    return NextResponse.json({ received: true, printful: result });
  } catch (e) {
    // 500 makes Stripe retry the webhook (it backs off for up to 3 days).
    console.error(`[fulfillment] failed for ${session.id}`, e);
    return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
  }
}
