import { Bookmark } from "@/components/Bookmark";
import { Badge } from "@/components/ui/badge";
import { getMetadata } from "@/lib/metadata";
import { getPost } from "@/services/common";
import { IPost } from "@/services/types";
import "github-markdown-css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { notFound } from "next/navigation";
import { cache } from "react";
import Markdown from "react-markdown";
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
    title: post.notionDetail.title,
    description: post.notionDetail.title || undefined,
    overrides: {
      openGraph: {
        title: post.notionDetail.title,
        description: post.notionDetail.title || undefined,
        type: "website",
        // TODO: og images
        images: [
          {
            url: post.notionDetail.cover_url
          }
        ]
      }
    }
  });
};

export default async function page({ params: { uuid } }: pageProps) {
  const res = await getData(uuid);
  if (!res?.success) notFound();
  const post: IPost = res.data;
  console.log("🚀 ~ page ~ post:", post);

  return (
    <div
      style={{ backgroundImage: `url(${post?.notionDetail?.cover_url})` }}
      className="min-w-screen bg-fixed overflow-hidden"
    >
      <div className="wrapper  max-w-7xl mt-10 bg-white rounded-lg p-4 mx-auto">
        <div className="topshow mx-auto">
          <h2 className="text-3xl text-primary font-bold">{post.notionDetail?.title}</h2>
          <div className="flex gap-2 items-center">
            <p>Category：</p>
            {post.notionDetail.category?.name && (
              <Badge className="my-4" color="primary">
                {post.notionDetail?.category?.name}
              </Badge>
            )}
          </div>
          <div className="tags flex gap-2">
            <p>Tags：</p>
            {post.notionDetail?.tags?.map((tag) => (
              <Badge variant={"secondary"} key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <article className="max-w-7xl py-4 mx-auto content">
        <div className="md rounded-lg p-4 bg-white">
          <Markdown
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                const lang = match?.[1];
                const str = String(children).replace(/\n$/, "");
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    const content = hljs.highlight(str, {
                      language: lang,
                      ignoreIllegals: true
                    }).value;

                    return (
                      <div className="hljs-container relative pt-1 hover-parent">
                        <div className="text-xs transition-opacity duration-300 opacity-0 hover-show-child absolute left-0 -top-3 text-[#3c3c438f]">
                          {lang}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                      </div>
                    );
                  } catch (__) {}
                }

                return str;
              },
              a(props) {
                const { children, className, node } = props;
                if (!node) return "no node";
                const href = node.properties.href as string;
                if (children === "bookmark") {
                  return <Bookmark url={href as string} />;
                }
                return <a {...props}>{children}</a>;
              }
            }}
            className={"markdown-body round-lg p-4"}
          >
            {post.notionDetail?.content}
          </Markdown>
        </div>
      </article>
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-4 mb-4">
        <Waline />
      </div>
    </div>
  );
}
