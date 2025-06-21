import { posts } from "@/mock/posts";

export async function GET(req, res) {
  console.log("🐽🐽 get-posts.ts handler req:", req);
  const allList = posts;
  const { searchParams } = new URL(req.url);
  const pageSize = Number(searchParams.get("pageSize")) || 2;
  const current = Number(searchParams.get("current")) || 1;

  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedList = allList.slice(startIndex, endIndex);
  return new Response(
    JSON.stringify({
      message: "",
      success: true,
      data: {
        list: paginatedList,
        total: posts.length,
      },
    }),
  );
}
