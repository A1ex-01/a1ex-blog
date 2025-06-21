import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface ExampleProps {}
const examples = [
  {
    label: "无限分页跳转滚动",
    path: "/example/infinite-jump-pagination-scroll",
  },
  {
    label: "勋章特效",
    path: "/example/medal-rotation",
  },
];
export default function Example(props: ExampleProps) {
  return (
    <div>
      <h2 className="my-10 text-3xl font-bold text-primary">Example</h2>
      <div className="list flex flex-wrap items-center gap-4">
        {examples.map((item) => (
          <Link href={item.path} key={item.path}>
            <Button>{item.label}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
