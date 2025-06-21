"use client";
import { siteConfig } from "@/config/site";
import { usePathname } from "@/i18n/navigation";
import Link from "next/link";
import { PiListStarBold } from "react-icons/pi";
import { TbHomeFilled, TbMessage, TbTools } from "react-icons/tb";
import { IconLogo } from "../icons";
import LocaleSwitcher from "../locale-switcher";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

interface NavProps {}

export default function Nav(props: NavProps) {
  const pathname = usePathname();
  const ICON_MAP = {
    Home: <TbHomeFilled size={26} />,
    Tools: <TbTools size={26} />,
    Example: <PiListStarBold size={26} />,
    Chat: <TbMessage size={26} />,
  } as const;

  return (
    <div className="flex flex-col items-center">
      <div className="placeholder z-10 h-[60px] w-1 flex-shrink-0"></div>
      <nav className="fixed top-0 z-10 mx-auto flex w-full max-w-[1080px] items-center justify-center gap-10 rounded-b-md bg-background px-10 py-0">
        <Link href="/">
          <IconLogo size={60} />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {siteConfig.navItems.map((item) => {
              const isActive = pathname.includes(item.path);

              return (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.path}>
                    <Button variant={isActive ? "default" : "ghost"}>
                      <span className="mr-2">
                        {ICON_MAP[item.keyword as keyof typeof ICON_MAP]}
                      </span>
                      {item.keyword}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-4">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <div>a1ex</div>
      </nav>
    </div>
  );
}
