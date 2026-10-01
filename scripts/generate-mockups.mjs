// Makes Printful flat-lay photos of every product with the Mockup Generator:
// the tee (Bella+Canvas 3001) and hoodie (Gildan 18500) in each team color, and
// the all-over-print pinstripe tee, saved to public/mockups/[<style>/]<slug>.png.
// The print is the same for every team, so each color is rendered once.
//
//   node --env-file=.env.local scripts/generate-mockups.mjs [tee|hoodie|pinstripe ...] [team-slug ...] [--missing] [--options]
//
// --missing fills in only teams without a photo, copying one from another team
// in the same color when there is one and rendering only new colors.
//
// Env: PRINTFUL_API_TOKEN, PRINTFUL_STORE_ID, and BASE_URL: a public URL
// serving this code's print files (Printful downloads them itself). Needs Node
// 23.6+ because it imports lib/teams.ts directly. Bump ART_VERSION in
// lib/art.ts after regenerating.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { TEAMS } from "../lib/teams.ts";

const API = "https://api.printful.com";
const front = (path, area) => (slug) => [{ placement: "front", path: `${path}${slug}.png`, area }];
const PANELS = { front: [4200, 5400], back: [4200, 5400], sleeve_left: [3000, 1800], sleeve_right: [3000, 1800] };
const STYLES = {
  tee: { product: 71, color: (t) => t.shirt, files: front("", [1800, 2400]), out: "" },
  hoodie: { product: 146, color: (t) => t.hoodie, files: front("hoodie/", [2100, 2100]), out: "hoodie/" },
  pinstripe: {
    product: 1414,
    color: () => "White",
    only: (t) => t.pinstripe,
    files: () =>
      Object.entries(PANELS).map(([p, area]) => ({ placement: `${p}_dtfabric`, path: `pinstripe/${p}.png`, area })),
    out: "pinstripe/",
  },
};

const { PRINTFUL_API_TOKEN: token, PRINTFUL_STORE_ID: store } = process.env;
const base = process.env.BASE_URL?.replace(/\/$/, "");
if (!token || !store) throw new Error("Set PRINTFUL_API_TOKEN and PRINTFUL_STORE_ID");
const variants = JSON.parse(readFileSync(new URL("../lib/printful-variants.json", import.meta.url), "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pf(path, body) {
  for (;;) {
    const res = await fetch(API + path, {
      method: body ? "POST" : "GET",
      headers: { Authorization: `Bearer ${token}`, "X-PF-Store-Id": store, "Content-Type": "application/json" },
      body: body && JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (res.status === 429) {
      // Mockup tasks are rate limited per minute; Printful says how long to wait.
      const wait = Number(/(\d+) seconds/.exec(JSON.stringify(json))?.[1] ?? 60);
      console.log(`  rate limited, waiting ${wait}s`);
      await sleep((wait + 1) * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`${path} ${res.status}: ${JSON.stringify(json)}`);
    return json.result;
  }
}

const args = process.argv.slice(2);
const styles = args.filter((a) => a in STYLES);
const slugs = new Set(args.filter((a) => TEAMS.some((t) => t.slug === a)));
if (args.includes("--options")) {
  for (const s of styles.length ? styles : Object.keys(STYLES)) {
    const r = await pf(`/mockup-generator/printfiles/${STYLES[s].product}`);
    console.log(`${s} option groups: ${r.option_groups.join(", ")}\n${s} options: ${r.options.join(", ")}`);
  }
  process.exit(0);
}
if (!base) throw new Error("Set BASE_URL to a public URL serving /api/print/...");

for (const style of styles.length ? styles : Object.keys(STYLES)) {
  const { product, color, only = () => true, files, out } = STYLES[style];
  const dir = new URL(`../public/mockups/${out}`, import.meta.url);
  mkdirSync(dir, { recursive: true });
  const byColor = Map.groupBy(TEAMS.filter((t) => only(t) && (!slugs.size || slugs.has(t.slug))), color);
  const photo = (t) => new URL(`${t.slug}.png`, dir);
  for (const [name, all] of byColor) {
    let teams = all;
    if (args.includes("--missing")) {
      teams = all.filter((t) => !existsSync(photo(t)));
      if (!teams.length) continue;
      const donor = TEAMS.find((t) => only(t) && color(t) === name && existsSync(photo(t)));
      if (donor) {
        for (const t of teams) copyFileSync(photo(donor), photo(t));
        console.log(`${style} ${name}: copied from ${donor.slug} to ${teams.map((t) => t.slug).join(", ")}`);
        continue;
      }
    }
    const variant = variants[style][name]?.variants?.M;
    if (!variant) throw new Error(`No Printful ${style} variant for ${name}`);
    const task = await pf(`/mockup-generator/create-task/${product}`, {
      variant_ids: [variant],
      format: "png",
      option_groups: ["Flat"],
      options: ["Front"],
      files: files(teams[0].slug).map(({ placement, path, area: [w, h] }) => ({
        placement,
        image_url: `${base}/api/print/${path}?v=${Date.now()}`,
        position: { area_width: w, area_height: h, width: w, height: h, top: 0, left: 0 },
      })),
    });
    let result;
    do {
      await sleep(4000);
      result = await pf(`/mockup-generator/task?task_key=${task.task_key}`);
    } while (result.status === "pending");
    if (result.status !== "completed") throw new Error(`${style} ${name}: ${JSON.stringify(result)}`);

    const shot = result.mockups.find((m) => m.placement.startsWith("front")) ?? result.mockups[0];
    const png = Buffer.from(await (await fetch(shot.mockup_url)).arrayBuffer());
    for (const t of teams) writeFileSync(new URL(`${t.slug}.png`, dir), png);
    console.log(`${style} ${name} (${Math.round(png.length / 1024)} KB): ${teams.map((t) => t.slug).join(", ")}`);
  }
}
