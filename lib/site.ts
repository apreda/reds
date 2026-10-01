export const SITE_NAME = "Sell The Team";
export const SITE_TAGLINE = "Wear it until they sell.";

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// Checkout is live only once Stripe is configured.
export function ordersOpen(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

// With a publishable key (from the same Stripe account as STRIPE_SECRET_KEY),
// checkout is Stripe's embedded form on /checkout instead of a redirect.
export function embeddedCheckout(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}
