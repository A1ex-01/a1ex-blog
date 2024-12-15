"use client";
import { timeZone } from "@/config/global";
import { ILocale } from "@/config/lng";
import { ICodeFragment } from "@/types";
import { arSA, deDE, enUS, esES, frFR, jaJP, koKR, ptPT, zhCN, zhTW } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import * as React from "react";
import ClientProvider from "./ClientProvider";
import { CommonProvider } from "./CommonProvider";
interface ProvidersProps {
  children: React.ReactNode;
  dicts: any;
  lng: ILocale;
  codeFragments: ICodeFragment[];
}
const localeMap = {
  en: enUS,
  zh: zhCN,
  tw: zhTW,
  ja: jaJP,
  ko: koKR,
  fr: frFR,
  es: esES,
  de: deDE,
  pt: ptPT,
  ar: arSA
};
export default function Providers({ children, dicts, lng, codeFragments }: ProvidersProps) {
  return (
    <ClerkProvider localization={localeMap[lng] ?? enUS}>
      <NextIntlClientProvider messages={dicts} locale={lng} timeZone={timeZone}>
        <ClientProvider>
          <CommonProvider codeFragments={codeFragments}>{children}</CommonProvider>
        </ClientProvider>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
