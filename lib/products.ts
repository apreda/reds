import { ART_VERSION } from "./art";
import variants from "./printful-variants.json";
import { getTeam, PINSTRIPE_NAVY, type Team } from "./teams";

export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export type Size = (typeof SIZES)[number];

export const STYLES = ["tee", "hoodie", "pinstripe", "nepo", "nepo-jersey", "nepo-sign"] as const;
export type Style = (typeof STYLES)[number];

// Retail prices in cents. Printful's price (blank + print) is about $12 for the
// tee (+$5.95 with a back print), $23 for the hoodie and $25.50 for the
// all-over-print pinstripe tee, +$2 at 2XL and +$4 at 3XL.
type Blank = "tee" | "hoodie" | "pinstripe";
type StyleInfo = {
  label: string; // "Tee" in "SELL Tee — OAKLAND"
  path: string; // URL segment: /<path>/<slug>
  base: number;
  ink: string;
  blank: Blank; // the Printful product it prints on
  color?: string; // a fixed blank color; otherwise the team's
  name?: string; // a full product name instead of "SELL <label>"
};
export const STYLE: Record<Style, StyleInfo> = {
  tee: { label: "Tee", path: "shirt", base: 2500, ink: "#FFFFFF", blank: "tee" },
  hoodie: { label: "Hoodie", path: "hoodie", base: 4500, ink: "#FFFFFF", blank: "hoodie" },
  // White with navy pinstripes, so SELL prints in the stripes' navy.
  pinstripe: { label: "Pinstripe Tee", path: "pinstripe", base: 3500, ink: PINSTRIPE_NAVY, blank: "pinstripe", color: "White" },
  // Cincinnati specials.
  nepo: { label: "Nepo Phil Tee", path: "nepo-phil", base: 2500, ink: "#FFFFFF", blank: "tee", color: "Red", name: "NEPO PHIL SELL Tee" },
  "nepo-jersey": { label: "Nepo Phil Jersey", path: "nepo-phil-jersey", base: 3000, ink: "#FFFFFF", blank: "tee", color: "Red", name: "NEPO PHIL Jersey Tee" },
  "nepo-sign": { label: "Nepo Phil Sign Tee", path: "nepo-phil-sign", base: 2500, ink: "#C6011F", blank: "tee", color: "Natural", name: "NEPO PHIL: SELL! Tee" },
};
export const NEPO_STYLES = ["nepo", "nepo-jersey", "nepo-sign"] as const;
const SIZE_UPCHARGE: Partial<Record<Size, number>> = { "2XL": 200, "3XL": 400 };
// Free shipping to the US and Canada; Printful charges us about $4.70–11 per order.
export const SHIPPING_CENTS = 0;

type ColorEntry = { hex: string; variants: Partial<Record<Size, number>> };
const COLORS = variants as Record<Blank, Record<string, ColorEntry>>;

export function isStyle(s: unknown): s is Style {
  return STYLES.includes(s as Style);
}

// The styles a team's shirt comes in: every team has a tee and a hoodie, and a
// few have a special edition.
export function stylesFor(team: Team): Style[] {
  return ["tee", ...(team.pinstripe ? ["pinstripe" as const] : []), ...(team.nepo ? NEPO_STYLES : []), "hoodie"];
}

// Printful color name of this team's blank in this style.
export function colorName(team: Team, style: Style): string {
  return STYLE[style].color ?? (style === "hoodie" ? team.hoodie : team.shirt);
}

export function colorHex(team: Team, style: Style): string {
  return COLORS[STYLE[style].blank][colorName(team, style)]?.hex ?? "#222222";
}

export function sizesFor(team: Team, style: Style): Size[] {
  if (!stylesFor(team).includes(style)) return [];
  const available = COLORS[STYLE[style].blank][colorName(team, style)]?.variants ?? {};
  return SIZES.filter((s) => s in available);
}

export function priceFor(style: Style, size: Size): number {
  return STYLE[style].base + (SIZE_UPCHARGE[size] ?? 0);
}

export function printfulVariantId(team: Team, style: Style, size: Size): number | undefined {
  return COLORS[STYLE[style].blank][colorName(team, style)]?.variants[size];
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
}

// Only "SELL" and the city line: never a team name or nickname.
export function productName(team: Team, style: Style): string {
  return `${STYLE[style].name ?? `SELL ${STYLE[style].label}`} — ${team.city}`;
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
