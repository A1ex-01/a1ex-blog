import withBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n");
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {},
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    // ignoreDuringBuilds: true
  },
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a1ex.tech",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "w.wallhaven.cc",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images6.alphacoders.com",
        port: "",
        pathname: "/**"
      }
    ]
  },
  reactStrictMode: false
};
// const nConfig = withSentryConfig(withNextIntl(nextConfig), {
//   org: "1-9pl",
//   project: "next_blog",
//   // An auth token is required for uploading source maps.
//   authToken: process.env.SENTRY_AUTH_TOKEN,

//   silent: false, // Can be used to suppress logs

//   sourcemaps: {
//     disable: true
//   },
//   hideSourceMaps: true,
//   // tunnelRoute: "/monitoring-tunnel",
//   autoInstrumentServerFunctions: false
// });

const isAnalyze = process.env.ANALYZE === "true";
export default isAnalyze ? withBundleAnalyzer(nextConfig) : nextConfig;
