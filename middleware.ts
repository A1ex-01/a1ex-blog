import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(["/zh/example(.*)"]);

export default clerkMiddleware((auth, req) => {
  // 先处理国际化
  const intlResponse = intlMiddleware(req);

  // 如果是受保护的路由，检查认证
  if (isProtectedRoute(req)) {
    auth.protect();
  }

  return intlResponse;
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
