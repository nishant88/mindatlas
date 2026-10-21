import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "/mindatlas";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? repoName : "",
  assetPrefix: isProd ? `${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
