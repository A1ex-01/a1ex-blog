"use client";

import FullPageLoading from "@/components/FullPageLoading";
import { useEffect, useState } from "react";

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const [progress, setProgress] = useState(0);
  const initPreloadSource = async () => {
    if (typeof window === "undefined") return;
    const createjs = window.createjs;
    const queue = new createjs.LoadQueue();
    queue.on("progress", (progress) => {
      setProgress(progress.loaded);
      console.log("progress", progress.loaded);
    });

    queue.loadManifest([
      {
        id: "/imgs/bg-cover.jpg",
        src: "/imgs/bg-cover.jpg"
      }
    ]);
    queue.on("complete", (e) => {
      console.log("done", queue.getResult("myImage"));
    });
  };
  useEffect(() => {
    initPreloadSource();
  }, []);
  return (
    <>
      {progress < 1 && <FullPageLoading />}
      {children}
    </>
  );
}
