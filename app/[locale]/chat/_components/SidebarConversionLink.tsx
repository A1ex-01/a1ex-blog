"use client";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Conversation } from "@/db/redis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbList } from "react-icons/tb";

interface SidebarConversionLinkProps {
  conversation: Conversation;
}

export default function SidebarConversionLink({
  conversation,
}: SidebarConversionLinkProps) {
  const pathname = usePathname();
  return (
    <SidebarMenuButton
      asChild
      isActive={pathname === `/chat/conversation/${conversation.id}`}
    >
      <Link href={`/chat/conversation/${conversation.id}`}>
        <TbList />
        <span>{conversation.id}</span>
      </Link>
    </SidebarMenuButton>
  );
}
