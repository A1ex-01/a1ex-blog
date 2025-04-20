"use client";
import { siteConfig } from "@/config/site";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiListStarBold } from "react-icons/pi";
import { TbHomeFilled, TbTools } from "react-icons/tb";
import { LogoIcon } from "../icons";
import ScrollBall from "../ScrollBall";
import { Button } from "../ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";

interface NavProps {}

export default function Nav(props: NavProps) {
  const pathname = usePathname();
  const ICON_MAP = {
    Home: <TbHomeFilled size={26} />,
    Tools: <TbTools size={26} />,
    Example: <PiListStarBold size={26} />
  } as const;

  return (
    <nav className="flex gap-10 items-center sticky z-10 bg-white px-10 rounded-b-md top-0 max-w-5xl py-4 mx-auto">
      <LogoIcon width={30} />
      <NavigationMenu>
        <NavigationMenuList>
          {siteConfig.navItems.map((item) => {
            const isActive = pathname.includes(item.path);
            return (
              <NavigationMenuItem key={item.name}>
                <Link href={item.path}>
                  <Button variant={isActive ? "default" : "ghost"}>
                    <span className="mr-2">{ICON_MAP[item.keyword as keyof typeof ICON_MAP]}</span>
                    {item.keyword}
                  </Button>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl={"/home"}>
          <Button color="primary">Login</Button>
        </SignInButton>
      </SignedOut>
      <ScrollBall />
    </nav>
  );
}
