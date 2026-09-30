import { SHIRT_FONT } from "@/lib/fonts";
import type { Team } from "@/lib/teams";

// The artwork itself, rendered by next/og (Satori): "SELL" in plain, evenly
// tracked Inter Bold capitals with the city line underneath. Every shirt
// image on the site comes from this one file (via Printful's mockups).

// Inter Bold advance widths in em, for sizing text without a layout engine.
const ADVANCE: Record<string, number> = {
  A: 0.747, B: 0.662, C: 0.74, D: 0.722, E: 0.607, F: 0.587, G: 0.75, H: 0.747, I: 0.281,
  J: 0.584, K: 0.719, L: 0.565, M: 0.932, N: 0.762, O: 0.771, P: 0.648, Q: 0.777, R: 0.657,
  S: 0.655, T: 0.667, U: 0.732, V: 0.747, W: 1.038, X: 0.738, Y: 0.731, Z: 0.664,
  " ": 0.237, ".": 0.334, "'": 0.339,
};
// With lineHeight 1, Inter's cap height (0.7275em) sits 0.136em inside the box, top and bottom.
const CAP_INSET = 0.136;

const WORD_TRACK = 0.14; // em between SELL's letters
const CITY_TRACK = 0.3; // em between the city line's letters
const CITY_RATIO = 0.2; // city size relative to SELL
const GAP_RATIO = 0.2; // clear space between the two lines, relative to SELL

// Width in em of `text` set with `track` em after each letter but the last.
function measure(text: string, track: number): number {
  const chars = [...text];
  return chars.reduce((n, c) => n + (ADVANCE[c] ?? 0.75), 0) + track * (chars.length - 1);
}

// `width` is the printed width of "SELL" in px; the city line never exceeds it.
export default function PrintArt({ team, width }: { team: Team; width: number }) {
  const word = width / measure("SELL", WORD_TRACK);
  const city = Math.min(word * CITY_RATIO, width / measure(team.city, CITY_TRACK));
  const line = (size: number, track: number) => ({
    fontSize: size,
    letterSpacing: track * size,
    // Satori also tracks after the last letter; pad the left so the ink stays centered.
    paddingLeft: track * size,
    fontWeight: 700,
    lineHeight: 1,
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: SHIRT_FONT }}>
      <div style={{ ...line(word, WORD_TRACK), color: team.ink }}>SELL</div>
      <div
        style={{
          ...line(city, CITY_TRACK),
          color: team.accent,
          marginTop: word * GAP_RATIO - CAP_INSET * (word + city),
        }}
      >
        {team.city}
      </div>
    </div>
  );
}
