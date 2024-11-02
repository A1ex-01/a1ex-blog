"use client";
import { useScroll } from "ahooks";
import React, { createContext, useContext } from "react";

interface GlobalWrapperScrollOptions {}

interface GlobalWrapperScrollContextType {
  scroll?: {
    top: number;
    left: number;
  };
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

  return (
    <GlobalWrapperScrollContext.Provider value={{ scroll }}>
      <div ref={wrapperRef} className="wrapper h-screen w-screen overflow-y-scroll scrollable">
        {children}
      </div>
    </GlobalWrapperScrollContext.Provider>
  );
};
