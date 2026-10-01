import { ImageResponse } from "next/og";
import PrintArt, { CAP_INSET, wordSize } from "@/components/PrintArt";
import { SHIRT_FONT, shirtFont } from "./fonts";
import type { PinstripePanel } from "./art";
import { PINSTRIPE_NAVY } from "./teams";

// Print-ready PNGs sent to Printful at 150 DPI on a transparent background,
// sized to each blank's front print area. The art is the same for every team;
// only the blank's color changes.
const LAYOUT: Record<"tee" | "hoodie", { w: number; h: number; artWidth: number; capTop: number }> = {
  // 12" x 16": SELL's ink spans ~11.5", starting ~4.3" down (mid-chest).
  tee: { w: 1800, h: 2400, artWidth: 1780, capTop: 640 },
  // 14" x 14", above the pocket: SELL's ink spans ~13", starting ~3.7" down.
  hoodie: { w: 2100, h: 2100, artWidth: 2010, capTop: 560 },
};

export async function printFile(style: "tee" | "hoodie"): Promise<Response> {
  const { w, h, artWidth, capTop } = LAYOUT[style];
  return new ImageResponse(
    (
      <div
        style={{
          width: w,
          height: h,
          display: "flex",
          justifyContent: "center",
          paddingTop: capTop - CAP_INSET * wordSize(artWidth),
        }}
      >
        <PrintArt width={artWidth} />
      </div>
    ),
    {
      width: w,
      height: h,
      fonts: [{ name: SHIRT_FONT, data: await shirtFont(), weight: 600 }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}

// Pinstripe edition (all-over-print cotton tee, white fabric): every panel gets
// thin navy pinstripes, and the front gets SELL in the same navy, mid-chest.
const PANEL_SIZE: Record<PinstripePanel, [number, number]> = {
  front: [4200, 5400],
  back: [4200, 5400],
  sleeve_left: [3000, 1800],
  sleeve_right: [3000, 1800],
};
const STRIPE = { width: 9, every: 112 }; // ~1/16" lines every 3/4"
const PINSTRIPE_FRONT = { artWidth: 2300, capTop: 1500 };

export async function pinstripeFile(panel: PinstripePanel): Promise<Response> {
  const [w, h] = PANEL_SIZE[panel];
  // One stripe runs down the center so the pattern is symmetric.
  const xs: number[] = [];
  for (let x = (w / 2) % STRIPE.every; x < w; x += STRIPE.every) xs.push(x);
  const { artWidth, capTop } = PINSTRIPE_FRONT;
  return new ImageResponse(
    (
      <div style={{ width: w, height: h, display: "flex", background: "#FFFFFF", position: "relative" }}>
        {xs.map((x) => (
          <div
            key={x}
            style={{ position: "absolute", left: x - STRIPE.width / 2, top: 0, width: STRIPE.width, height: h, background: PINSTRIPE_NAVY }}
          />
        ))}
        {panel === "front" && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: capTop - CAP_INSET * wordSize(artWidth),
              width: w,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PrintArt width={artWidth} color={PINSTRIPE_NAVY} />
          </div>
        )}
      </div>
    ),
    {
      width: w,
      height: h,
      fonts: [{ name: SHIRT_FONT, data: await shirtFont(), weight: 600 }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
