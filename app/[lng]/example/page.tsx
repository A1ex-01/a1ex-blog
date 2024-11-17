import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ExampleProps {}
const examples = [
  {
    label: "svg 过渡变换",
    path: "example/svgTransform"
  }
];
export default function Example(props: ExampleProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold my-10 text-primary">Example</h2>
      <div className="list flex items-center gap-4 flex-wrap">
        {examples.map((item) => (
          <Button
            as={Link}
            href={item.path}
            className="text-lg bg-[#eff1f8] rounded-lg px-4 py-2"
            key={item.path}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
