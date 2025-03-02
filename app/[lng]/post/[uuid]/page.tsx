import { Badge } from "@/components/ui/badge";
import { getMetadata } from "@/lib/metadata";
import { getPost } from "@/services/common";
import { IPost } from "@/services/types";
import "github-markdown-css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import MarkdownIt from "markdown-it";
import { notFound } from "next/navigation";
import { cache } from "react";
import Waline from "./_components/Waline";
interface pageProps {}
const getData = cache(async (uuid: string) => {
  const res = await getPost(uuid);
  return res;
});
export const generateMetadata = async ({
  params
}: {
  params: {
    uuid: string;
  };
}) => {
  const res = await getData(params.uuid);
  if (!res?.success) notFound();
  const post: IPost = res?.data || {};
  return getMetadata({
    title: post.notion.title,
    description: post.notion.title || undefined,
    overrides: {
      openGraph: {
        title: post.notion.title,
        description: post.notion.title || undefined,
        type: "website"
        // TODO: og images
      }
    }
  });
};

export default async function page({ params: { uuid } }: pageProps) {
  const res = await getData(uuid);
  if (!res?.success) notFound();
  const post: IPost = res.data;
  const md: MarkdownIt = new MarkdownIt({
    html: true, //
    breaks: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const content = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;

          return `<div class="hljs-container relative pt-1 hover-parent"><div class="text-xs transition-opacity duration-300 opacity-0 hover-show-child absolute left-0 -top-3 text-[#3c3c438f]">${lang}</div>${content}</div>`;
        } catch (__) {}
      }

      return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>";
    }
  });
  // md.use(
  //   await Shiki({
  //     themes: {
  //       light: "vitesse-light"
  //     }
  //   })
  // );
  const mdContent = md.render(post.notion.content);
  return (
    <div
      style={{ backgroundImage: `url(${post?.notion?.cover})` }}
      className="min-w-screen bg-fixed overflow-hidden"
    >
      <div className="wrapper  max-w-7xl mt-10 bg-white rounded-lg p-4 mx-auto">
        <div className="topshow mx-auto">
          <h2 className="text-3xl text-primary font-bold">{post.notion?.title}</h2>
          <div className="flex gap-2 items-center">
            <p>Category：</p>
            {post.notion.category?.name && (
              <Badge className="my-4" color="primary">
                {post.notion?.category?.name}
              </Badge>
            )}
          </div>
          <div className="tags flex gap-2">
            <p>Tags：</p>
            {post.notion?.tags?.map((tag) => (
              <Badge variant={"secondary"} key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <article className="max-w-7xl py-4 mx-auto content">
        <div className="md rounded-lg p-4 bg-white">
          <div
            className="markdown-body rounded-lg p-4"
            dangerouslySetInnerHTML={{ __html: mdContent }}
          />
        </div>
      </article>
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-4 mb-4">
        <Waline />
      </div>
    </div>
  );
}
