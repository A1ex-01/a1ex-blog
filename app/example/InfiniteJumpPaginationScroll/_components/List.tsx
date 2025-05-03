"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ICP } from "@/types";
import { useEventListener, useMount } from "ahooks";
import { ceil } from "lodash";
import { forwardRef, Ref, useCallback, useImperativeHandle, useRef, useState } from "react";
import ListItem from "./ListItem";

interface ListProps {
  className?: string;
  request: (params: ICP) => Promise<IData>;
  paginationRender?: (
    {
      total,
      current,
      pageSize,
      loading,
      totalPage,
      pulling
    }: {
      total: number;
      current: number;
      pageSize: number;
      loading: boolean;
      totalPage: number;
      pulling: boolean;
    },
    totalPage: number
  ) => React.ReactNode;
}

export interface IListItem {
  title: string;
  current?: number;
}

export interface IListRef {
  jumpTo: (current: number) => void;
  reset: () => void;
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
  isReset: boolean;
  isPush: boolean;
}

function List({ className, request, paginationRender }: ListProps, ref: Ref<IListRef | null>) {
  const [data, setData] = useState<IListItem[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pulling, setIsPulling] = useState(false);
  const onRequest = useCallback(async (params: ICP, options: IOnRequestOptions) => {
    const { isReset, isPush } = options || {};
    if (isPush) {
      setLoading(true);
    } else {
      setIsPulling(true);
    }
    const res = await request(params);
    if (isPush) {
      setLoading(false);
    } else {
      setIsPulling(false);
    }
    if (res.success) {
      const data = res.list?.map((item) => ({
        ...item,
        current: params.current
      }));
      if (isReset) {
        setData(data);
      } else {
        setData((pre) => {
          if (isPush) {
            return [...pre, ...data];
          } else {
            return [...data, ...pre];
          }
        });
      }
      setHasMore(res.hasMore);
      setTotal(res.total);
      setCurrent(params.current || 1);
      setPageSize(params.pageSize || 10);
    }
  }, []);
  useImperativeHandle(ref, () => {
    console.log(data, hasMore, total, pageSize, loading, onRequest);
    return {
      reset: () => {
        onRequest(
          { current: 1, pageSize: 10 },
          {
            isReset: true,
            isPush: true
          }
        );
      },
      jumpTo(current: number) {
        onRequest(
          { current: current, pageSize: 10 },
          {
            isReset: true,
            isPush: true
          }
        );
      }
    };
  }, [data, hasMore, total, pageSize, loading, onRequest]);

  useMount(() => {
    onRequest(
      { current: 1, pageSize: 10 },
      {
        isReset: true,
        isPush: true
      }
    );
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEventListener(
    "scroll",
    () => {
      if (!wrapperRef?.current) return;
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current || {};
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("🐽🐽 List.tsx onReachBottom", hasMore, current);
        if (hasMore) {
          onRequest(
            { current: current + 1, pageSize: 10 },
            {
              isReset: false,
              isPush: true
            }
          );
        }
      } else if (scrollTop <= 0) {
        const canPull = data?.[0]?.current !== 1;
        if (canPull) {
          onRequest(
            { current: current - 1, pageSize: 10 },
            {
              isReset: false,
              isPush: false
            }
          );
        }
      }
    },
    {
      target: wrapperRef?.current || null
    }
  );
  return (
    <>
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
      {paginationRender &&
        paginationRender(
          {
            current,
            pageSize,
            total,
            loading,
            totalPage: ceil(total / pageSize),
            pulling
          },
          ceil(total / pageSize)
        )}
    </>
  );
}
export default forwardRef(List);
