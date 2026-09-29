import { shirtHex } from "@/lib/products";
import type { Team } from "@/lib/teams";
import { PRINT, TEE_BODY, TEE_COLLAR, TEE_FOLDS, TEE_VIEWBOX, isLight } from "@/lib/tee";

export default function Tee({ team, className }: { team: Team; className?: string }) {
  const fill = shirtHex(team);
  const dark = isLight(fill) ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.28)";
  const gid = `shade-${team.slug}`;
  const long = team.city.length > 11;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${TEE_VIEWBOX.w} ${TEE_VIEWBOX.h}`}
      role="img"
      aria-label={`${team.shirt} t-shirt printed with SELL and ${team.city}`}
    >
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".16" />
          <stop offset=".22" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".08" />
          <stop offset=".78" stopColor="#fff" stopOpacity=".03" />
          <stop offset="1" stopColor="#000" stopOpacity=".18" />
        </linearGradient>
      </defs>
      <path d={TEE_BODY} fill={fill} />
      <path d={TEE_BODY} fill={`url(#${gid})`} />
      <path d={TEE_COLLAR} fill={dark} />
      {TEE_FOLDS.map((d) => (
        <path key={d} d={d} fill="none" stroke={dark} strokeWidth={3} strokeLinecap="round" />
      ))}
      <text
        x={PRINT.cx + 6}
        y={PRINT.wordY}
        textAnchor="middle"
        fill={team.ink}
        fontFamily="var(--font-display), Oswald, Impact, sans-serif"
        fontWeight={700}
        fontSize={PRINT.wordSize}
        letterSpacing={12}
      >
        SELL
      </text>
      <text
        x={PRINT.cx + 3}
        y={PRINT.cityY}
        textAnchor="middle"
        fill={team.accent}
        fontFamily="var(--font-display), Oswald, Impact, sans-serif"
        fontWeight={600}
        fontSize={PRINT.citySize}
        letterSpacing={6}
        {...(long ? { textLength: 200, lengthAdjust: "spacingAndGlyphs" } : {})}
      >
        {team.city}
      </text>
    </svg>
  );
}
