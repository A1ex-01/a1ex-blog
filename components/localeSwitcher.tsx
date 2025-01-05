"use client";

import { useParams } from "next/navigation";
import * as React from "react";

import { ILocale, locales } from "@/config/lng";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/lib/navigation";
import AxIcon from "./AxIcon";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const pathname = usePathname();
  const params = useParams();

  const changeLocale = (nextLocale: ILocale) => {
    startTransition(() => {
      router.replace(
        {
          pathname,
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          params
        },
        { locale: nextLocale }
      );
    });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {t("locale", { locale: locale })}
            <AxIcon icon={"tabler:selector"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Pick language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(e: ILocale) => {
              console.log(e);
              changeLocale(e);
            }}
          >
            {locales.map((cur: ILocale) => (
              <DropdownMenuRadioItem disabled={isPending || locale === cur} key={cur} value={cur}>
                <div className="w-full cursor-pointer items-center flex justify-between">
                  <span>{t("locale", { locale: cur })}</span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
