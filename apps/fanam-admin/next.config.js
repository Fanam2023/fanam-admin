const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  // disable: process.env.NEXT_PUBLIC_ENV === "development",
  scope: process.env.NEXT_PUBLIC_SCOPE,
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: false /* Changed to false due react 18 is restarting the page twice */,
  basePath: process.env.NEXT_PUBLIC_SCOPE,
  transpilePackages: ["@fanam-pkg/core-ui-sass", "@fanam-pkg/core-utils", "@custom/utils", "@custom/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
})
