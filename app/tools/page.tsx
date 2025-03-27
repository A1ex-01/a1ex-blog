import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Tools() {
  const tools = [
    {
      title: "transformer",
      desc: "transform js code to any type",
      url: "/tools/transformer"
    }
  ];
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold my-10 text-primary">Tools</h2>
      <main className="my-4">
        <div className="list grid grid-cols-3  gap-10">
          {tools.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>
                  <Link href={item.url}>{item.title}</Link>
                </CardTitle>
                <CardDescription className="">{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
