import { OG_SIZE, teamCard } from "@/lib/og";
import { TEAMS } from "@/lib/teams";

export const alt = "SELL in white on the team's color";
export const size = OG_SIZE;
export const contentType = "image/png";

// Built at deploy time so link previews load instantly.
export function generateStaticParams() {
  return TEAMS.filter((t) => t.pinstripe).map((t) => ({ slug: t.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  return teamCard((await params).slug, "pinstripe");
}
