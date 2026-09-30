import { ART_VERSION } from "./art";
import variants from "./printful-variants.json";
import { getTeam, type Team } from "./teams";

export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export type Size = (typeof SIZES)[number];

export const STYLES = ["tee", "hoodie"] as const;
export type Style = (typeof STYLES)[number];

// Retail prices in cents. Printful's price (blank + front print) is about $12
// for the tee and $23 for the hoodie, +$2 at 2XL and +$4 at 3XL.
type StyleInfo = { label: string; blank: string; path: string; base: number };
export const STYLE: Record<Style, StyleInfo> = {
  tee: { label: "Tee", blank: "Bella+Canvas 3001", path: "shirt", base: 2500 },
  hoodie: { label: "Hoodie", blank: "Gildan 18500", path: "hoodie", base: 4500 },
};
const SIZE_UPCHARGE: Partial<Record<Size, number>> = { "2XL": 200, "3XL": 400 };
export const SHIPPING_CENTS = 599;

type ColorEntry = { hex: string; variants: Partial<Record<Size, number>> };
const COLORS = variants as Record<Style, Record<string, ColorEntry>>;

export function isStyle(s: unknown): s is Style {
  return STYLES.includes(s as Style);
}

// Printful color name of this team's blank in this style.
export function colorName(team: Team, style: Style): string {
  return style === "tee" ? team.shirt : team.hoodie;
}

export function colorHex(team: Team, style: Style): string {
  return COLORS[style][colorName(team, style)]?.hex ?? "#222222";
}

export function sizesFor(team: Team, style: Style): Size[] {
  const available = COLORS[style][colorName(team, style)]?.variants ?? {};
  return SIZES.filter((s) => s in available);
}

export function priceFor(style: Style, size: Size): number {
  return STYLE[style].base + (SIZE_UPCHARGE[size] ?? 0);
}

export function printfulVariantId(team: Team, style: Style, size: Size): number | undefined {
  return COLORS[style][colorName(team, style)]?.variants[size];
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
}

// Only "SELL" and the city line: never a team name or nickname.
export function productName(team: Team, style: Style): string {
  return `SELL ${STYLE[style].label} — ${team.city}`;
}

export function productPath(team: Team, style: Style): string {
  return `/${STYLE[style].path}/${team.slug}`;
}

// Printful's flat-lay photo of the printed blank (scripts/generate-mockups.mjs).
export function mockupPath(team: Team, style: Style): string {
  return `/mockups/${style === "tee" ? "" : `${style}/`}${team.slug}.png?v=${ART_VERSION}`;
}

// Carts saved before hoodies existed have no style: those lines are tees.
export type CartLine = { slug: string; style?: Style; size: Size; qty: number };

// Validates a client-supplied cart line against the catalog.
export function resolveLine(line: CartLine) {
  const team = getTeam(line.slug);
  const style = line.style ?? "tee";
  if (!team || !isStyle(style)) return null;
  if (!sizesFor(team, style).includes(line.size)) return null;
  const qty = Math.floor(Number(line.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 20) return null;
  return { team, style, size: line.size, qty, unit: priceFor(style, line.size) };
}
