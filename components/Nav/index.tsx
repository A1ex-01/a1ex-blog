"use client";
import { siteConfig } from "@/config/site";
import { getActive } from "@/utils";
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
import Image from "next/image";
import { default as Link } from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoIcon } from "../icons";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavProps {}

export default function Nav(props: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Navbar isMenuOpen={isMenuOpen} maxWidth="xl" isBordered>
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
              {item.name}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Button color="primary">Login</Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
