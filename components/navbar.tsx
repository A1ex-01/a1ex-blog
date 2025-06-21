"use client";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { MessageSquare, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const tabs = [
  {
    path: "/new-post",
    icon: <MessageSquare className="mb-1 h-6 w-6" />,
    title: "navNewTab",
  },
  {
    path: "/profile",
    icon: <User className="mb-1 h-6 w-6" />,
    title: "navMineTab",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Basic");
  return (
    <div className="flex">
      {tabs.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={cn(
            "flex flex-1 flex-col items-center py-3",
            pathname === item.path ? "text-primary" : "text-foreground",
          )}
        >
          {item.icon}
          <span className="text-xs">{t(item.title)}</span>
        </Link>
      ))}
    </div>
  );
}
