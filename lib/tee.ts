// Shared tee silhouette used by the on-site mockups and the generated PNGs.
export const TEE_VIEWBOX = { w: 500, h: 520 };

export const TEE_BODY =
  "M178 28 Q250 78 322 28 L420 60 Q470 100 497 158 L426 204 L402 178 L406 498 Q250 514 94 498 L98 178 L74 204 L3 158 Q30 100 80 60 Z";
export const TEE_COLLAR = "M178 28 Q250 78 322 28 L332 32 Q250 96 168 32 Z";
export const TEE_FOLDS = [
  "M98 178 Q110 330 104 490",
  "M402 178 Q392 330 396 490",
  "M160 60 Q190 120 172 150",
  "M340 60 Q312 120 328 150",
];

// Where the print sits on the mockup (in viewBox units).
export const PRINT = { cx: 250, wordY: 238, wordSize: 116, cityY: 284, citySize: 22 };

export function isLight(hex: string): boolean {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}

// Plain SVG (no text) for embedding as an image in generated PNGs.
export function teeSvg(fill: string): string {
  const dark = isLight(fill) ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.28)";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TEE_VIEWBOX.w} ${TEE_VIEWBOX.h}">
<defs><linearGradient id="s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".22" stop-color="#fff" stop-opacity=".05"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset=".78" stop-color="#fff" stop-opacity=".03"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient></defs>
<path d="${TEE_BODY}" fill="${fill}"/>
<path d="${TEE_BODY}" fill="url(#s)"/>
<path d="${TEE_COLLAR}" fill="${dark}"/>
${TEE_FOLDS.map((d) => `<path d="${d}" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>`).join("")}
</svg>`;
}
