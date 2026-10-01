import { ImageResponse } from "next/og";
import PrintArt, { CAP_INSET, wordSize } from "@/components/PrintArt";
import { SHIRT_FONT, shirtFont } from "./fonts";

// Print-ready PNGs sent to Printful at 150 DPI on a transparent background,
// sized to each blank's front print area. SELL is the same for every team; the
// city tee adds the team's city underneath.
const LAYOUT: Record<"tee" | "hoodie", { w: number; h: number; artWidth: number; capTop: number }> = {
  // 12" x 16": SELL's ink spans ~11.5", starting ~4.3" down (mid-chest).
  tee: { w: 1800, h: 2400, artWidth: 1780, capTop: 640 },
  // 14" x 14", above the pocket: SELL's ink spans ~13", starting ~3.7" down.
  hoodie: { w: 2100, h: 2100, artWidth: 2010, capTop: 560 },
};

export async function printFile(blank: "tee" | "hoodie", city?: string): Promise<Response> {
  const { w, h, artWidth, capTop } = LAYOUT[blank];
  return new ImageResponse(
    (
      <div
        style={{
          width: w,
          height: h,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: capTop - CAP_INSET * wordSize(artWidth),
        }}
      >
        <PrintArt width={artWidth} city={city} />
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
