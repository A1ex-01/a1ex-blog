import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./config/lng";

export const config = {
  matcher: ["/", "/(zh|en)/:path*", "/((?!static|.*\\..*|_next).*)"] // Run middleware on API routes],
};

const nextIntlMiddleware = createMiddleware({
  defaultLocale,
  locales
});

export default async (req) => {
  const { nextUrl } = req;
  const isApi = nextUrl.pathname.startsWith("/api/");

  if (isApi) {
    return;
  }
  return nextIntlMiddleware(req);
};
