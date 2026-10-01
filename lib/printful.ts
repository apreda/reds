import { ART_VERSION, PINSTRIPE_PANELS } from "./art";
import { printfulVariantId, type Size, type Style } from "./products";
import { siteUrl } from "./site";
import { getTeam } from "./teams";

const API = "https://api.printful.com";

export type FulfillmentItem = { slug: string; style: Style; size: Size; qty: number; unitCents: number; name: string };
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

// Files for one Printful order item: the front print, or every panel of the
// all-over-print pinstripe tee.
export function printFiles(slug: string, style: Style): { type: string; url: string }[] {
  const v = `?v=${ART_VERSION}`;
  // Cincinnati specials print from fixed files in public/print.
  if (style === "nepo") return [{ type: "default", url: `${siteUrl()}/print/nepo-phil.png${v}` }];
  if (style === "nepo-sign") return [{ type: "default", url: `${siteUrl()}/print/nepo-phil-sign.png${v}` }];
  if (style === "nepo-jersey") {
    return [
      { type: "default", url: `${siteUrl()}/print/nepo-phil-jersey-front.png${v}` },
      { type: "back", url: `${siteUrl()}/print/nepo-phil-jersey-back.png${v}` },
    ];
  }
  if (style === "pinstripe") {
    return PINSTRIPE_PANELS.map((p) => ({ type: `${p}_dtfabric`, url: `${siteUrl()}/api/print/pinstripe/${p}.png${v}` }));
  }
  return [{ type: "default", url: `${siteUrl()}/api/print/${style === "tee" ? "" : `${style}/`}${slug}.png${v}` }];
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
    const variant_id = team && printfulVariantId(team, it.style, it.size);
    if (!team || !variant_id) throw new Error(`No Printful variant for ${it.slug} / ${it.style} / ${it.size}`);
    return {
      variant_id,
      quantity: it.qty,
      name: it.name,
      retail_price: dollars(it.unitCents),
      files: printFiles(team.slug, it.style),
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
