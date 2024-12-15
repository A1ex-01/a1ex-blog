"use client";
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import toast from "react-hot-toast";
interface pageProps {}

export default function page(props: pageProps) {
  const onThrow = () => {
    Sentry.captureException("test error in sentry-example-page", {
      level: "error"
    });
    toast.error("test error");
  };
  return (
    <div className="max-w-7xl mx-auto flex justify-center">
      <Button color="danger" className="mx-auto my-10" onClick={onThrow}>
        throw error
      </Button>
    </div>
  );
}
