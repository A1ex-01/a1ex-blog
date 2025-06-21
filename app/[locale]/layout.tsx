import Nav from "@/components/Nav";
import { getMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import { IUser } from "@/types/user";
import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";
import "../globals.css";

export const generateMetadata = async () => {
  return getMetadata({});
};
//info:  禁用双击缩放
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const isRTL = locale === "ar";
  // if (!locale) {
  //   redirect("/zh/new-post");
  // }

  let user: IUser | null = null;

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        height: "calc(var(--mvh, 1vh) * 100)",
        direction: isRTL ? "rtl" : "ltr",
      }}
      suppressHydrationWarning
    >
      <head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          name="viewport"
        />
        <meta content="portrait" name="screen-orientation" />
        <meta content="portrait" name="x5-orientation" />
      </head>
      <body
        className={cn("h-full w-screen bg-background", isRTL ? "rtl" : "ltr")}
      >
        <Toaster />
        <div className="wrapper mx-auto h-full w-screen">
          <NextIntlClientProvider>
            <Providers user={user}>
              <Nav />
              {children}
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
