// Regenerates lib/printful-variants.json from Printful's public catalog for the
// Bella+Canvas 3001 (Printful product 71). Run: node scripts/sync-printful-variants.mjs
import { writeFileSync } from "node:fs";

const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
const res = await fetch("https://api.printful.com/products/71");
const { result } = await res.json();
const out = {};
for (const v of result.variants) {
  if (!SIZES.includes(v.size)) continue;
  const c = (out[v.color] ??= { hex: v.color_code, variants: {} });
  if (v.availability_status?.some((s) => s.region === "US" && s.status === "in_stock")) {
    c.variants[v.size] = v.id;
  }
}
writeFileSync(new URL("../lib/printful-variants.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(`wrote ${Object.keys(out).length} colors`);
