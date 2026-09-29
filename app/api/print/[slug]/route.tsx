import { ImageResponse } from "next/og";
import PrintArt from "@/components/PrintArt";
import { oswaldBold } from "@/lib/fonts";
import { getTeam } from "@/lib/teams";

// Print-ready PNG sent to Printful: 12" x 16" at 150 DPI on a transparent
// background, artwork at the top of the chest.
const W = 1800;
const H = 2400;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const team = getTeam((await params).slug.replace(/\.png$/, ""));
  if (!team) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", justifyContent: "center", paddingTop: 120 }}>
        <PrintArt team={team} scale={6.4} />
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [{ name: "Oswald", data: await oswaldBold(), weight: 700 }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
