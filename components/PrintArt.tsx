import { SHIRT_FONT } from "@/lib/fonts";

// The artwork, rendered by next/og (Satori): "SELL" in plain, widely tracked
// white Inter SemiBold capitals, like the Oakland originals, optionally with
// the city in smaller letters underneath. Every shirt photo on the site comes
// from this file (via Printful's mockups).

export const INK = "#FFFFFF";

// Inter SemiBold advance widths in em, for sizing without a layout engine.
const ADVANCE: Record<string, number> = {
  A: 0.728, B: 0.659, C: 0.737, D: 0.722, E: 0.605, F: 0.588, G: 0.749, H: 0.746, I: 0.277,
  J: 0.58, K: 0.703, L: 0.565, M: 0.922, N: 0.759, O: 0.769, P: 0.645, Q: 0.773, R: 0.652,
  S: 0.65, T: 0.66, U: 0.736, V: 0.728, W: 1.02, X: 0.72, Y: 0.713, Z: 0.652,
  " ": 0.252, ".": 0.319, "'": 0.326,
};
// With lineHeight 1, Inter's cap height (0.7275em) sits 0.136em below the top of the box.
export const CAP_INSET = 0.136;
const TRACK = 0.14; // em between SELL's letters
const CITY_TRACK = 0.3; // em between the city's letters
const CITY_RATIO = 0.2; // city size relative to SELL
const GAP_RATIO = 0.22; // clear space between SELL and the city, relative to SELL

// Width in em of `text` set with `track` em between letters.
function measure(text: string, track: number): number {
  const chars = [...text];
  return chars.reduce((n, c) => n + (ADVANCE[c] ?? 0.75), 0) + track * (chars.length - 1);
}

// Font size that makes "SELL" `width` px wide, from the first letter's edge to the last.
export function wordSize(width: number): number {
  return width / measure("SELL", TRACK);
}

function line(size: number, track: number, color: string) {
  return {
    fontFamily: SHIRT_FONT,
    fontWeight: 600,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: track * size,
    // Satori also tracks after the last letter; cancel it so the ink stays centered.
    marginRight: -track * size,
    color,
  };
}

export default function PrintArt({ width, color = INK, city }: { width: number; color?: string; city?: string }) {
  const size = wordSize(width);
  if (!city) return <div style={line(size, TRACK, color)}>SELL</div>;
  const citySize = Math.min(size * CITY_RATIO, width / measure(city, CITY_TRACK));
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={line(size, TRACK, color)}>SELL</div>
      <div style={{ ...line(citySize, CITY_TRACK, color), marginTop: size * GAP_RATIO - CAP_INSET * (size + citySize) }}>{city}</div>
    </div>
  );
}
