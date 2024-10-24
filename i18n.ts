import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./config/lng";

export default getRequestConfig(async ({ locale }) => {
  console.log("🚀 ~ getRequestConfig ~ locale:", locale);
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    timeZone: "Asia/Shanghai",
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("./i18n/en.json")
        : import(`./i18n/${locale}.json`))
    ).default
  };
});
