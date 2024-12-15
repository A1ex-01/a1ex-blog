"use client";
import { IPagination } from "@/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { Pagination, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";

interface PaginationProps extends IPagination {}

export default function HomePagination({ current, pageSize, total }: PaginationProps) {
  const totalPage = Math.ceil(total / pageSize!);
  return (
    <div className="flex list-none gap-5 items-center mx-auto">
      <Pagination>
        <PaginationItem>
          <PaginationPrevious href={`/home/${current! - 1}`} />
        </PaginationItem>
        {Array.from({ length: totalPage }, (_, index) => (
          <PaginationItem key={index + 1}>
            <Link href={`/home/${index + 1}`}>
              <Button variant={current === index + 1 ? "default" : "ghost"}>{index + 1}</Button>
            </Link>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={`/home/${current! + 1}`} />
        </PaginationItem>
      </Pagination>
    </div>
  );
}
