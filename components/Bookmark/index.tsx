"use client";
import { useOgp } from "@/hooks/useOgp";
import { IOgpData } from "@/types";
import { Loading } from "./Loading";

interface BookmarkViewProps {
  ogp: IOgpData;
}

// Presentational Component for Desktop
export const BookmarkViewDesktop = ({ ogp }: BookmarkViewProps) => {
  const { title, description, faviconUrl, pageUrl, ogImgUrl } = ogp;
  const w = ogImgUrl ? "w-3/5" : "w-full";
  const ml = faviconUrl ? "ml-2" : "";

  return (
    <a href={pageUrl} target="_blank" rel="noreferrer">
      <article className="flex justify-between h-40 rounded border border-gray-400 hover:shadow-lg transition-shadow border-solid">
        <div className={`flex flex-col justify-between p-5 ${w}`}>
          <div className="text-2xl truncate">{title}</div>
          <div className="overflow-hidden text-base text-gray-500 truncate">{description}</div>
          <div className="flex items-center">
            <div className={`text-base truncate ${ml}`}>{pageUrl}</div>
          </div>
        </div>
        {ogImgUrl && (
          <div className="w-2/5 h-full rounded">
            <img src={ogImgUrl} className="object-cover w-full h-full" alt="" />
          </div>
        )}
      </article>
    </a>
  );
};

const BookmarkView = ({ ogp }: BookmarkViewProps) => (
  <>
    <BookmarkViewDesktop ogp={ogp} />
  </>
);

export const Bookmark = ({ url }: { url: string }) => {
  console.log("🚀 ~ Bookmark ~ url:", url);
  const { data, error, loading } = useOgp(url);
  // for debug
  if (error) return <p className="text-red-500">bookmark {url} 数据拉取失败</p>;

  if (loading || !data) return <Loading />;

  return <BookmarkView ogp={data} />;
};
