"use client";
import { useEffect } from "react";
// Error boundaries must be Client Components
import NextError from "next/error";
export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
