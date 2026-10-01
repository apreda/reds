// Bump when the shirt artwork or photos change: Printful caches print files by
// URL and next/image caches optimized photos by URL, so a new number makes
// both fetch fresh copies.
export const ART_VERSION = 5;

// The all-over-print pinstripe tee is printed panel by panel.
export const PINSTRIPE_PANELS = ["front", "back", "sleeve_left", "sleeve_right"] as const;
export type PinstripePanel = (typeof PINSTRIPE_PANELS)[number];
