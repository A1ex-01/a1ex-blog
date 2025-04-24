"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ICP } from "@/types";
import { useEventListener, useMount } from "ahooks";
import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import ListItem from "./ListItem";
import { ceil } from "lodash";

interface ListProps {
  className?: string;
  request: (params: ICP) => Promise<IData>;
}

export interface IListItem {
  title: string
  current?: number
}

export interface IListRef {
  list: IListItem[];
  hasMore: boolean;
  total: number;
  loading: boolean;
  totalPage: number
  jumpTo: (current: number) => void
}

export interface IData {
  success: boolean;
  list: IListItem[];
  hasMore: boolean;
  total: number;
}

interface IOptions {
  onReachBottom?: () => void;
  onReachTop?: () => void;
  deps: any[];
}


interface IOnRequestOptions {
  isReset: boolean
  isPush: boolean
}

function List({ className, request }: ListProps, ref: Ref<IListRef | null>) {
  const [data, setData] = useState<IListItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pulling, setIsPulling] = useState(false)
  useImperativeHandle(ref, () => {
    return {
      list: data,
      hasMore,
      total,
      pageSize,
      loading,
      reset: () => {
        onRequest({ current: 1, pageSize: 10 }, {
          isReset: true,
          isPush: true
        })
      },
      jumpTo(current: number) {
        onRequest({ current: current, pageSize: 10 }, {
          isReset: true,
          isPush: true
        })
      },
      totalPage: ceil(total / pageSize)
    };
  });
  const onRequest = async (params: ICP, options: IOnRequestOptions) => {
    const { isReset, isPush } = options || {}
    if (isPush) {
      setLoading(true);
    } else {
      setIsPulling(true)
    }
    const res = await request(params);
    if (isPush) {
      setLoading(false);
    } else {
      setIsPulling(false)
    }
    if (res.success) {
      const data = res.list?.map(item => ({
        ...item,
        current: params.current
      }))
      if (isReset) {
        setData(data);
      } else {
        setData((pre) => {
          if (isPush) {
            return [...pre, ...data]
          } else {
            return [...data, ...pre]
          }
        });
      }
      setHasMore(res.hasMore);
      setTotal(res.total);
      setPage(params.current || 1);
      setPageSize(params.pageSize || 10);
    }
  };
  useMount(() => {
    onRequest({ current: 1, pageSize: 10 }, {
      isReset: true,
      isPush: true
    });
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEventListener(
    "scroll",
    () => {
      if (!wrapperRef?.current) return;
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current || {};
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("🐽🐽 List.tsx onReachBottom", hasMore, page);
        if (hasMore) {
          onRequest({ current: page + 1, pageSize: 10 }, {
            isReset: false,
            isPush: true
          })
        }
      } else if (scrollTop <= 0) {
        const canPull = data?.[0]?.current !== 1;
        if (canPull) {
          onRequest({ current: page - 1, pageSize: 10 }, {
            isReset: false,
            isPush: false
          })
        }
        console.log("🐽🐽 List.tsx onReachTop", canPull);
      }
    },
    {
      target: wrapperRef?.current || null
    }
  );
  return (
    <div ref={wrapperRef} className={cn("list flex flex-col gap-4 overflow-y-scroll", className)}>
      {pulling && (
        <div className="flex items-center">
          <Skeleton className="h-10 w-full" />
        </div>
      )}
      {data?.map((item: IListItem, index: number) => <ListItem key={index} item={item} />)}
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
