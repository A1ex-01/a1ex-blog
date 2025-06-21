"use client";
import { useMount } from "ahooks";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { useRef } from "react";
interface MarkdownProps {
  children: string;
  className?: string;
}

export default function Markdown({ children }: MarkdownProps) {
  const content = children;
  const mdRef = useRef<any>();
  useMount(() => {
    const md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return ""; // use external default escaping
      },
      html: true, // 支持html嵌套
      linkify: true // 支持url生成a链接
    });
    mdRef.current = md;
  });
  return <div dangerouslySetInnerHTML={{ __html: mdRef.current.render(content) }} />;
}
