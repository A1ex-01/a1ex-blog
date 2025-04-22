"use client";

import { useHover } from "ahooks";
import { type ReactNode, useCallback, useMemo, useRef } from "react";
import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled, TbDots } from "react-icons/tb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination";

export interface AwsomePaginationProps {
  totalCount: number;
  pageSize: number;
  page: number;
  maxVisiblePages?: number;
  parentPath: string;
}
export function NavigationDots({ type }: { type: "left" | "right" }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(wrapperRef);
  const hoverDom = useMemo(() => {
    if (type === "left") {
      return <TbArrowBadgeLeftFilled />;
    }
    return <TbArrowBadgeRightFilled />;
  }, [type]);
  return (
    <div className="cursor-pointer" ref={wrapperRef}>
      {isHovered ? hoverDom : <TbDots />}
    </div>
  );
}
export function AwesomePagination({
  pageSize,
  totalCount,
  page,
  maxVisiblePages = 5,
  parentPath
}: AwsomePaginationProps) {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const buildLink = useCallback(
    (newPage: number) => {
      return `${parentPath}/${newPage}`;
    },
    [parentPath]
  );
  const renderPageNumbers = useCallback(() => {
    const items: ReactNode[] = [];
    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationLink href={buildLink(page - 2)}>
              <NavigationDots type="left" />
            </PaginationLink>
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationLink href={buildLink(page + 2)}>
              <NavigationDots type="right" />
            </PaginationLink>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink href={buildLink(totalPageCount)} isActive={page === totalPageCount}>
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }, [buildLink, maxVisiblePages, page, totalPageCount]);

  return (
    <div className="flex flex-col md:flex-row h-9 overflow-y-hidden  items-center gap-3 w-full">
      <Pagination>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={page === totalPageCount ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
