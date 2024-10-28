// import axios from 'axios'
import { IPost } from "@/services/types";
import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";
// import CategoryIcon from '@/assets/icon/category.svg'
// import TagIcon from '@/assets/icon/tag.svg'
import Link from "next/link";
export default function PostCard({ post }: { post: IPost }) {
  return (
    <div key={post.id} className={"flex items-center"}>
      <div className="w-full">
        <img className="w-full object-cover rounded-2xl h-[266px]" src={post.notion.cover} alt="" />
        <div className="content py-2">
          <div className="flex justify-between gap-2">
            <time className="text-sm text-font-sub-color" dateTime={post.notion.createdAt}>
              {dayjs(post.notion.createdAt).format("YYYY-MM-DD HH:mm")}
            </time>
            <Chip>{post.notion.category?.name}</Chip>
          </div>
          <Link
            href={`/post/${post.notion_page_id}`}
            className="text-font-color text-xl font-[500] py-1 line-clamp-1 overflow-hidden text-ellipsis"
          >
            {post.notion.title}
          </Link>
          <p className="text-font-sub-color line-clamp-2 overflow-hidden text-ellipsis h-12">
            {post.notion.title}
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
