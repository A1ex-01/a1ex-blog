"use client";
import Waline from "@/app/[lng]/post/[uuid]/_components/Waline";
import AxIcon from "@/components/AxIcon";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { IPost } from "@/services/types";
import { useRouter } from "next/navigation";
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
            <AxIcon icon="line-md:close-circle-twotone" className="text-3xl mr-8" size={48} />
          </div>
          <div className="wrapper mt-10 bg-white rounded-lg p-4 max-w-7xl mx-auto">
            <div className="topshow max-w-7xl mx-auto">
              <h2 className="text-3xl text-primary font-bold">{post.notion?.title}</h2>
              <h3 className="text-lg mt-3">{post.notion?.title}</h3>
              {post.notion.category?.name && (
                <Badge className="my-4">{post.notion?.category?.name}</Badge>
              )}
              <div className="tags flex gap-2">
                {post.notion?.tags?.map((tag) => (
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
                {post.notion?.content}
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
