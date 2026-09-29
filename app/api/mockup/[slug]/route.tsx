import { ImageResponse } from "next/og";
import PrintArt from "@/components/PrintArt";
import { oswaldBold } from "@/lib/fonts";
import { shirtHex } from "@/lib/products";
import { getTeam } from "@/lib/teams";
import { teeSvg } from "@/lib/tee";

// Product mockup PNG, used for Stripe Checkout line items and social previews.
const S = 1200;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const team = getTeam((await params).slug.replace(/\.png$/, ""));
  if (!team) return new Response("Not found", { status: 404 });

  const tee = `data:image/svg+xml;base64,${Buffer.from(teeSvg(shirtHex(team))).toString("base64")}`;
  const teeW = 1000; // 2 px per viewBox unit
  const k = teeW / 500;

  return new ImageResponse(
    (
      <div style={{ width: S, height: S, display: "flex", background: "#f5f4f0", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tee} width={teeW} height={1040} style={{ position: "absolute", left: 100, top: 80 }} alt="" />
        <div style={{ position: "absolute", left: 100, top: 80 + 150 * k, width: teeW, display: "flex", justifyContent: "center" }}>
          <PrintArt team={team} scale={k} />
        </div>
      </div>
    ),
    {
      width: S,
      height: S,
      fonts: [{ name: "Oswald", data: await oswaldBold(), weight: 700 }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000" },
    },
  );
}
