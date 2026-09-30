// Regenerates lib/printful-variants.json from Printful's public catalog: the
// Bella+Canvas 3001 tee (product 71) and the Gildan 18500 hoodie (product 146).
// Run: node scripts/sync-printful-variants.mjs
import { writeFileSync } from "node:fs";

const PRODUCTS = { tee: 71, hoodie: 146 };
const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

const out = {};
for (const [style, id] of Object.entries(PRODUCTS)) {
  const { result } = await (await fetch(`https://api.printful.com/products/${id}`)).json();
  const colors = {};
  for (const v of result.variants) {
    if (!SIZES.includes(v.size)) continue;
    const c = (colors[v.color] ??= { hex: v.color_code, variants: {} });
    if (v.availability_status?.some((s) => s.region === "US" && s.status === "in_stock")) {
      c.variants[v.size] = v.id;
    }
  }
  out[style] = colors;
  console.log(`${style}: ${Object.keys(colors).length} colors`);
}
writeFileSync(new URL("../lib/printful-variants.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
