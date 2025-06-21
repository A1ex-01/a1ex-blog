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
interface pageProps {
  params: {
    uuid: string;
  };
}
const getData = cache(async (uuid: string) => {
  const res = await getPost(uuid);
  return res;
});
export const generateMetadata = async ({
  params,
}: {
  params: {
    uuid: string;
  };
}) => {
  const { uuid } = await params;

  const res = await getData(uuid);
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
            url: post.notionDetail.cover_url,
          },
        ],
      },
    },
  });
};

export default async function page({ params }: pageProps) {
  const { uuid } = await params;
  const res = await getData(uuid);
  if (!res?.success) notFound();
  const post: IPost = res.data;

  return (
    <div
      style={{ backgroundImage: `url(${post?.notionDetail?.cover_url})` }}
      className="min-w-screen overflow-hidden bg-fixed"
    >
      <div className="wrapper mx-auto mt-10 max-w-7xl rounded-lg bg-background p-4">
        <div className="topshow mx-auto">
          <h2 className="text-3xl font-bold text-primary">
            {post.notionDetail?.title}
          </h2>
          <div className="flex items-center gap-2">
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

      <article className="content mx-auto max-w-7xl py-4">
        <div className="md rounded-lg bg-background p-4">
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
                      ignoreIllegals: true,
                    }).value;

                    return (
                      <div className="hljs-container hover-parent relative pt-1">
                        <div className="hover-show-child absolute -top-3 left-0 text-xs text-[#3c3c438f] opacity-0 transition-opacity duration-300">
                          {lang}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></div>
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
              },
            }}
            // className={"markdown-body round-lg p-4"}
          >
            {post.notionDetail?.content}
          </Markdown>
        </div>
      </article>
    </div>
  );
}
