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
export default withNextIntl(nextConfig);
