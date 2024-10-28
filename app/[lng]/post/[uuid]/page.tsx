import { getPost } from "@/services/common";
import { IPost } from "@/services/types";
import { Chip } from "@nextui-org/react";
import "github-markdown-css";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Waline from "./_components/Waline";
interface pageProps {}

export default async function page({ params: { uuid } }: pageProps) {
  const res = await getPost(uuid);
  if (!res?.success) notFound();
  const post: IPost = res.data;
  return (
    <>
      <div className="wrapper pb-10" style={{ backgroundImage: `url(${post?.notion?.cover})` }}>
        <div className="topshow py-10 max-w-[1000px] text-white mx-auto">
          <h2 className="text-3xl text-primary">{post.notion.title}</h2>
          <h3 className="text-lg mt-3">{post.notion.title}</h3>
          <Chip size="lg" color="primary">
            {post.notion.category?.name}
          </Chip>
        </div>
      </div>
      <article className="max-w-[1000px] py-4 mx-auto content">
        <div className="md">
          <Markdown className={"markdown-body"} remarkPlugins={[remarkGfm]}>
            {post.notion.content}
          </Markdown>
        </div>
      </article>
      <div className="mt-10 max-w-[1000px] mx-auto">
        <Waline />
      </div>
    </>
  );
}
