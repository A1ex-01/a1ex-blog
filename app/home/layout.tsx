import HomeSwiper from "@/components/HomeSwiper";
import { getPosts } from "@/services/common";
import { console } from "inspector";
import { notFound } from "next/navigation";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  console.log("home layout");
  const getPostList = async () => {
    const res = await getPosts({
      current: 1,
      pageSize: 3
    });
    return res;
  };
  const res = await getPostList();

  if (!res?.success) return notFound();
  const {
    data: { list }
  } = res;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="wrapper grid grid-cols-2 w-full items-center justify-between">
        <div className="flex-1 flex-shrink-0">
          <div className="title font-bold text-[160px] text-center">THE</div>
          <div className="title font-bold text-[160px] text-center">BLOG</div>
        </div>
        <div className="py-4 px-8 ml-auto w-[500px]">
          <HomeSwiper posts={list} />
        </div>
      </div>

      {children}
    </div>
  );
}
