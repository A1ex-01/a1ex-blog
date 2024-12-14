import { getPosts } from "@/services/common";
import { notFound } from "next/navigation";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
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
    data: { list, total }
  } = res;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="title font-bold text-[180px] text-center">THE</div>
      <div className="title font-bold text-[180px] text-center">BLOG</div>

      {children}
    </div>
  );
}
