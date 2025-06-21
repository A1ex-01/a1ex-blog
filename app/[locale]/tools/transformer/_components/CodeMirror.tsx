"use client";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useMemo } from "react";
interface CodeMirrorProps {
  value: string;
  onChange: (value: string, e: any) => void;
  language: "json" | "typescript";
  readOnly?: boolean;
}

export default function CodeMirror(props: CodeMirrorProps) {
  const { value, onChange, language, readOnly = false } = props;
  const { theme } = useTheme();
  console.log("🐽🐽 CodeMirror.tsx CodeMirror theme:", theme);
  const editorTheme = useMemo(() => {
    if (theme === "dark") {
      return "vs-dark";
    }
    return "light";
  }, [theme]);
  return (
    <Editor
      theme={editorTheme}
      options={{
        readOnly,
      }}
      height="50vh"
      language={language}
      value={value}
      onChange={onChange}
    />
  );
}
