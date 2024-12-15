"use client";

import { useParams } from "next/navigation";
import * as React from "react";

import { ILocale, locales } from "@/config/lng";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/lib/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
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
            <Icon icon={"tabler:selector"} width="2em" height="2em" />
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
      {/* <Dropdown>
        <DropdownTrigger>
          <Button variant="ghost" endContent={<IconSelector />}>
            {t("locale", { locale: locale })}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {locales.map((cur) => (
            <DropdownItem isDisabled={isPending} key={cur} onClick={() => changeLocale(cur)}>
              <div className="w-full items-center flex justify-between">
                <span>{t("locale", { locale: cur })}</span>
                {locale === cur && <IconCheck className={clsx("ml-auto h-4 w-4 opacity-100")} />}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown> */}
    </div>
  );
}
