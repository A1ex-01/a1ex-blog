import { getMetadata } from "@/lib/metadata";
import { getPost } from "@/services/common";
import { IPost } from "@/services/types";
import "github-markdown-css";
import { notFound } from "next/navigation";
import { cache } from "react";
import InterceptingModal from "./_components/InterceptingModal";
interface pageProps {}
const getData = cache(async (uuid: string) => {
  const res = await getPost(uuid);
  return res;
});
export const generateMetadata = async ({
  params,
}: {
  params: {
    uuid: string;
  };
}) => {
  const { uuid } = await params;
  const res = await getData(uuid);
  if (!res?.success) notFound();
  const post: IPost = res?.data || {};
  return getMetadata({
    title: post.notionDetail?.title,
    description: post.notionDetail?.title || undefined,
    overrides: {
      openGraph: {
        title: post.notionDetail?.title,
        description: post.notionDetail?.title || undefined,
        type: "website",
        // TODO: og images
      },
    },
  });
};
export default async function page({ params }: pageProps) {
  const { uuid } = await params;
  const res = await getData(uuid);
  if (!res?.success) notFound();
  const post: IPost = res.data;
  return <InterceptingModal post={post} />;
}
