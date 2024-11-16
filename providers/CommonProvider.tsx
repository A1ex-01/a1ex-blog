import { ICodeFragment } from "@/types";
import React, { createContext, useContext } from "react";

interface CommonContextType {
  codeFragments: ICodeFragment[];
}

const CommonContext = createContext<CommonContextType | null>(null);

export const useCommon = (): CommonContextType => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("useCommon must be used within a CommonProvider");
  }
  return context;
};

export const CommonProvider: React.FC<{
  codeFragments: ICodeFragment[];
  children: React.ReactNode;
}> = ({ codeFragments, children }) => {
  return (
    <CommonContext.Provider value={{ codeFragments: codeFragments }}>
      {children}
    </CommonContext.Provider>
  );
};
