import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generated images read the shirt font (Inter Bold) from disk at runtime.
  outputFileTracingIncludes: {
    "/api/print/[slug]": ["./assets/inter-700.ttf"],
    "/opengraph-image": ["./assets/inter-700.ttf"],
  },
};

export default nextConfig;
