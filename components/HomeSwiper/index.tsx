"use client";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";

import { IPost } from "@/services/types";
import dayjs from "dayjs";
import Link from "next/link";
import { EffectCards } from "swiper/modules";
import { Badge } from "../ui/badge";
interface HomeSwiperProps {
  posts: IPost[];
}

export default function HomeSwiper({ posts }: HomeSwiperProps) {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      loop
      modules={[EffectCards]}
      className="mySwiper w-full"
    >
      {posts.map((post: IPost) => (
        <SwiperSlide
          key={post.id}
          className="h-[400px] w-full overflow-hidden rounded-md bg-white"
        >
          <div
            key={post.id}
            className={"flex h-[400px] items-center overflow-hidden"}
          >
            <div className="relative w-full">
              <img
                className="h-[400px] w-full rounded-lg object-cover"
                src={
                  post.notionDetail?.cover_url ||
                  "https://raw.githubusercontent.com/A1ex-01/drawing-board/main/blog/blog-bg.png"
                }
                alt=""
              />
              <div className="tags absolute left-2 top-2 flex h-7 gap-1">
                {post.notionDetail?.tags?.map((tag) => (
                  <Badge
                    key={tag.id}
                    className="cursor-pointer bg-[#788086]/80 text-white"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <div className="content absolute bottom-0 w-full bg-foreground/20 p-4 py-2">
                <div className="flex h-7 items-center justify-between gap-2">
                  <time
                    className="text-sm text-background"
                    dateTime={post.notionDetail?.created_at}
                  >
                    {dayjs(post.notionDetail?.created_at).format(
                      "YYYY-MM-DD HH:mm",
                    )}
                  </time>
                  {post.notionDetail?.category?.name && (
                    <Badge>{post.notionDetail?.category?.name}</Badge>
                  )}
                </div>
                <Link
                  href={`/post/${post.notion_page_id}`}
                  className="line-clamp-1 overflow-hidden text-ellipsis py-1 text-xl font-[500] text-background"
                >
                  {post.notionDetail?.title}
                </Link>
                <p className="mb-2 line-clamp-2 overflow-hidden text-ellipsis text-sm text-background">
                  {post.notionDetail?.content}
                </p>

                <div className="user mt-3 flex w-full items-center gap-2 text-background">
                  <img
                    alt="avatar"
                    className="h-10 w-10 rounded-full object-cover hover:scale-105"
                    width={40}
                    height={40}
                    src={post.userDetail.avatar}
                  />
                  <div className="right">
                    <div className="text-sm">出自</div>
                    <div className="font-[500]">{post.userDetail.nickname}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
