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
