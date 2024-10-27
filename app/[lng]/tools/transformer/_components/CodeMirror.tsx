"use client";
import Editor from "@monaco-editor/react";
interface CodeMirrorProps {
  value: string;
  onChange: (value: string, e: any) => void;
  language: "json" | "typescript";
  readOnly?: boolean;
}

export default function CodeMirror(props: CodeMirrorProps) {
  const { value, onChange, language, readOnly = false } = props;

  return (
    <Editor
      options={{
        readOnly
      }}
      height="50vh"
      language={language}
      value={value}
      onChange={onChange}
    />
  );
}
