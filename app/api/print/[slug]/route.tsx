import { ImageResponse } from "next/og";
import PrintArt, { CAP_INSET, wordSize } from "@/components/PrintArt";
import { SHIRT_FONT, shirtFont } from "@/lib/fonts";
import { getTeam } from "@/lib/teams";

// Print-ready PNG sent to Printful: 12" x 16" at 150 DPI on a transparent
// background. The art is the same for every team; only the shirt color changes.
const W = 1800;
const H = 2400;
const ART_WIDTH = 1650; // SELL spans 11" of the 12" print area
const CAP_TOP = 375; // letters start 2.5" into the print area: mid-chest

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const team = getTeam((await params).slug.replace(/\.png$/, ""));
  if (!team) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          justifyContent: "center",
          paddingTop: CAP_TOP - CAP_INSET * wordSize(ART_WIDTH),
        }}
      >
        <PrintArt width={ART_WIDTH} />
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [{ name: SHIRT_FONT, data: await shirtFont(), weight: 600 }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
