// Makes one photo mockup per team with Printful's Mockup Generator (Bella+Canvas
// 3001, product 71) from that team's print file, and saves it to
// public/mockups/<slug>.png. Printful fetches the print files itself, so BASE_URL
// must be a public URL serving this code's /api/print/<slug>.png.
//
//   node --env-file=.env.local scripts/generate-mockups.mjs [--options] [slug ...]
//
// Env: PRINTFUL_API_TOKEN, BASE_URL, and optionally PRINTFUL_STORE_ID and
// MOCKUP_STYLE (a Printful option group, listed by --options). Needs Node 23.6+
// because it imports lib/teams.ts directly.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { TEAMS } from "../lib/teams.ts";

const API = "https://api.printful.com";
const PRODUCT = 71;
const PRINT_AREA = { area_width: 1800, area_height: 2400, width: 1800, height: 2400, top: 0, left: 0 };
const STYLE = process.env.MOCKUP_STYLE ?? "Flat";
const OUT = new URL("../public/mockups/", import.meta.url);

const token = process.env.PRINTFUL_API_TOKEN;
const base = process.env.BASE_URL?.replace(/\/$/, "");
if (!token) throw new Error("Set PRINTFUL_API_TOKEN");
const colors = JSON.parse(readFileSync(new URL("../lib/printful-variants.json", import.meta.url), "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pf(path, body) {
  for (;;) {
    const res = await fetch(API + path, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(process.env.PRINTFUL_STORE_ID ? { "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID } : {}),
      },
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
if (args.includes("--options")) {
  const r = await pf(`/mockup-generator/printfiles/${PRODUCT}`);
  console.log("option groups:", r.option_groups.join(", "));
  console.log("options:", r.options.join(", "));
  process.exit(0);
}
if (!base) throw new Error("Set BASE_URL to a public URL serving /api/print/<slug>.png");

const teams = args.length ? TEAMS.filter((t) => args.includes(t.slug)) : TEAMS;
mkdirSync(OUT, { recursive: true });

for (const team of teams) {
  const variant = colors[team.shirt]?.variants?.M;
  if (!variant) throw new Error(`No Printful variant for ${team.shirt}`);
  const task = await pf(`/mockup-generator/create-task/${PRODUCT}`, {
    variant_ids: [variant],
    format: "png",
    option_groups: [STYLE],
    files: [{ placement: "front", image_url: `${base}/api/print/${team.slug}.png?v=${Date.now()}`, position: PRINT_AREA }],
  });
  let result;
  do {
    await sleep(4000);
    result = await pf(`/mockup-generator/task?task_key=${task.task_key}`);
  } while (result.status === "pending");
  if (result.status !== "completed") throw new Error(`${team.slug}: ${JSON.stringify(result)}`);

  const front = result.mockups.find((m) => m.placement === "front") ?? result.mockups[0];
  const png = Buffer.from(await (await fetch(front.mockup_url)).arrayBuffer());
  writeFileSync(new URL(`${team.slug}.png`, OUT), png);
  console.log(`${team.slug}: ${team.shirt} (${Math.round(png.length / 1024)} KB)`);
}
