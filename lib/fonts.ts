import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The shirt lettering (Inter SemiBold, SIL OFL: assets/OFL-Inter.txt). Site
// headings keep Oswald via next/font in app/layout.tsx.
export const SHIRT_FONT = "Inter";

let cache: Promise<ArrayBuffer> | null = null;

export function shirtFont(): Promise<ArrayBuffer> {
  cache ??= readFile(join(process.cwd(), "assets/inter-600.ttf")).then(
    (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer,
  );
  return cache;
}
