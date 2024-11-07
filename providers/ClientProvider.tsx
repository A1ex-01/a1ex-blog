"use client";

import FullPageLoading from "@/components/FullPageLoading";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const [progress, setProgress] = useState(0);
  // const t = useTranslations("Bastic");
  const initPreloadSource = async () => {
    setTimeout(() => {
      setProgress(1);
      toast("Hello, welcome to a1ex`s blog", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff"
        }
      });
    }, 500);
    // if (typeof window === "undefined") return;
    // const createjs = window.createjs;
    // const queue = new createjs.LoadQueue();
    // queue.on("progress", (progress) => {
    //   setProgress(progress.loaded);
    //   console.log("progress", progress.loaded);
    // });

    // queue.loadManifest([
    //   {
    //     id: "/favicon.png",
    //     src: "/favicon.png"
    //   }
    // ]);
    // queue.on("complete", (e) => {
    //   console.log("done", queue.getResult("myImage"));
    // });
  };
  useEffect(() => {
    initPreloadSource();
  }, []);
  return (
    <>
      {progress < 1 && <FullPageLoading />}
      <Toaster />
      {children}
    </>
  );
}
