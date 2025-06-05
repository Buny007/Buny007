/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Für GitHub Pages
  assetPrefix: process.env.NODE_ENV === "production" ? "/hb-montageservice" : "",
  basePath: process.env.NODE_ENV === "production" ? "/hb-montageservice" : "",
  distDir: "out",
}

module.exports = nextConfig
