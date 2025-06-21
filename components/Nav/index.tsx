"use client";
import { siteConfig } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { PiListStarBold } from "react-icons/pi";
import { TbHomeFilled, TbMessage, TbTools } from "react-icons/tb";
import { IconLogo } from "../icons";
import LocaleSwitcher from "../locale-switcher";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
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
      <Card className="fixed top-0 z-10 mx-auto flex w-full max-w-6xl items-center justify-center gap-10 rounded-t-none px-10 py-0">
        <Link href="/">
          <IconLogo size={60} />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {siteConfig.navItems.map((item) => {
              function getIsActive() {
                if (item.path === "/") {
                  return pathname === "/" || pathname.includes("/home");
                }

                return pathname.includes(item.path);
              }

              return (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.path}>
                    <Button variant={getIsActive() ? "default" : "ghost"}>
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
        <div>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button color="primary">Login</Button>
          </SignInButton>
        </SignedOut>
      </Card>
    </div>
  );
}
