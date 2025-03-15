"use client";
import jsonToTs from "json-to-ts";
import { useEffect, useState } from "react";
// import CodeMirror from "./_components/CodeMirror";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const template = `{
  "Basic": {
    "Home": "Home",
    "Categories": "Categories",
    "Tags": "Tags",
    "Login": "Login",
    "Tools": "Tools",
    "transformer": "transformer"
  }
}`;
const CodeMirror = dynamic(() => import("./_components/CodeMirror"), { ssr: false });
export default function Tools() {
  const t = useTranslations("Basic");
  const [value, setValue] = useState(template);
  const [tsValue, setTsValue] = useState(``);
  const getTsText = (value: string) => {
    try {
      const v = JSON.parse(value);
      const tsV = jsonToTs(v).join("\n");
      setTsValue(tsV);
      if (value === template) return;
      toast.success("transform success", {
        // style: {
        //   border: "1px solid #713200",
        //   padding: "16px",
        //   color: "#713200"
        // },
        className: "text-primary"
        // iconTheme: {
        //   primary: "#713200",
        //   secondary: "#FFFAEE"
        // }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getTsText(value);
  }, [value]);
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold my-10 text-primary">{t("transformer")}</h2>
      <div className="top">
        <Badge>json to typescript</Badge>
      </div>
      <main className=" my-4 flex w-full">
        <div className="left flex-1">
          <div className="top border border-divider p-2">JSON</div>
          <div className="edit">
            <CodeMirror
              language="json"
              value={value}
              onChange={(value) => {
                setValue(value);
              }}
            />
          </div>
        </div>
        <div className="right flex-1">
          <div className="top border border-divider p-2">TypeScript</div>
          <div className="edit">
            <CodeMirror readOnly language="typescript" value={tsValue} onChange={(value) => {}} />
          </div>
        </div>
      </main>
    </div>
  );
}
