import { readFile } from "node:fs/promises";
import { join } from "node:path";

let cache: Promise<ArrayBuffer> | null = null;

export function oswaldBold(): Promise<ArrayBuffer> {
  cache ??= readFile(join(process.cwd(), "assets/oswald-700.ttf")).then(
    (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer,
  );
  return cache;
}
