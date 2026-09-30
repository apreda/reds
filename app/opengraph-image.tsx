import { ImageResponse } from "next/og";
import { SHIRT_FONT, shirtFont } from "@/lib/fonts";

export const alt = "Sell The Team — Wear it until they sell.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a9462",
          color: "#fff",
          fontFamily: SHIRT_FONT,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 240, letterSpacing: 34, lineHeight: 1, paddingLeft: 34 }}>SELL</div>
        <div style={{ fontSize: 30, letterSpacing: 10, paddingLeft: 10, marginTop: 34, color: "#EFB21E" }}>
          SELL THE TEAM · ALL 30 BALLPARKS
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: SHIRT_FONT, data: await shirtFont(), weight: 700 }] },
  );
}
