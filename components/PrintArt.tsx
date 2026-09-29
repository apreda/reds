import type { Team } from "@/lib/teams";

// The artwork itself, rendered by next/og (Satori). `scale` = px per mockup unit.
export default function PrintArt({ team, scale }: { team: Team; scale: number }) {
  const long = team.city.length > 11;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Oswald" }}>
      <div
        style={{
          color: team.ink,
          fontSize: 116 * scale,
          letterSpacing: 12 * scale,
          fontWeight: 700,
          lineHeight: 1,
          paddingLeft: 12 * scale,
        }}
      >
        SELL
      </div>
      <div
        style={{
          color: team.accent,
          fontSize: (long ? 19 : 22) * scale,
          letterSpacing: (long ? 4 : 6) * scale,
          fontWeight: 700,
          lineHeight: 1,
          marginTop: 22 * scale,
          paddingLeft: (long ? 4 : 6) * scale,
        }}
      >
        {team.city}
      </div>
    </div>
  );
}
