import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generated images read the Oswald TTF from disk at runtime.
  outputFileTracingIncludes: {
    "/api/print/[slug]": ["./assets/**"],
    "/api/mockup/[slug]": ["./assets/**"],
    "/opengraph-image": ["./assets/**"],
  },
};

export default nextConfig;
