"use client";
import "github-markdown-css";
import AwsomeSwiper from "./_components/AwsomeSwiper";
interface CustomSwiperProps {}

export default function CustomSwiper(props: CustomSwiperProps) {
  return (
    <div>
      <h1>CustomSwiper</h1>
      <main>
        <div className="wrapper w-full h-[55vh]">
          <AwsomeSwiper />
        </div>
      </main>
    </div>
  );
}
