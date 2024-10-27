import { getPathname } from "@/lib/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Tools({ params: { lng } }) {
  const t = await getTranslations();
  const tools = [
    {
      title: t("transformer"),
      desc: "transform js code to any type",
      url: "/tools/transformer"
    }
  ];
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold my-10 text-primary">{t("Tools")}</h2>
      <main className=" my-4">
        <div className="list grid grid-cols-3  gap-10">
          {tools.map((item) => (
            <Card
              key={item.title}
              className=""
              as={Link}
              href={getPathname({
                href: item.url,
                locale: lng
              })}
            >
              <CardHeader className="flex-col items-start font-bold text-primary text-lg">
                {item.title}
              </CardHeader>
              <CardBody className="">{item.desc}</CardBody>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
