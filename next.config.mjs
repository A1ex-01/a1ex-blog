import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/zh",
        destination: "/zh/home/1",
      },
      {
        source: "/zh/home",
        destination: "/zh/home/1",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
