"use client";
import { useScroll } from "ahooks";
import { ceil } from "lodash";
import React, { createContext, useContext, useMemo } from "react";

interface GlobalWrapperScrollOptions {}

interface GlobalWrapperScrollContextType {
  scroll?: {
    top: number;
    left: number;
  };
  progress: number;
}

const GlobalWrapperScrollContext = createContext<GlobalWrapperScrollContextType | null>(null);

export const useGlobalWrapperScroll = (): GlobalWrapperScrollContextType => {
  const context = useContext(GlobalWrapperScrollContext);
  if (!context) {
    throw new Error("useGlobalWrapperScroll must be used within a GlobalWrapperScrollProvider");
  }
  return context;
};

export const GlobalWrapperScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const scroll = useScroll(wrapperRef);
  const progress = useMemo(() => {
    if (typeof window === "undefined") return 0;
    const vh = window.innerHeight;
    const scrollH = wrapperRef?.current?.scrollHeight || 0;
    const per = ((scroll?.top || 0) / (scrollH - vh)) * 100;
    return ceil(per || 0, 0);
  }, [scroll?.top, wrapperRef?.current]);

  return (
    <GlobalWrapperScrollContext.Provider value={{ scroll, progress }}>
      <div ref={wrapperRef} className="wrapper h-screen w-screen overflow-y-scroll scrollable">
        {children}
      </div>
    </GlobalWrapperScrollContext.Provider>
  );
};
