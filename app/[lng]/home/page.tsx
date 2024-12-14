import Pagination from "@/components/Paginnation";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/services/common";
import { IPost } from "@/services/types";
import { notFound } from "next/navigation";

export default async function Home() {
  const getPostList = async () => {
    const res = await getPosts({
      current: 1,
      pageSize: 6
    });
    return res;
  };
  const res = await getPostList();

  if (!res?.success) return notFound();
  const {
    data: { list, total }
  } = res;
  return (
    <div className="mb-10">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="list grid grid-cols-3 gap-4">
          {list.map((item: IPost) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
        <Pagination pageSize={6} current={1} total={total} />
      </main>
    </div>
  );
}
