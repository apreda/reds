import variants from "./printful-variants.json";
import { getTeam, type Team } from "./teams";

export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export type Size = (typeof SIZES)[number];

// Retail prices in cents. Printful's blank + print cost for a Bella+Canvas
// 3001 is roughly $12-16 depending on size, so these leave a small margin.
const BASE_PRICE = 2500;
const SIZE_UPCHARGE: Partial<Record<Size, number>> = { "2XL": 200, "3XL": 400 };
export const SHIPPING_CENTS = 599;

type ColorEntry = { hex: string; variants: Partial<Record<Size, number>> };
const COLORS = variants as Record<string, ColorEntry>;

export function shirtHex(team: Team): string {
  return COLORS[team.shirt]?.hex ?? "#222222";
}

export function sizesFor(team: Team): Size[] {
  const available = COLORS[team.shirt]?.variants ?? {};
  return SIZES.filter((s) => s in available);
}

export function priceFor(size: Size): number {
  return BASE_PRICE + (SIZE_UPCHARGE[size] ?? 0);
}

export function printfulVariantId(team: Team, size: Size): number | undefined {
  return COLORS[team.shirt]?.variants[size];
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
}

export function productName(team: Team): string {
  return `SELL Tee — ${team.city}`;
}

export type CartLine = { slug: string; size: Size; qty: number };

// Validates a client-supplied cart line against the catalog.
export function resolveLine(line: CartLine) {
  const team = getTeam(line.slug);
  if (!team) return null;
  if (!sizesFor(team).includes(line.size)) return null;
  const qty = Math.floor(Number(line.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 20) return null;
  return { team, size: line.size, qty, unit: priceFor(line.size) };
}
