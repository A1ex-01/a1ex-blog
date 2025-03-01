import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPathname } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Tools({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations("Basic");
  // const { data, success } = await getNotionBlogs(process.env.NEXT_PUBLIC_NOTION_DATABASE_BLOG_ID);
  // if (!success) return notFound();
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
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>
                  <Link href={getPathname({ href: item.url, locale: lng })}>{item.title}</Link>
                </CardTitle>
                <CardDescription className="">{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
      {/* <div className="my-10 notionblogs">
        <h2 className="text-3xl font-bold my-10 text-primary">NotionBlogs</h2>
        <div className="list grid grid-cols-3  gap-10">
          {data?.map((item: INotionBlog) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={item.url} target="_blank">
                    {item?.properties["名称"].title[0].plain_text}
                  </Link>
                </CardTitle>
                <CardDescription className="">
                  {item?.properties["名称"].title[0].plain_text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
}
