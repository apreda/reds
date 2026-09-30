import { ART_VERSION } from "./art";
import { printfulVariantId, type Size } from "./products";
import { siteUrl } from "./site";
import { getTeam } from "./teams";

const API = "https://api.printful.com";

export type FulfillmentItem = { slug: string; size: Size; qty: number; unitCents: number; name: string };
export type Recipient = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  email?: string;
  phone?: string;
};

export function printfulConfigured(): boolean {
  return Boolean(process.env.PRINTFUL_API_TOKEN);
}

export function printFileUrl(slug: string): string {
  return `${siteUrl()}/api/print/${slug}.png?v=${ART_VERSION}`;
}

const dollars = (cents: number) => (cents / 100).toFixed(2);

// Creates (and optionally confirms) a Printful order. Idempotent on externalId:
// Printful rejects a second order with the same external_id, which we treat as success.
export async function createPrintfulOrder(opts: {
  externalId: string;
  recipient: Recipient;
  items: FulfillmentItem[];
  shippingCents: number;
  taxCents: number;
  totalCents: number;
}): Promise<{ id?: number; duplicate?: boolean }> {
  const items = opts.items.map((it) => {
    const team = getTeam(it.slug);
    const variant_id = team && printfulVariantId(team, it.size);
    if (!team || !variant_id) throw new Error(`No Printful variant for ${it.slug} / ${it.size}`);
    return {
      variant_id,
      quantity: it.qty,
      name: it.name,
      retail_price: dollars(it.unitCents),
      files: [{ type: "default", url: printFileUrl(team.slug) }],
    };
  });

  const subtotal = opts.items.reduce((n, it) => n + it.unitCents * it.qty, 0);
  const confirm = process.env.PRINTFUL_AUTO_CONFIRM === "true";
  const headers: Record<string, string> = {
    Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
    "Content-Type": "application/json",
  };
  if (process.env.PRINTFUL_STORE_ID) headers["X-PF-Store-Id"] = process.env.PRINTFUL_STORE_ID;

  const res = await fetch(`${API}/orders?confirm=${confirm}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      external_id: opts.externalId,
      shipping: "STANDARD",
      recipient: opts.recipient,
      items,
      retail_costs: {
        currency: "USD",
        subtotal: dollars(subtotal),
        shipping: dollars(opts.shippingCents),
        tax: dollars(opts.taxCents),
        total: dollars(opts.totalCents),
      },
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = JSON.stringify(body);
    if (/external[_ ]?id/i.test(msg) && /(exist|already|taken|unique)/i.test(msg)) return { duplicate: true };
    throw new Error(`Printful ${res.status}: ${msg}`);
  }
  return { id: body?.result?.id };
}
