import { getCates } from "@/services/common";
import { ICategory } from "@/services/types";
import { notFound } from "next/navigation";

export default async function Category() {
  return <>categories</>;
  const getCateList = async (): Promise<any> => {
    const res = await getCates();
    return res;
  };
  const res = await getCateList();
  if (!res?.success) return notFound();
  const { data } = res;
  return (
    <div className="">
      <main className="">
        <h2 className="text-3xl font-bold my-10 text-primary">分类</h2>

        <div className="list flex items-center gap-4 flex-wrap">
          {data.map((item: ICategory) => (
            <div className="text-lg bg-[#eff1f8] rounded-lg px-4 py-2" key={item.id}>
              # {item.name} <span className="count">{item.id}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
