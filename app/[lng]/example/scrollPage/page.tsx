"use client";
import LandingPage from "@/components/LandingPage/page";
import "github-markdown-css";
interface ScrollPageProps {}

export default function ScrollPage(props: ScrollPageProps) {
  return (
    <div>
      <h1>整页滚动</h1>
      <main>
        <div className="wrapper w-full h-[60vh]">
          <LandingPage />
        </div>
      </main>
    </div>
  );
}
