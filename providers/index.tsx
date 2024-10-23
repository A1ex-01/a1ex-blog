"use client";
import { ILocale } from "@/config/lng";
import { NextUIProvider } from "@nextui-org/system";
import { NextIntlClientProvider } from "next-intl";
import * as React from "react";

interface ProvidersProps {
  children: React.ReactNode;
  dicts: any;
  lng: ILocale;
}

export default function Providers({ children, dicts, lng }: ProvidersProps) {
  return (
    <NextIntlClientProvider messages={dicts} locale={lng}>
      <NextUIProvider>{children}</NextUIProvider>
    </NextIntlClientProvider>
  );
}
