import { getPost } from "@/services/common";
import { IPost } from "@/services/types";
import "github-markdown-css";
import { notFound } from "next/navigation";
import InterceptingModal from "./_components/InterceptingModal";
interface pageProps {}

export default async function page({ params: { uuid } }: pageProps) {
  const res = await getPost(uuid);
  if (!res?.success) notFound();
  const post: IPost = res.data;
  return <InterceptingModal post={post} />;
}
