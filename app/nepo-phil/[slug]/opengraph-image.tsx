import { OG_SIZE, teamCard } from "@/lib/og";

export const alt = "SELL in white on the team's color";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  return teamCard((await params).slug, "nepo");
}
