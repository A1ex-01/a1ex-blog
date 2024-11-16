import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export function getMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  hidden = false,
  overrides
}: {
  overrides?: Metadata;
  title?: string;
  description?: string;
  hidden?: boolean;
} = {}): Metadata {
  function undefinedIfHidden<T>(value: T): T | undefined {
    return hidden ? undefined : value;
  }

  return {
    title,
    description: undefinedIfHidden(description),
    // themeColor: "#000",
    // manifest: "/site.webmanifest",
    robots: hidden ? "noindex" : undefined,
    twitter: undefinedIfHidden({
      card: "summary_large_image",
      title,
      description,
      ...overrides?.twitter
    }),
    applicationName: siteConfig.name,
    icons: [
      {
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
        url: "/favicon.png"
      }
    ],
    openGraph: undefinedIfHidden({
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title,
      description,
      ...overrides?.openGraph
    }),
    keywords: undefinedIfHidden(["blog", "github", "a1ex`s blog", "next.js", "code", "web"]),
    ...overrides
  };
}
