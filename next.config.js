/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["help.twitter.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
