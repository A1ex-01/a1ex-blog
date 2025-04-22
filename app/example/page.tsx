import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ExampleProps {}
const examples = [
  {
    label: "svg 过渡变换",
    path: "example/svgTransform"
  },
  {
    label: "scrollPage",
    path: "example/scrollPage"
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
