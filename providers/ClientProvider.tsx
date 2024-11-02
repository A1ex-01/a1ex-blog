"use client";
import * as React from "react";
interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <>{children}</>;
}
