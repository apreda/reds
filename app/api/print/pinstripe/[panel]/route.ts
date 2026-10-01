import { PINSTRIPE_PANELS, type PinstripePanel } from "@/lib/art";
import { pinstripeFile } from "@/lib/print";

// Pinstripe edition print files, one per panel: /api/print/pinstripe/<panel>.png
export async function GET(_req: Request, { params }: { params: Promise<{ panel: string }> }) {
  const panel = (await params).panel.replace(/\.png$/, "") as PinstripePanel;
  if (!PINSTRIPE_PANELS.includes(panel)) return new Response("Not found", { status: 404 });
  return pinstripeFile(panel);
}
