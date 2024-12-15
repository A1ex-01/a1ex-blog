import { getPathname } from "@/lib/navigation";
import { getNotionBlogs } from "@/services/common";
import { INotionBlog } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Tools({ params: { lng } }) {
  const t = await getTranslations("Basic");
  const { data, success } = await getNotionBlogs(process.env.NEXT_PUBLIC_NOTION_DATABASE_BLOG_ID);
  if (!success) return notFound();
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
      <main className="my-4">
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
      <div className="my-10 notionblogs">
        <h2 className="text-3xl font-bold my-10 text-primary">NotionBlogs</h2>
        <div className="list grid grid-cols-3  gap-10">
          {data?.map((item: INotionBlog) => (
            <Card key={item.id} className="" as={Link} href={item.url} target="_blank">
              <CardHeader className="flex-col items-start font-bold text-primary text-lg">
                {item?.properties["名称"].title[0].plain_text}
              </CardHeader>
              <CardBody className="">{item?.properties["名称"].title[0].plain_text}</CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
