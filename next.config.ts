import type { NextConfig } from "next";
import { ART_VERSION } from "./lib/art";
import { OLD_SLUGS } from "./lib/teams";

const nextConfig: NextConfig = {
  // Old team addresses forward to the new ones, so shared links keep working.
  async redirects() {
    return Object.entries(OLD_SLUGS).flatMap(([from, to]) => [
      { source: `/${from}`, destination: `/${to}`, permanent: true },
      { source: `/:style(shirt|city|hoodie)/${from}`, destination: `/:style/${to}`, permanent: true },
    ]);
  },
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
