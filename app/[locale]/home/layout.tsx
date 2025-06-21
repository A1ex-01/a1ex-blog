import Footer from "@/components/footer";
import HomeSwiper from "@/components/HomeSwiper";
import { getPosts } from "@/services/common";
import { notFound } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getPostList = async () => {
    const res = await getPosts({
      current: 1,
      pageSize: 3,
    });
    return res;
  };
  const res = await getPostList();

  if (!res?.success) return notFound();
  const {
    data: { list },
  } = res;
  return (
    <div className="mx-auto max-w-7xl">
      <div className="wrapper grid w-full grid-cols-2 items-center justify-between">
        <div className="flex-1 flex-shrink-0 text-primary">
          <div className="title text-center text-[160px] font-bold">THE</div>
          <div className="title text-center text-[160px] font-bold">BLOG</div>
        </div>
        <div className="ml-auto w-[500px] px-8 py-4">
          <HomeSwiper posts={list} />
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}
