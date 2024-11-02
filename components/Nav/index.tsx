"use client";
import { siteConfig } from "@/config/site";
import { getPathname, Link } from "@/lib/navigation";
import { getActive } from "@/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoIcon } from "../icons";
import { LocaleSwitcher } from "../localeSwitcher";
import ScrollBall from "../ScrollBall";
interface NavProps {}

export default function Nav(props: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Basic");

  return (
    <Navbar isMenuOpen={isMenuOpen} maxWidth="lg" isBordered>
      {/* {siteConfig.navItems.map((item) => (
        <NavbarMenuItem key={item.name} isActive={item.path === pathname}>
          <Link href={item.path}>{item.name}</Link>
        </NavbarMenuItem>
      ))} */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <LogoIcon width={30} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <LogoIcon width={32} />
        </NavbarBrand>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.name}>
            <Button
              href={item.path}
              color={getActive(item.path, pathname) ? "primary" : "default"}
              variant={getActive(item.path, pathname) ? "flat" : "light"}
              as={Link}
              startContent={<Image src={item.icon} alt={item.name} width={18} />}
            >
              {t(item.keyword)}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <LocaleSwitcher />
        </NavbarItem>
        <NavbarItem className="lg:flex">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
        <NavbarItem className="lg:flex">
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl={getPathname({ href: "/home", locale: "en" })}
            >
              <Button
                color="primary"
                className="w-full"
                // onClick={() => setShowSignInModal(true)}
              >
                {t("Login")}
              </Button>
            </SignInButton>
          </SignedOut>
        </NavbarItem>
        <NavbarItem className="lg:flex">
          <ScrollBall />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.path}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
