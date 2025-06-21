"use client";
// import axios from 'axios'
import { IPost } from "@/services/types";
import dayjs from "dayjs";
// import CategoryIcon from '@/assets/icon/category.svg'
// import TagIcon from '@/assets/icon/tag.svg'
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
export default function PostCard({ post }: { post: IPost }) {
  return (
    <Card key={post.id} className={"flex items-center rounded-md"}>
      <div className="relative w-full">
        <img
          className="h-[266px] w-full rounded-lg object-cover"
          src={post.notionDetail?.cover_url || "/imgs/bg-cover.jpg"}
          alt=""
        />
        <div className="p-4">
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
          <div className="content py-2">
            <div className="flex h-7 items-center justify-between gap-2">
              <time
                className="text-sm text-foreground/60"
                dateTime={post.notionDetail?.created_at}
              >
                {dayjs(post.notionDetail?.created_at).format(
                  "YYYY-MM-DD HH:mm",
                )}
              </time>
              {post.notionDetail?.category?.name && (
                <Badge color="primary">
                  {post.notionDetail?.category?.name}
                </Badge>
              )}
            </div>
            <Link
              href={`/post/${post.notion_page_id}`}
              className="line-clamp-1 overflow-hidden text-ellipsis py-1 text-xl font-[500] text-foreground"
            >
              {post.notionDetail?.title}
            </Link>
            <p className="mb-2 line-clamp-2 overflow-hidden text-ellipsis text-sm text-foreground/75">
              {post.notionDetail?.content}
            </p>

            <div className="user mt-3 flex items-center gap-2">
              <img
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover hover:scale-105"
                width={40}
                height={40}
                src={post.userDetail.avatar}
              />
              <div className="right">
                <div className="text-sm text-foreground/75">出自</div>
                <div className="font-[500] text-foreground">
                  {post.userDetail.nickname}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
