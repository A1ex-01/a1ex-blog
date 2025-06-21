import { headers } from "next/headers";

export async function getServerHeaders() {
  try {
    const headerList = await headers();
    const authorization = await headerList.get("authorization");
    return {
      Authorization: authorization ? `Bearer ${authorization}` : null,
    };
  } catch (error) {
    console.log("error:", error);
    return {};
  }
}
