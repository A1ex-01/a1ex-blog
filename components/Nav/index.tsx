"use client";
import { siteConfig } from "@/config/site";
import { getPathname, Link, usePathname } from "@/lib/navigation";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Icon } from "@iconify/react";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { LogoIcon } from "../icons";
import { LocaleSwitcher } from "../localeSwitcher";
import ScrollBall from "../ScrollBall";
import { Button } from "../ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
interface NavProps {}

export default function Nav(props: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Basic");
  return (
    <div className="flex gap-10 items-center static top-0 max-w-7xl py-4 mx-auto">
      <LogoIcon width={30} />
      <NavigationMenu>
        <NavigationMenuList>
          {siteConfig.navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link href={item.path}>
                <Button variant={pathname.includes(item.path) ? "default" : "ghost"}>
                  <Icon icon={item.icon} className="mr-2" width="2em" height="2em" />
                  {t(item.keyword)}
                </Button>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto">
        <LocaleSwitcher />
      </div>
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl={getPathname({ href: "/home", locale: "en" })}>
          <Button color="primary">{t("Login")}</Button>
        </SignInButton>
      </SignedOut>
      <ScrollBall />
    </div>
  );
}
