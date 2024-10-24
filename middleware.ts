import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./config/lng";

const nextIntlMiddleware = createMiddleware({
  defaultLocale,
  locales
});

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = auth();
  console.log("🚀 ~ clerkMiddleware ~ userId, redirectToSignIn:", userId, redirectToSignIn);
  const { nextUrl } = req;
  const isApi = nextUrl.pathname.startsWith("/api/");

  if (isApi) {
    return;
  }
  return nextIntlMiddleware(req);
});

export const config = {
  matcher: ["/", "/(zh|en)/:path*", "/((?!static|.*\\..*|_next).*)"] // Run middleware on API routes],
};
