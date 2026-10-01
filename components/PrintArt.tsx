import { SHIRT_FONT } from "@/lib/fonts";

// The artwork, rendered by next/og (Satori): "SELL" in plain, widely tracked
// white Inter SemiBold capitals, like the Oakland originals. Every shirt image
// on the site comes from this one file (via Printful's mockups).

export const INK = "#FFFFFF";

// Inter SemiBold advance widths in em, for sizing without a layout engine.
const ADVANCE: Record<string, number> = { S: 0.65, E: 0.605, L: 0.565 };
// With lineHeight 1, Inter's cap height (0.7275em) sits 0.136em below the top of the box.
export const CAP_INSET = 0.136;
const TRACK = 0.14; // em between letters

// Font size that makes "SELL" `width` px wide, from the first letter's edge to the last.
export function wordSize(width: number): number {
  const em = [..."SELL"].reduce((n, c) => n + ADVANCE[c], 0) + TRACK * 3;
  return width / em;
}

export default function PrintArt({ width, color = INK }: { width: number; color?: string }) {
  const size = wordSize(width);
  return (
    <div
      style={{
        fontFamily: SHIRT_FONT,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: TRACK * size,
        // Satori also tracks after the last letter; cancel it so the ink stays centered.
        marginRight: -TRACK * size,
        color,
      }}
    >
      SELL
    </div>
  );
}
