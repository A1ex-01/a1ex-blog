"use client";
import IconTransform from "@/components/IconTransform";
import { useCommon } from "@/providers/CommonProvider";
import { getFragmentWorker } from "@/utils";
import "github-markdown-css";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
interface SvgTransformProps {}

export default function SvgTransform(props: SvgTransformProps) {
  const { codeFragments } = useCommon();
  return (
    <div>
      <h1>svg 过渡变换</h1>
      <main>
        <div className="wrapper mx-auto w-max">
          <IconTransform startIconifyIcon="tabler:star" endIconifyIcon="tabler:heart" />
        </div>
        <div className="codeBox">
          <Markdown
            className={"markdown-body rounded-lg p-4"}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                // custom
                return !inline && match ? (
                  <SyntaxHighlighter PreTag="div" language={match[1]} {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {getFragmentWorker(
              codeFragments?.find((f) => f.title === "IconTransform")?.fragment!,
              "tsx"
            )}
          </Markdown>
        </div>
      </main>
    </div>
  );
}
