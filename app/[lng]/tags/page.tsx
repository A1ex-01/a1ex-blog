import { getTags } from "@/services/common";
import { ITag } from "@/services/types";
import { notFound } from "next/navigation";

export default async function Category() {
  const getTagList = async () => {
    const res = await getTags();
    return res;
  };
  const res = await getTagList();
  if (!res?.success) return notFound();
  const { data } = res;
  return (
    <div className="">
      <main className="">
        <h2 className="text-3xl font-bold my-10 text-primary">标签</h2>

        <div className="list flex items-center gap-4 flex-wrap">
          {data.map((item: ITag) => (
            <div className="text-lg bg-[#eff1f8] rounded-lg px-4 py-2" key={item.id}>
              # {item.name} <span className="count">{item.id}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
