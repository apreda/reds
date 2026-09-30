import { mockupPath } from "@/lib/products";
import { getTeam } from "@/lib/teams";

// Older links point here; the mockups are now Printful photos in public/mockups.
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const team = getTeam((await params).slug.replace(/\.png$/, ""));
  if (!team) return new Response("Not found", { status: 404 });
  return Response.redirect(new URL(mockupPath(team), req.url), 308);
}
