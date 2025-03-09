"use client";
import Waline from "@/app/[lng]/post/[uuid]/_components/Waline";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { IPost } from "@/services/types";
import { useRouter } from "next/navigation";
import {} from "react-icons";
import { TbX } from "react-icons/tb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface InterceptingModalProps {
  post: IPost;
}

export default function InterceptingModal({ post }: InterceptingModalProps) {
  const router = useRouter();
  return (
    <Drawer open>
      <DrawerContent>
        <div className="min-w-screen h-[90vh] overflow-y-scroll relative">
          <div
            onClick={() => router.back()}
            className="close sticky top-4 my-4 w-full flex justify-end cursor-pointer  text-red-500"
          >
            <TbX size={48} className="mr-8" />
          </div>
          <div className="wrapper mt-10 bg-white rounded-lg p-4 max-w-7xl mx-auto">
            <div className="topshow max-w-7xl mx-auto">
              <h2 className="text-3xl text-primary font-bold">{post.notionDetail?.title}</h2>
              <h3 className="text-lg mt-3">{post.notionDetail?.title}</h3>
              {post.notionDetail.category?.name && (
                <Badge className="my-4">{post.notionDetail?.category?.name}</Badge>
              )}
              <div className="tags flex gap-2">
                {post.notionDetail?.tags?.map((tag) => (
                  <Badge variant={"secondary"} key={tag.id}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <article className="max-w-7xl py-4 mx-auto content">
            <div className="md rounded-lg p-4 bg-white/55">
              <Markdown className={"markdown-body rounded-lg p-4"} remarkPlugins={[remarkGfm]}>
                {post.notionDetail?.content}
              </Markdown>
            </div>
          </article>
          <div className="max-w-7xl mx-auto bg-white rounded-lg p-4 mb-4">
            <Waline />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
