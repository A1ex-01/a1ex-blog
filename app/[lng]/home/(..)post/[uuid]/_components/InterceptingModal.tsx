"use client";
import Waline from "@/app/[lng]/post/[uuid]/_components/Waline";
import { IPost } from "@/services/types";
import { Icon } from "@iconify/react";
import { Chip, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InterceptingModalProps {
  post: IPost;
}

export default function InterceptingModal({ post }: InterceptingModalProps) {
  const router = useRouter();
  return (
    <Modal size={"5xl"} isOpen={true} hideCloseButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="h-[90vh]">
              <div className="min-w-screen h-[90vh] overflow-y-scroll bg-fixed overflow-hidden relative">
                <div
                  onClick={() => router.back()}
                  className="close sticky text-right top-4 my-4 w-full flex justify-end cursor-pointer"
                >
                  <Icon icon="line-md:close-circle-twotone" className="text-3xl text-danger-500" />
                </div>
                <div className="wrapper mt-10 bg-white rounded-lg p-4 max-w-[1000px] mx-auto">
                  <div className="topshow max-w-[1000px] mx-auto">
                    <h2 className="text-3xl text-primary font-bold">{post.notion?.title}</h2>
                    <h3 className="text-lg mt-3">{post.notion?.title}</h3>
                    <Chip size="lg" className="my-4" color="primary">
                      {post.notion?.category?.name}
                    </Chip>
                    <div className="tags flex gap-2">
                      {post.notion?.tags?.map((tag) => (
                        <Chip size="sm" key={tag.id}>
                          {tag.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
                <article className="max-w-[1000px] py-4 mx-auto content">
                  <div className="md rounded-lg p-4 bg-white/55">
                    <Markdown
                      className={"markdown-body rounded-lg p-4"}
                      remarkPlugins={[remarkGfm]}
                    >
                      {post.notion?.content}
                    </Markdown>
                  </div>
                </article>
                <div className="max-w-[1000px] mx-auto bg-white rounded-lg p-4 mb-4">
                  <Waline />
                </div>
                t
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
