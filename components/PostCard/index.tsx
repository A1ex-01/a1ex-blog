"use client";
// import axios from 'axios'
import { IPost } from "@/services/types";
import dayjs from "dayjs";
// import CategoryIcon from '@/assets/icon/category.svg'
// import TagIcon from '@/assets/icon/tag.svg'
import Link from "next/link";
import { Badge } from "../ui/badge";
export default function PostCard({ post }: { post: IPost }) {
  console.log("🚀 ~ PostCard ~ post:", post);
  return (
    <div key={post.id} className={"flex items-center"}>
      <div className="w-full relative">
        <img
          className="w-full object-cover rounded-lg h-[266px]"
          src={post.notionDetail?.cover_url || "/imgs/bg-cover.jpg"}
          alt=""
        />
        <div className="tags h-7 flex gap-1 absolute top-2 left-2">
          {post.notionDetail?.tags?.map((tag) => (
            <Badge key={tag.id} className="bg-[#788086]/80 cursor-pointer text-white">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="content py-2">
          <div className="flex h-7 justify-between gap-2 items-center">
            <time className="text-sm text-font-light" dateTime={post.notionDetail?.created_at}>
              {dayjs(post.notionDetail?.created_at).format("YYYY-MM-DD HH:mm")}
            </time>
            {post.notionDetail?.category?.name && (
              <Badge color="primary">{post.notionDetail?.category?.name}</Badge>
            )}
          </div>
          <Link
            href={`/post/${post.notion_page_id}`}
            className="text-font-main text-xl font-[500] py-1 line-clamp-1 overflow-hidden text-ellipsis"
          >
            {post.notionDetail?.title}
          </Link>
          <p className="line-clamp-2 overflow-hidden text-ellipsis mb-2 text-font-sub text-sm">
            {post.notionDetail?.content}
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
  );
}
