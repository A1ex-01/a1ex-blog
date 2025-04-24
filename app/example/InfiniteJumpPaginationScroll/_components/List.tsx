"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ICP } from "@/types";
import { useEventListener, useMount } from "ahooks";
import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import ListItem from "./ListItem";

interface ListProps {
  className?: string;
  request: (params: ICP) => Promise<IData>;
}

export interface IListRef {
  list: number[];
  hasMore: boolean;
  total: number;
  loading: boolean;
}

export interface IData {
  success: boolean;
  list: number[];
  hasMore: boolean;
  total: number;
}

interface IOptions {
  onReachBottom?: () => void;
  onReachTop?: () => void;
  deps: any[];
}

function List({ className, request }: ListProps, ref: Ref<IListRef | null>) {
  const [data, setData] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      list: data,
      hasMore,
      total,
      pageSize,
      loading,
      reset: () => {
        if (page !== 1) {
          setPage(1);
        } else {
          setData([]);
          onRequest({ current: 1, pageSize: 10 });
        }
      },
      jumpTo(current: number) {}
    };
  });
  const onRequest = async (params: ICP, isJump: boolean = false) => {
    setLoading(true);

    const res = await request(params);
    console.log("🐽🐽 List.tsx onRequest res:", res);
    setLoading(false);
    if (res.success) {
      if (params.current === 1 || isJump) {
        setData(res.list);
      } else {
        setData((pre) => [...pre, ...res.list]);
      }
      setHasMore(res.hasMore);
      setTotal(res.total);
      //   setPage(params.current || 1);
      setPageSize(params.pageSize || 10);
    }
  };
  useMount(() => {});
  useEffect(() => {
    onRequest({ current: page, pageSize: 10 });
  }, [page]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEventListener(
    "scroll",
    () => {
      if (!wrapperRef?.current) return;
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current || {};
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("🐽🐽 List.tsx onReachBottom", hasMore, page);
        if (hasMore) {
          setPage((pre) => pre + 1);
        }
      } else if (scrollTop <= 0) {
        const canPull = page !== 1 && data[0] !== 1;
        console.log("🐽🐽 List.tsx onReachTop");
      }
    },
    {
      target: wrapperRef?.current || null
    }
  );
  return (
    <div ref={wrapperRef} className={cn("list flex flex-col gap-4 overflow-y-scroll", className)}>
      {data?.map((item: number) => <ListItem key={item} item={item + 1} />)}
      {loading && (
        <div className="flex items-center">
          <Skeleton className="h-10 w-full" />
        </div>
      )}
      {!hasMore && <div className="flex justify-center">没有更多了</div>}
    </div>
  );
}
export default forwardRef(List);
