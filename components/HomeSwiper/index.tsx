"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { IPost } from "@/services/types";
import dayjs from "dayjs";
import { EffectCards } from "swiper/modules";
// import CategoryIcon from '@/assets/icon/category.svg'
// import TagIcon from '@/assets/icon/tag.svg'
import Link from "next/link";
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
        <SwiperSlide key={post.id} className="w-full rounded-md overflow-hidden h-[400px] bg-white">
          <div key={post.id} className={"flex h-[400px] items-center overflow-hidden"}>
            <div className="w-full relative">
              <img
                className="w-full object-cover rounded-lg h-[400px]"
                src={post.notion?.cover || "/imgs/bg-cover.jpg"}
                alt=""
              />
              <div className="tags h-7 flex gap-1 absolute top-2 left-2">
                {post.notion?.tags?.map((tag) => (
                  <Badge key={tag.id} className="bg-[#788086]/80 cursor-pointer text-white">
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <div className="content bg-black/20 p-4 absolute bottom-0 py-2">
                <div className="flex h-7 justify-between gap-2 items-center">
                  <time className="text-sm text-font-light" dateTime={post.notion?.createdAt}>
                    {dayjs(post.notion?.createdAt).format("YYYY-MM-DD HH:mm")}
                  </time>
                  {post.notion?.category?.name && <Badge>{post.notion?.category?.name}</Badge>}
                </div>
                <Link
                  href={`/post/${post.notion_page_id}`}
                  className="text-font-main text-xl font-[500] py-1 line-clamp-1 overflow-hidden text-ellipsis"
                >
                  {post.notion?.title}
                </Link>
                <p className="line-clamp-2 overflow-hidden text-ellipsis mb-2 text-font-sub text-sm">
                  {post.notion?.content}
                </p>

                <div className="user flex gap-2 items-center mt-3">
                  <img
                    alt="avatar"
                    className="rounded-full w-10 h-10 hover:scale-105 object-cover"
                    width={40}
                    height={40}
                    src={post.userDetail.avatar}
                  />
                  <div className="right">
                    <div className="text-font-sub-color text-sm">出自</div>
                    <div className="text-font-color font-[500]">{post.userDetail.nickname}</div>
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
