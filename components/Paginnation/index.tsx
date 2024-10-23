"use client";
import { IPagination } from "@/types";
import { Button, Pagination as NextUIPagination } from "@nextui-org/react";
import Link from "next/link";

interface PaginationProps extends IPagination {}

export default function Pagination({ current, pageSize, total }: PaginationProps) {
  const totalPage = Math.ceil(total / pageSize!);
  return (
    <div className="flex gap-5 items-center mx-auto">
      <Button
        as={Link}
        href={`/home/${current! - 1}`}
        isDisabled={current === 1}
        size="sm"
        variant="flat"
        color="primary"
      >
        Previous
      </Button>
      <NextUIPagination
        renderItem={({ page }) => {
          return (
            <div className=" flex gap-2 items-center" key={page}>
              <Button
                isIconOnly
                key={page}
                as={Link}
                href={`/home/${page}`}
                isDisabled={page === current}
                color="primary"
                variant={page === current ? "shadow" : "faded"}
              >
                {page}
              </Button>
            </div>
          );
        }}
        total={totalPage}
        color="primary"
        page={current}
      />

      <Button
        as={Link}
        href={`/home/${current! + 1}`}
        isDisabled={current === totalPage}
        size="sm"
        variant="flat"
        color="primary"
      >
        Next
      </Button>
    </div>
  );
}
