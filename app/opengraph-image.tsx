import { ImageResponse } from "next/og";
import { oswaldBold } from "@/lib/fonts";

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
          fontFamily: "Oswald",
        }}
      >
        <div style={{ fontSize: 260, letterSpacing: 30, lineHeight: 1, paddingLeft: 30 }}>SELL</div>
        <div style={{ fontSize: 34, letterSpacing: 12, marginTop: 30, color: "#EFB21E" }}>
          SELL THE TEAM · ALL 30 BALLPARKS
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Oswald", data: await oswaldBold(), weight: 700 }] },
  );
}
