"use client";
import { useMemo, useState } from "react";
import "swiper/css";
// import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import "swiper/css/pagination";
// import "@/styles/github-markdown.scss";
interface IntroListProps {
  intros: {
    title: any;
    descs: string[];
  }[];
  toThreads: (thread: string) => void;
}

export default function IntroList({ intros, toThreads }: IntroListProps) {
  const [index, setIndex] = useState(0);
  // const onPre = () => {
  //   index > 0 ? setIndex(index - 1) : setIndex(intros.length - 1);
  // };
  // const onNext = () => {
  //   index < intros.length - 1 ? setIndex(index + 1) : setIndex(0);
  // };
  const currIntro = useMemo(() => ({ ...intros[index], index }), [index, intros]);
  return (
    <div className="w-full min-h-[45vh]">
      <div className="topWrapper h-full relative pb-0 rounded-2xl">
        <div className="box h-full mx-4 md:mx-0 flex overflow-hidden relative items-center">
          <div className="left h-full w-[50%] flex-shrink-0 rounded-tr-[70px] overflow-hidden hidden md:block">
            <img
              src={`https://static.bestie.icu/bestie/material/landing-ja/intros/T${currIntro?.index + 1}.png`}
              className="w-full select-none h-full pointer-events-none object-cover"
              alt=""
            />
          </div>
          <div className="box mx-6 flex flex-col">
            <div className="box flex gap-4 items-center" key={index}>
              <div className="right flex items-start flex-col">
                <div className="title text-left text-[#8f61b3] font-NikumaruFont text-2xl font-bold">
                  {currIntro?.title}
                </div>
                <div
                  className="desc text-[#767676] text-left leading-6 my-6 my-4"
                  dangerouslySetInnerHTML={{
                    __html: currIntro?.descs.join("<br/>")
                  }}
                />
                <Button size="lg" className="ad-login-modal mx-20 bg-[#8f61b3]">
                  立即体验
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
