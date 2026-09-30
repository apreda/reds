# Sell The Team

Protest tees for baseball fans whose owners stopped listening, one for each of the 30 MLB fan bases. The idea comes from the green "SELL" shirts Oakland A's fans wore to the June 13, 2023 reverse boycott.

- **Stack:** Next.js (App Router) on Vercel
- **Payments:** Stripe Checkout
- **Fulfillment:** Printful print-on-demand (Bella+Canvas 3001). No inventory: each paid order is sent to Printful automatically, and Printful prints and ships it.

## How it works

| Piece | Where |
| --- | --- |
| Team catalog (city, colorway, Printful shirt color) | `lib/teams.ts` |
| Prices, sizes, shipping | `lib/products.ts` |
| Printful variant IDs per color/size | `lib/printful-variants.json` (regenerate with `node scripts/sync-printful-variants.mjs`) |
| Shirt photos (site, bag, Stripe Checkout) | `public/mockups/<slug>.png`, shown by `components/Tee.tsx` |
| Print-ready PNG sent to Printful (12"x16" @150dpi, transparent, Inter Bold lettering) | `/api/print/<slug>.png` |
| Old mockup URL, redirects to the photo | `/api/mockup/<slug>` |
| Create Stripe Checkout session | `POST /api/checkout` |
| Stripe webhook → Printful order | `POST /api/webhooks/stripe` |

Shirts and product listings never carry team names or logos, only "SELL", a city or neighborhood, and colors. The nickname is kept in `lib/teams.ts` as a hidden search keyword, and a not-affiliated disclaimer is in the footer, the FAQ and the announcement bar.

## Shirt photos

Every shirt image comes from the print file, so the lettering always matches what Printful prints. Regenerate the photos after changing the artwork, a colorway or a team, then commit `public/mockups/`:

- **Printful Mockup Generator (preferred).** Printful fetches the print files itself, so serve this code at a public URL first (the production site, or `cloudflared tunnel --url http://localhost:3000` against `npm run dev`), then run `node --env-file=.env.local scripts/generate-mockups.mjs` with `PRINTFUL_API_TOKEN` and `BASE_URL` set. `--options` lists the available styles (`MOCKUP_STYLE`, default `Flat`).
- **Fallback, no token needed.** `BASE_URL=http://localhost:3000 python3 scripts/composite-mockups.py` prints the artwork onto Printful's catalog photo of the blank tee in each color (needs numpy, scipy and Pillow).

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

$25 per tee (+$2 for 2XL, +$4 for 3XL) and flat $5.99 shipping, all set in `lib/products.ts`. Printful's cost is about $12–16 per shirt plus its shipping, so each order nets roughly $8–10 before Stripe fees.
