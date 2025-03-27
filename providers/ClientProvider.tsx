"use client";

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
    }, 100);
  };
  useEffect(() => {
    // initPreloadSource();
  }, []);
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
