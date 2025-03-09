import { IOgpData } from "@/types";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

async function GET(req: NextApiRequest, res: NextApiResponse<IOgpData>) {
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
    const response = await fetch(encodeURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
      },
      signal: AbortSignal.timeout(2000)
    })
      .then((res) => res.text())
      .then((text) => {
        const $ = cheerio.load(text);

        // 获取 TDK 信息
        const title = $("title").text().trim();
        const description = $('meta[name="description"]').attr("content") || "";
        const keywords = $('meta[name="keywords"]').attr("content") || "";

        // 获取 Open Graph 信息
        const ogTitle = $('meta[property="og:title"]').attr("content") || title;
        const ogDescription = $('meta[property="og:description"]').attr("content") || description;
        const ogImage = $('meta[property="og:image"]').attr("content") || "";
        const ogUrl = $('meta[property="og:url"]').attr("content") || encodeURL;
        const ogType = $('meta[property="og:type"]').attr("content") || "";

        const siteUrl = ogUrl.substring(0, ogUrl.indexOf("/", 8)) as string;
        const faviconPath = "/favicon.ico";
        const ogpData: IOgpData = {
          title: ogTitle || title,
          description: ogDescription || description,
          faviconUrl: siteUrl + faviconPath,
          ogImgUrl: ogImage,
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
    console.log("🚀 ~ GET ~ error:", error);
    return new Response(JSON.stringify({ pageUrl: encodeURL, title: "bookmark" }));
  }
}

export { GET };
