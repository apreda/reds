import { ImageResponse } from "next/og";
import { SHIRT_FONT, shirtFont } from "./fonts";
import { colorHex, STYLE, type Style } from "./products";
import { getTeam } from "./teams";

// Link-preview cards (X, iMessage, etc.): the shirt's color with SELL across it.
export const OG_SIZE = { width: 1200, height: 630 };
const REDS_RED = "#C6011F";

async function card(background: string, ink: string, caption: string, sub: string) {
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
          background,
          color: ink,
          fontFamily: SHIRT_FONT,
          fontWeight: 600,
        }}
      >
        <div style={{ fontSize: 250, letterSpacing: 35, marginRight: -35, lineHeight: 1 }}>SELL</div>
        <div style={{ fontSize: 34, letterSpacing: 8, marginRight: -8, marginTop: 44 }}>{caption}</div>
        <div style={{ fontSize: 22, letterSpacing: 5, marginRight: -5, marginTop: 18, opacity: 0.85 }}>{sub}</div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: SHIRT_FONT, data: await shirtFont(), weight: 600 }] },
  );
}

// The site's own card: red and white.
export function siteCard() {
  return card(REDS_RED, "#FFFFFF", "WEAR IT TO THE GAME UNTIL THEY SELL", "SELLMYTEAM.COM");
}

export function teamCard(slug: string, style: Style) {
  const team = getTeam(slug);
  if (!team) return siteCard();
  // The Reds get the same red as the site card rather than Printful's blank color.
  const bg = style === "pinstripe" ? "#FFFFFF" : slug === "cincinnati" ? REDS_RED : colorHex(team, style);
  return card(bg, STYLE[style].ink, team.city, "WEAR IT TO THE GAME UNTIL THEY SELL · SELLMYTEAM.COM");
}
