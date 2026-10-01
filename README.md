# Sell The Team

Protest tees and hoodies for baseball fans whose owners stopped listening, one for each of the 30 MLB fan bases. The idea comes from the green "SELL" shirts Oakland A's fans wore to the June 13, 2023 reverse boycott.

- **Stack:** Next.js (App Router) on Vercel
- **Payments:** Stripe Checkout
- **Fulfillment:** Printful print-on-demand (Bella+Canvas 3001 tee, Gildan 18500 hoodie, and an all-over-print cotton tee for the Yankees pinstripe edition). No inventory: each paid order is sent to Printful automatically, and Printful prints and ships it.

## How it works

| Piece | Where |
| --- | --- |
| Team catalog (listing name, Printful tee and hoodie colors) | `lib/teams.ts` |
| Styles (tee, hoodie), prices, sizes, shipping | `lib/products.ts` |
| Printful variant IDs per color/size | `lib/printful-variants.json` (regenerate with `node scripts/sync-printful-variants.mjs`) |
| Photos (site, bag, Stripe Checkout) | `public/mockups/<slug>.png` and `public/mockups/hoodie/<slug>.png`, shown by `components/ProductPhoto.tsx` |
| Print-ready PNGs sent to Printful (150dpi, Inter SemiBold lettering; layout in `lib/print.tsx`) | `/api/print/<slug>.png` (tee, 12"x16"), `/api/print/hoodie/<slug>.png` (hoodie, 14"x14"), `/api/print/pinstripe/<panel>.png` (pinstripe front, back and sleeves) |
| Old mockup URL, redirects to the photo | `/api/mockup/<slug>` |
| Create Stripe Checkout session | `POST /api/checkout` |
| Stripe webhook → Printful order | `POST /api/webhooks/stripe` |

Every shirt is the same white "SELL" on the team's main color, like the Oakland originals (black only for the White Sox). The Yankees also get a white pinstripe tee with navy SELL. Shirts and product listings never carry team names or logos: listings are named by city or neighborhood, the nickname is kept in `lib/teams.ts` as a hidden search keyword, and a not-affiliated disclaimer is in the footer, the FAQ and the announcement bar.

## Photos

Every photo comes from the print files, so the lettering always matches what Printful prints. After changing the artwork, a color or a team, serve this code at a public URL (the production site, or `cloudflared tunnel --url http://localhost:3000` against `npm run dev`), regenerate with Printful's Mockup Generator, bump `ART_VERSION` in `lib/art.ts` (Printful and `next/image` both cache by URL), and commit `public/mockups/`:

```bash
BASE_URL=https://<public url> node --env-file=.env.local scripts/generate-mockups.mjs [tee|hoodie]
```

It needs `PRINTFUL_API_TOKEN` and `PRINTFUL_STORE_ID`, renders one flat-lay per color (Printful allows about one a minute), and copies it to every team in that color.

## Local dev

```bash
npm install
npm run dev
```

Until `STRIPE_SECRET_KEY` is set, the site runs in **pre-launch mode**: browsing and the bag work, but checkout shows "Orders open soon".

## Going live (checklist)

1. **Vercel.** Import this repo (framework is Next.js, already pinned in `vercel.json`). Add your domain and set `NEXT_PUBLIC_SITE_URL` to it.
2. **Printful.** Create a free account, then add a "Manual order platform / API" store. Under *Settings → API* create a private token with order scopes, and set `PRINTFUL_API_TOKEN` (and `PRINTFUL_STORE_ID` if the token covers several stores). Add a payment method in Printful billing, since Printful charges you its cost for each order.
3. **Stripe.** Set `STRIPE_SECRET_KEY`. Under *Developers → Webhooks* add the endpoint `https://<your-domain>/api/webhooks/stripe` with events `checkout.session.completed` and `checkout.session.async_payment_succeeded`, then set `STRIPE_WEBHOOK_SECRET` to its signing secret.
4. **Redeploy.** Env vars are read at build time for the "orders open" banner.
5. **Test.** Place an order with Stripe test keys. It shows up in Printful as a **draft**. Check that the print file and placement look right, then set `PRINTFUL_AUTO_CONFIRM=true` so paid orders go straight to production.

Without a Printful token the webhook still acknowledges payments and logs `needs manual fulfillment`. Nothing is lost, because every order is in the Stripe dashboard.

## Pricing

$25 per tee, $35 for the pinstripe tee and $45 per hoodie (+$2 for 2XL, +$4 for 3XL) and flat $5.99 shipping per order, all set in `lib/products.ts`. Printful charges about $12 per tee and $23 per hoodie (same size upcharges) plus its shipping, so a single-item order nets roughly $8–10 on a tee and $15–18 on a hoodie before Stripe fees.
