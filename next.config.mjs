import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n");
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {},
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a1ex.vip",
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
export default withSentryConfig(withNextIntl(nextConfig), {
  org: "1-9pl",
  project: "next_blog",
  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false, // Can be used to suppress logs

  sourcemaps: {
    disable: true
  },
  hideSourceMaps: true,
  // tunnelRoute: "/monitoring-tunnel",
  autoInstrumentServerFunctions: false
});
