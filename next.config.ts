import type { NextConfig } from "next";
import { ART_VERSION } from "./lib/art";

const nextConfig: NextConfig = {
  // next/image only optimizes the current shirt photos.
  images: { localPatterns: [{ pathname: "/mockups/**", search: `?v=${ART_VERSION}` }] },
  // Generated images read the shirt font (Inter SemiBold) from disk at runtime.
  outputFileTracingIncludes: {
    "/api/print/[slug]": ["./assets/inter-600.ttf"],
    "/api/print/hoodie/[slug]": ["./assets/inter-600.ttf"],
    "/api/print/city/[slug]": ["./assets/inter-600.ttf"],
    "/opengraph-image": ["./assets/inter-600.ttf"],
    "/[team]/opengraph-image": ["./assets/inter-600.ttf"],
    "/shirt/[slug]/opengraph-image": ["./assets/inter-600.ttf"],
    "/hoodie/[slug]/opengraph-image": ["./assets/inter-600.ttf"],
    "/city/[slug]/opengraph-image": ["./assets/inter-600.ttf"],
    "/nepo-phil/[slug]/opengraph-image": ["./assets/inter-600.ttf"],
    "/nepo-phil-jersey/[slug]/opengraph-image": ["./assets/inter-600.ttf"],
    "/nepo-phil-sign/[slug]/opengraph-image": ["./assets/inter-600.ttf"],
  },
};

export default nextConfig;
