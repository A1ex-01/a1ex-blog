"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { IUser } from "@/types/user";
import { ClerkProvider } from "@clerk/nextjs";
import { useMount } from "ahooks";
import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import React from "react";
import { UserProvider } from "./user-provider";

interface IProviders {
  children: React.ReactNode;
  user?: IUser;
}

export default function Providers({ children, user, webview }: IProviders) {
  // info: 解决 手机浏览器 100vh 异常问题
  const vhCheck = () => {
    // 模拟 vh
    let vh = window.innerHeight * 0.01;
    // 设置 css 自定义属性
    document.documentElement.style.setProperty("--mvh", `${vh}px`);
  };

  useMount(() => {
    vhCheck();
  });

  const { theme } = useTheme();
  return (
    <ClerkProvider afterSignOutUrl={"/chat"}>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider user={user}>{children}</UserProvider>
        </ThemeProvider>
      </SessionProvider>
    </ClerkProvider>
  );
}
