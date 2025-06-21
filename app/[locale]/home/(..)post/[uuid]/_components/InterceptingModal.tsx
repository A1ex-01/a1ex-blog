"use client";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { IPost } from "@/services/types";
import { useRouter } from "next/navigation";
import {} from "react-icons";
import { TbX } from "react-icons/tb";
import Markdown from "react-markdown";
interface InterceptingModalProps {
  post: IPost;
}

export default function InterceptingModal({ post }: InterceptingModalProps) {
  const router = useRouter();
  return (
    <Drawer open>
      <DrawerContent>
        <div className="min-w-screen relative h-[90vh] overflow-y-scroll">
          <div
            onClick={() => router.back()}
            className="close sticky top-4 my-4 flex w-full cursor-pointer justify-end text-red-500"
          >
            <TbX size={48} className="mr-8" />
          </div>
          <div className="wrapper mx-auto mt-10 max-w-7xl rounded-lg bg-white p-4">
            <div className="topshow mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold text-primary">
                {post.notionDetail?.title}
              </h2>
              <h3 className="mt-3 text-lg">{post.notionDetail?.title}</h3>
              {post.notionDetail.category?.name && (
                <Badge className="my-4">
                  {post.notionDetail?.category?.name}
                </Badge>
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
          <article className="content mx-auto max-w-7xl py-4">
            <div className="md rounded-lg bg-white/55 p-4">
              <Markdown>{post.notionDetail?.content}</Markdown>
            </div>
          </article>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
