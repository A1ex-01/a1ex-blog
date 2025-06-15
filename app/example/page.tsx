import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ExampleProps {}
const examples = [
  {
    label: "无限分页跳转滚动",
    path: "/example/InfiniteJumpPaginationScroll"
  },
  {
    label: "勋章特效",
    path: "/example/medal-rotation"
  }
];
export default function Example(props: ExampleProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold my-10 text-primary">Example</h2>
      <div className="list flex items-center gap-4 flex-wrap">
        {examples.map((item) => (
          <Link href={item.path} key={item.path}>
            <Button>{item.label}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
