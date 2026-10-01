# Sell My Team

Protest tees and hoodies for fans whose owners stopped listening, one for every MLB, NBA and NFL fan base (92 teams). The idea comes from the green "SELL" shirts Oakland A's fans wore to the June 13, 2023 reverse boycott.

- **Stack:** Next.js (App Router) on Vercel
- **Payments:** Stripe Checkout
- **Fulfillment:** Printful print-on-demand (Bella+Canvas 3001 tee, Gildan 18500 hoodie). No inventory: each paid order is sent to Printful automatically, and Printful prints and ships it.

## How it works

| Piece | Where |
| --- | --- |
| Team catalog (listing name, Printful tee and hoodie colors) | `lib/teams.ts` |
| Styles (tee, hoodie), prices, sizes, shipping | `lib/products.ts` |
| Printful variant IDs per color/size | `lib/printful-variants.json` (regenerate with `node scripts/sync-printful-variants.mjs`) |
| Photos (site, bag, Stripe Checkout) | `public/mockups/<slug>.png` and `public/mockups/hoodie/<slug>.png`, shown by `components/ProductPhoto.tsx` |
| Print-ready PNGs sent to Printful (150dpi, Inter SemiBold lettering; layout in `lib/print.tsx`) | `/api/print/<slug>.png` (tee, 12"x16"), `/api/print/city/<slug>.png` (tee with the city), `/api/print/hoodie/<slug>.png` (hoodie, 14"x14"), `public/print/` (Cincinnati specials) |
| Old mockup URL, redirects to the photo | `/api/mockup/<slug>` |
| Create Stripe Checkout session (embedded on `/checkout` when `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set, else hosted) | `POST /api/checkout` |
| Stripe webhook → Printful order | `POST /api/webhooks/stripe` |

Each team has two tees, white "SELL" on the team's main color and the same with the city underneath, plus a SELL hoodie; Cincinnati also has three NEPO PHIL tees. Shirts and product listings never carry team names or logos: listings are named by city or neighborhood, the nickname is kept in `lib/teams.ts` as a hidden search keyword, and a not-affiliated disclaimer is in the footer, the FAQ and the announcement bar.

## Photos

Every photo comes from the print files, so the lettering always matches what Printful prints. After changing the artwork, a color or a team, serve this code at a public URL (the production site, or `cloudflared tunnel --url http://localhost:3000` against `npm run dev`), regenerate with Printful's Mockup Generator, bump `ART_VERSION` in `lib/art.ts` (Printful and `next/image` both cache by URL), and commit `public/mockups/`:

```bash
BASE_URL=https://<public url> node --env-file=.env.local scripts/generate-mockups.mjs [tee|hoodie]
```

It needs `PRINTFUL_API_TOKEN` and `PRINTFUL_STORE_ID`, renders one flat-lay per color (Printful allows about one a minute), and copies it to every team in that color.

City tee photos are made from those: `BASE_URL=http://localhost:3000 python3 scripts/city-mockups.py` adds each team's city line to its plain tee photo, in the same place and scale Printful prints it.

## Local dev

```bash
npm install
npm run dev
```

Until `ORDERS_OPEN=true` (and `STRIPE_SECRET_KEY`) is set, the site runs in **coming-soon mode**: browsing and the bag work, but checkout shows "Coming soon". To open ordering: `vercel env add ORDERS_OPEN production` (value `true`), then redeploy.

## Going live (checklist)

1. **Vercel.** Import this repo (framework is Next.js, already pinned in `vercel.json`). Add your domain and set `NEXT_PUBLIC_SITE_URL` to it.
2. **Printful.** Create a free account, then add a "Manual order platform / API" store. Under *Settings → API* create a private token with order scopes, and set `PRINTFUL_API_TOKEN` (and `PRINTFUL_STORE_ID` if the token covers several stores). Add a payment method in Printful billing, since Printful charges you its cost for each order.
3. **Stripe.** Set `STRIPE_SECRET_KEY` and the same account's `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (for the embedded checkout). Under *Developers → Webhooks* add the endpoint `https://<your-domain>/api/webhooks/stripe` with events `checkout.session.completed` and `checkout.session.async_payment_succeeded`, then set `STRIPE_WEBHOOK_SECRET` to its signing secret.
4. **Redeploy.** Env vars are read at build time for the "orders open" banner.
5. **Test.** Place an order with Stripe test keys. It shows up in Printful as a **draft**. Check that the print file and placement look right, then set `PRINTFUL_AUTO_CONFIRM=true` so paid orders go straight to production.

Without a Printful token the webhook still acknowledges payments and logs `needs manual fulfillment`. Nothing is lost, because every order is in the Stripe dashboard.

## Pricing

$25 per tee ($30 for the NEPO PHIL jersey) and $45 per hoodie (+$2 for 2XL, +$4 for 3XL), with free shipping to the US and Canada, all set in `lib/products.ts`. Printful charges $11.92 per tee and $22.63 per hoodie (same size upcharges), plus its shipping (US: $4.95 for one tee, $7.15 for two, $8.79 for a hoodie; Canada about $2–4 more). After Stripe's 2.9% + 30¢, a single-item US order nets about $7.10 on a tee and $12 on a hoodie.
