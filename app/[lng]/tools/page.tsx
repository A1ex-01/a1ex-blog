import { getTranslations } from "next-intl/server";

export default async function Tools() {
  const t = await getTranslations({
    namespaces: "Basic"
  });
  return (
    <div className="max-w-5xl mx-auto">
      <main className="">
        <h2 className="text-3xl font-bold my-10 text-primary">{t("tools")}</h2>
      </main>
    </div>
  );
}
