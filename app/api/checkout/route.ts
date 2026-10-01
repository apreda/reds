import { NextResponse } from "next/server";
import { SHIPPING_CENTS, STYLE, colorName, mockupPath, productName, resolveLine, type CartLine } from "@/lib/products";
import { embeddedCheckout, ordersOpen, siteUrl } from "@/lib/site";
import { stripe } from "@/lib/stripe";
import { leagueOf } from "@/lib/teams";

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
  const embedded = embeddedCheckout();
  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      // Embedded: Stripe's form renders on /checkout and returns to the success
      // page. Hosted (no publishable key configured): redirect to Stripe.
      ...(embedded
        ? { ui_mode: "embedded_page", return_url: `${base}/order/success?session_id={CHECKOUT_SESSION_ID}` }
        : { success_url: `${base}/order/success?session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${base}/cart` }),
      integration_identifier: `sellmyteam_${embedded ? "embedded" : "hosted"}_qvzhkmwr`,
      line_items: resolved.map((r) => ({
        quantity: r!.qty,
        price_data: {
          currency: "usd",
          unit_amount: r!.unit,
          product_data: {
            // Also the Printful item name (see the webhook): never a team name.
            name: `${productName(r!.team, r!.style)} (${r!.size})`,
            description: `${leagueOf(r!.team.league).sport} · ${colorName(r!.team, r!.style)} ${STYLE[r!.style].label.toLowerCase()}, printed to order`,
            images: [`${base}${mockupPath(r!.team, r!.style)}`],
            // Read back by the webhook to build the Printful order.
            metadata: { slug: r!.team.slug, style: r!.style, size: r!.size },
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Free shipping (printed to order)",
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
    });
    return NextResponse.json(embedded ? { clientSecret: session.client_secret } : { url: session.url });
  } catch (e) {
    console.error("checkout error", e);
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 500 });
  }
}
