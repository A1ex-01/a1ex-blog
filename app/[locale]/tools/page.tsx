import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function Tools() {
  const tools = [
    {
      title: "transformer",
      desc: "transform js code to any type",
      url: "/tools/transformer",
    },
  ];
  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="my-10 text-3xl font-bold text-primary">Tools</h2>
      <main className="my-4">
        <div className="list grid grid-cols-3 gap-10">
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
