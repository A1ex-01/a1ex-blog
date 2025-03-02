import { JSDOM } from "jsdom";

import { IOgpData } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function GET(req: NextApiRequest, res: NextApiResponse<IOgpData>) {
  // クエリパラメタからURL情報を受け取り、エンコードする
  //   const { url } = req.query;
  const url = req.url;
  const urlObj = new URL(url as string);
  const encodeURL = encodeURI(urlObj.searchParams.get("url") as string);
  if (!encodeURL) {
    return new Response(
      JSON.stringify({
        title: "bookmark",
        pageUrl: encodeURL
      })
    );
  }

  try {
    const response = await fetch(encodeURL)
      .then((res) => res.text())
      .then((text) => {
        const dom = new JSDOM(text);

        const meta = dom.window.document.head.querySelectorAll("meta");
        const titleTag = dom.window.document.title;

        const tagsContainingOg = Array.from(meta).filter((tag) => {
          const property = tag.getAttribute("property");
          const name = tag.getAttribute("name");
          const checkOg = (text: string) => text.substring(0, 3) === "og:";

          return checkOg(property ?? "") || checkOg(name ?? "");
        });

        const ogp = tagsContainingOg.reduce((previous: any, tag: Element) => {
          // property属性かname属性かを判定
          const attr = tag.hasAttribute("property")
            ? tag.getAttribute("property")
            : tag.getAttribute("name");

          const key = attr?.trim().replace("og:", "") ?? "";

          const content = tag.getAttribute("content") ?? "";
          previous[key] = content;

          return previous;
        }, {});

        const siteUrl = ogp["url"].substring(0, ogp["url"].indexOf("/", 8)) as string;

        const faviconPath = "/favicon.ico";

        const ogpData: IOgpData = {
          title: titleTag,
          description: ogp["description"] as string,
          faviconUrl: siteUrl + faviconPath,
          ogImgUrl: ogp["image"] as string,
          pageUrl: encodeURL as string
        };

        return ogpData;
      });

    const { pageUrl, title, description, faviconUrl, ogImgUrl } = response;
    const obj = {
      pageUrl,
      title,
      description,
      faviconUrl,
      ogImgUrl
    };
    return new Response(JSON.stringify(obj));
  } catch (error) {
    return new Response(JSON.stringify({ pageUrl: encodeURL, title: "bookmark" }));
  }
}

export { GET };
