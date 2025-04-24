"use client";
import { ICP } from "@/types";
import { range } from "lodash";
import { useRef } from "react";
import List, { IData } from "./_components/List";

interface InfiniteJumpPaginationScrollProps {}
const total = 35;

const getData = async (params: ICP): Promise<IData> => {
  return new Promise((resolve) => {
    const current = params.current || 1;
    const pageSize = params.pageSize || 10;
    setTimeout(() => {
      if (current * pageSize < total) {
        resolve({
          success: true,
          list: range((current - 1) * pageSize, current * pageSize),
          hasMore: true,
          total: total
        });
      } else {
        resolve({
          success: true,
          list: range((current - 1) * pageSize, total),
          hasMore: false,
          total: total
        });
      }
    }, 2000);
  });
};
export default function InfiniteJumpPaginationScroll(props: InfiniteJumpPaginationScrollProps) {
  const listRef = useRef(null);

  return (
    <div>
      <h1 className="font-bold">InfiniteJumpPaginationScroll</h1>
      <List ref={listRef} request={getData} className="gap-4 w-[300px] h-[300px] mx-auto" />
    </div>
  );
}
