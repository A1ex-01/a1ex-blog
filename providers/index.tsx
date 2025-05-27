"use client";
import { ICodeFragment } from "@/types";
import { ClerkProvider } from "@clerk/nextjs";
import * as React from "react";
import ClientProvider from "./ClientProvider";
import { CommonProvider } from "./CommonProvider";
interface ProvidersProps {
  children: React.ReactNode;
  codeFragments: ICodeFragment[];
}
export default function Providers({ children, codeFragments }: ProvidersProps) {
  return (
    <ClerkProvider afterSignOutUrl={"/chat"}>
      <ClientProvider>
        <CommonProvider codeFragments={codeFragments}>{children}</CommonProvider>
      </ClientProvider>
    </ClerkProvider>
  );
}
