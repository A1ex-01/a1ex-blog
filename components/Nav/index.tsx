"use client";
import { siteConfig } from "@/config/site";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiListStarBold } from "react-icons/pi";
import { TbHomeFilled, TbMessage, TbTools } from "react-icons/tb";
import { IconLogo } from "../icons";
import { Button } from "../ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";

interface NavProps {}

export default function Nav(props: NavProps) {
  const pathname = usePathname();
  const ICON_MAP = {
    Home: <TbHomeFilled size={26} />,
    Tools: <TbTools size={26} />,
    Example: <PiListStarBold size={26} />,
    Chat: <TbMessage size={26} />
  } as const;

  return (
    <>
      <div className="placeholder w-1 h-[60px] flex-shrink-0 z-10"></div>
      <nav className="flex gap-10 w-full items-center justify-center fixed z-10 bg-white px-10 rounded-b-md top-0 py-0 mx-auto">
        <Link href="/">
          <IconLogo size={60} />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.path !== "/" ? pathname.includes(item.path) : pathname === item.path;
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
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="ml-auto" color="primary">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        {/* <ScrollBall /> */}
      </nav>
    </>
  );
}
