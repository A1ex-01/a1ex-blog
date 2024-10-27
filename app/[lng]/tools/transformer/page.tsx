"use client";
import { Chip } from "@nextui-org/react";
import jsonToTs from "json-to-ts";
import { useEffect, useState } from "react";
// import CodeMirror from "./_components/CodeMirror";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
const CodeMirror = dynamic(() => import("./_components/CodeMirror"), { ssr: false });
export default function Tools() {
  const t = useTranslations();
  const [value, setValue] = useState(`{
  "Basic": {
    "Home": "Home",
    "Categories": "Categories",
    "Tags": "Tags",
    "Login": "Login",
    "Tools": "Tools",
    "transformer": "transformer"
  },
  "LocaleSwitcher": {
    "label": "Change language",
    "locale": "{locale, select, zh {🇨🇳 简体中文} tw {🇭🇰 繁體中文} en {🇺🇸 English} fr {🇫🇷 Français} ja {🇯🇵 日本語} ko {🇰🇷 한국어} es {🇪🇸 Español} de {🇩🇪 Deutsch} pt {🇧🇷 Português} ar {🇦🇪 العربية} other {Unknown}}"
  }
}`);
  const [tsValue, setTsValue] = useState(``);
  const getTsText = (value: string) => {
    try {
      const v = JSON.parse(value);
      const tsV = jsonToTs(v).join("\n");
      setTsValue(tsV);
    } catch (error) {}
  };
  useEffect(() => {
    getTsText(value);
  }, [value]);
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold my-10 text-primary">{t("transformer")}</h2>
      <div className="top">
        <Chip size="lg" color="primary">
          json to typescript
        </Chip>
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
            <CodeMirror
              readOnly
              language="typescript"
              value={tsValue}
              onChange={(value) => {
                setValue(value);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
