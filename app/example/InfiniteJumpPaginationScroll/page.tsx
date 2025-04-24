"use client";
import { ICP } from "@/types";
import { ceil, range } from "lodash";
import { Ref, useRef } from "react";
import List, { IData, IListRef } from "./_components/List";
import { AwesomePagination } from "@/components/AwesomePagination";
import { Button } from "@/components/ui/button";

interface InfiniteJumpPaginationScrollProps { }
const total = 35;

const getData = async (params: ICP): Promise<IData> => {
  return new Promise((resolve) => {
    const current = params.current || 1;
    const pageSize = params.pageSize || 10;
    setTimeout(() => {
      if (current * pageSize < total) {
        resolve({
          success: true,
          list: range((current - 1) * pageSize, current * pageSize).map(item => ({
            title: `Item ${item + 1}`,
          })),
          hasMore: true,
          total: total
        });
      } else {
        resolve({
          success: true,
          list: range((current - 1) * pageSize, total).map(item => ({
            title: `Item ${item + 1}`,
          })),
          hasMore: false,
          total: total
        });
      }
    }, 2000);
  });
};
export default function InfiniteJumpPaginationScroll(props: InfiniteJumpPaginationScrollProps) {
  const listRef = useRef<IListRef>(null);
  console.log(listRef)
  return (
    <div>
      <h1 className="font-bold">InfiniteJumpPaginationScroll</h1>

      <List ref={listRef} request={getData} className="gap-4 w-[300px] h-[300px] mx-auto" />
      <div>{
        [1, 2, 3].map((item, index) => (
          <Button onClick={() => {
            listRef.current?.jumpTo(item)
          }}>{item}</Button>
        ))
      }</div>
    </div>
  );
}
