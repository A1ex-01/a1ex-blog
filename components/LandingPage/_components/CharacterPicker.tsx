"use client";
import { useMemo } from "react";
import "swiper/css";
// import "swiper/css/navigation";
import AxIcon from "@/components/AxIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { landingJAChatBgs } from "@/config/demoData";
import clsx from "clsx";
import "swiper/css/pagination";
import SwiperModelV2 from "./SwiperModelV2";
// import "@/styles/github-markdown.scss";
interface CharacterPickerProps {
  characters: any[];
  currentCharacter: any;
  setCurrentCharacter: (s: any) => void;
}

export default function CharacterPicker({
  characters,
  currentCharacter,
  setCurrentCharacter
}: CharacterPickerProps) {
  const chatsByCharacter: Record<string, string[]> = {
    "a84d58d0-049a-4e32-b323-670ea96b9e1e": ["hey", "hello"],
    "d5a0c7b1-89e0-4eba-be83-8780a58aff8c": ["hey", "hello"],
    "f546a92e-1c67-4a8b-bb49-85a5d8f17ad3": ["hey", "hello"],
    "89883914-7764-423b-80db-39499d9c892a": ["hey", "hello"],
    "9a7458f8-a9c7-4b7b-a2b0-d83179156f9f": ["hey", "hello"]
  };

  const currChats = useMemo(() => {
    return chatsByCharacter[currentCharacter?.uuid] || [];
  }, [currentCharacter?.uuid]);
  const onPre = () => {
    const index = characters.findIndex((i) => i.uuid === currentCharacter.uuid);
    if (index > 0) {
      setCurrentCharacter(characters[index - 1]);
    } else {
      setCurrentCharacter(characters[characters.length - 1]);
    }
  };

  const onNext = () => {
    const index = characters.findIndex((i) => i.uuid === currentCharacter.uuid);
    if (index == characters.length - 1) {
      setCurrentCharacter(characters[0]);
    } else {
      setCurrentCharacter(characters[index + 1]);
    }
  };
  return (
    <div className="w-full">
      <div
        className="topWrapper relative pb-0 rounded-2xl"
        style={{
          boxShadow: "0px 4px 17.9px 6px #9B9B9B40"
        }}
      >
        <div className="box flex  rounded-2xl overflow-hidden relative">
          <div className="left w-[30%] flex-shrink-0 hidden md:block">
            <img
              src={landingJAChatBgs[currentCharacter?.uuid]}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="box p-2 flex w-full flex-col gap-4 mx-6 md:ml-6 md:px-10 md:py-10 pb-10 md:pb-20 text-xs md:text-sm relative z-10">
            {currChats?.map((item, index) => {
              const isMe = index % 2 === 0;
              if (isMe) {
                return (
                  <div className="chat w-full flex gap-2 justify-end items-start" key={index}>
                    <div
                      className="content rounded-lg text-left py-2 px-3 bg-white"
                      style={{
                        boxShadow: "0px 4px 16.5px 0px #86868640"
                      }}
                    >
                      {item}
                    </div>
                    <Avatar>
                      <AvatarImage
                        src={
                          "https://static.bestie.icu/u_img/bestie/1727604142515443040_8NZCQp.png"
                        }
                        alt="avatar"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                );
              }
              return (
                <div className="chat w-full flex gap-2" key={index}>
                  <Avatar>
                    <AvatarImage src={currentCharacter?.cover} alt="avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div
                    className="content rounded-lg mr-10 text-left py-2 px-3 bg-[#8f61b3] text-white"
                    style={{
                      boxShadow: "0px 4px 16.5px 0px #86868640"
                    }}
                  >
                    {/* <Markdown className={"markdown-body"}> */}
                    {item}
                    {/* </Markdown> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="list flex justify-center mx-6 items-center gap-1 mt-4">
        {characters?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrentCharacter(item);
              }}
            >
              <AxIcon
                icon={"tabler:square-rounded-filled"}
                className={clsx(
                  "cursor-pointer",
                  currentCharacter?.uuid === item.uuid ? "text-[#8f61b3]" : "text-[#E1E1E1]"
                )}
              />
            </div>
          );
        })}
      </div>
      <div className="bottom block md:hidden mx-2 ml-0 my-4">
        <SwiperModelV2
          currentCharacter={currentCharacter}
          characters={characters}
          setSadoo={setCurrentCharacter}
        />
      </div>
    </div>
  );
}
