import { NextResponse } from "next/server";
import { SHIPPING_CENTS, mockupPath, productName, resolveLine, type CartLine } from "@/lib/products";
import { ordersOpen, siteUrl } from "@/lib/site";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!ordersOpen()) {
    return NextResponse.json({ error: "Orders aren't open yet. Check back soon!" }, { status: 503 });
  }

  let lines: CartLine[];
  try {
    ({ lines } = await req.json());
    if (!Array.isArray(lines) || lines.length === 0 || lines.length > 30) throw new Error();
  } catch {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  const resolved = lines.map(resolveLine);
  if (resolved.some((r) => !r)) {
    return NextResponse.json({ error: "Something in your bag is no longer available. Please refresh." }, { status: 400 });
  }

  const base = siteUrl();
  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: resolved.map((r) => ({
        quantity: r!.qty,
        price_data: {
          currency: "usd",
          unit_amount: r!.unit,
          product_data: {
            // Also the Printful item name (see the webhook): never a team name.
            name: `${productName(r!.team)} (${r!.size})`,
            description: `${r!.team.shirt} tee, printed to order`,
            images: [`${base}${mockupPath(r!.team)}`],
            // Read back by the webhook to build the Printful order.
            metadata: { slug: r!.team.slug, size: r!.size },
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Standard (printed to order)",
            fixed_amount: { amount: SHIPPING_CENTS, currency: "usd" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 12 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      success_url: `${base}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cart`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("checkout error", e);
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 500 });
  }
}
