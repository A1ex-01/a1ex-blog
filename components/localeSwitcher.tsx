"use client";

import { useParams } from "next/navigation";
import * as React from "react";

import { ILocale, locales } from "@/config/lng";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/lib/navigation";

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
      <Dropdown>
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
      </Dropdown>
    </div>
  );
}
