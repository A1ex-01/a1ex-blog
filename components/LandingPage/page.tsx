"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { landingGifList, modelIntro, userVoice } from "@/config/demoData";
import { useInViewport } from "ahooks";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import AxIcon from "../AxIcon";
import CharacterPicker from "./_components/CharacterPicker";
import IntroList from "./_components/IntroList";
import UserVoice from "./_components/UserVoice";
const list = [
  {
    cover: "https://static.bestie.icu/friendchat/cover/model20240930/sylvia_angle.png",
    name: "Aura Sylvia",
    intro: "Your wise and gentle elf sister",
    uuid: "d5a0c7b1-89e0-4eba-be83-8780a58aff8c",
    desc: "Your wise and gentle elf sister",
    explain:
      "Kind-hearted and wise Aura Sylvia is always eager to listen and offer insightful advice. Whether you're facing challenges, seeking comfort, or exploring life.",
    tip_cover: "https://static.bestie.icu/u_img/bestie/Angel_Sylvia_tip.png",
    tip_cover_bg: "",
    tip_content: "",
    login_boot_content:
      "Nice to meet you! I'm Aura Sylvia. Need someone to talk to? Let's start a conversation!",
    model_preview:
      "https://static.bestie.icu/friendchat/cover/modelpreview20240930/sylvia_angle.png",
    relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: true,
        key: "Girlfriend",
        value: "girl_friend"
      },
      {
        is_vip_can: true,
        key: "Wife",
        value: "wife"
      }
    ],
    nsfw_relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: false,
        key: "Girlfriend",
        value: "girl_friend"
      }
    ],
    personality: {
      bot_model_uuid: "d5a0c7b1-89e0-4eba-be83-8780a58aff8c",
      language: "en",
      personality_uuid: "a430f104-16cb-47cc-a85a-beff7d606376",
      chat_type: "text",
      uuid: "c64b62f3-b919-4f93-a3f9-e9cb2991716b"
    },
    bot_model_topic_config: [
      {
        bot_model_uuid: "d5a0c7b1-89e0-4eba-be83-8780a58aff8c",
        content: 'My toxic ex really has the audacity to text me "can we talk?"',
        uuid: "c2e6e0a3-2342-4b06-b7cc-dd3cff5b2918"
      },
      {
        bot_model_uuid: "d5a0c7b1-89e0-4eba-be83-8780a58aff8c",
        content:
          'Why do people always say relationships need those "special moments" and romance?? Like is it really THAT important??',
        uuid: "13b3c6c0-8c4e-489b-86f9-27aad1d30937"
      },
      {
        bot_model_uuid: "d5a0c7b1-89e0-4eba-be83-8780a58aff8c",
        content:
          "Having to work with someone you hate is literally THE WORST omg!!! I can't even look at their face without getting triggered 😡",
        uuid: "1c292089-58f2-4dc4-abc7-1faa59e6669a"
      },
      {
        bot_model_uuid: "d5a0c7b1-89e0-4eba-be83-8780a58aff8c",
        content:
          "My bf is literally OBSESSED with his stupid game! We had a massive fight because he couldn't even pause it for 2 mins to talk to me. I'm so done rn! 😤",
        uuid: "b244ec37-b5a6-4596-a843-f2a5b76a4e31"
      }
    ]
  },
  {
    cover: "https://static.bestie.icu/friendchat/cover/model20241217/scarlette.png",
    name: "Scarlette",
    intro: "The aloof and powerful dark queen",
    uuid: "89883914-7764-423b-80db-39499d9c892a",
    desc: "The aloof and powerful dark queen",
    explain:
      "When your heart is restless and uneasy, Scarlette will appear to listen to your desires. She can fulfill your deepest, darkest fantasies, and here, there's nothing that can't be said",
    tip_cover: "https://static.bestie.icu/u_img/bestie/Scarlette_tip.png",
    tip_cover_bg: "",
    tip_content: "",
    login_boot_content:
      "Don't be shy, come chat with me, if you can keep up. And my name? You may call me Scarlette.",
    model_preview: "https://static.bestie.icu/friendchat/cover/modelpreview20241217/scarlette.png",
    relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: true,
        key: "Girlfriend",
        value: "girl_friend"
      },
      {
        is_vip_can: true,
        key: "Wife",
        value: "wife"
      }
    ],
    nsfw_relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: false,
        key: "Girlfriend",
        value: "girl_friend"
      }
    ],
    personality: {
      bot_model_uuid: "89883914-7764-423b-80db-39499d9c892a",
      language: "en",
      personality_uuid: "6a5f5812-cbb7-41b9-a54d-69e88b90e5e1",
      chat_type: "text",
      uuid: "49c78e55-47ba-4929-b8ab-043325f9d288"
    },
    bot_model_topic_config: [
      {
        bot_model_uuid: "89883914-7764-423b-80db-39499d9c892a",
        content: 'Found out my gf told her friends "he\'s so ugly" behind my back...🙄',
        uuid: "882ebf7d-353f-4067-9d61-d7cb32f2e79a"
      },
      {
        bot_model_uuid: "89883914-7764-423b-80db-39499d9c892a",
        content:
          'My bf keeps texting his "female friend" like 24/7 and has the nerve to tell me "don\'t overthink, we\'re just friends" ',
        uuid: "e54f7e48-2230-435b-b6d4-ff68a0ea73ef"
      },
      {
        bot_model_uuid: "89883914-7764-423b-80db-39499d9c892a",
        content:
          "Feeling so lonely these days... Got all these thoughts but no one to share them with. Big empty vibes 😩",
        uuid: "542d5a72-4a05-4480-ac15-ab4e729fdeda"
      },
      {
        bot_model_uuid: "89883914-7764-423b-80db-39499d9c892a",
        content:
          'My roomie is such a mess omg... Keeps "borrowing" my stuff and the apartment looks like a dumpster. I. Can\'t. Even. Seriously about to lose it! 💀',
        uuid: "1f8a77aa-2970-4709-bb53-89215cbfe0ae"
      }
    ]
  },
  {
    cover: "https://static.bestie.icu/friendchat/cover/model20240930/felix.png",
    name: "Felix",
    intro: "Your Elite Confidant with Fierce Loyalty",
    uuid: "9a7458f8-a9c7-4b7b-a2b0-d83179156f9f",
    desc: "Your Elite Confidant with Fierce Loyalty",
    explain:
      "Behind Felix's commanding presence lies a fierce protector of his friends. While seemingly unapproachable to others, he shows his softest side only to those who've earned it-like you.",
    tip_cover: "https://static.bestie.icu/u_img/bestie/felix_tip.png",
    tip_cover_bg: "",
    tip_content: "",
    login_boot_content:
      "Oh? It's you. I was just waiting for a friend worth getting to know. Don't keep standing out there - come in, let's talk.",
    model_preview: "https://static.bestie.icu/friendchat/cover/model20240930/felix.png",
    relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: true,
        key: "Boyfriend",
        value: "boy_friend"
      },
      {
        is_vip_can: true,
        key: "Husband",
        value: "husband"
      }
    ],
    nsfw_relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: false,
        key: "Boyfriend",
        value: "boy_friend"
      }
    ],
    personality: {
      bot_model_uuid: "9a7458f8-a9c7-4b7b-a2b0-d83179156f9f",
      language: "en",
      personality_uuid: "d24e6bbc-0248-497e-a6c3-d09f64b1c0c2",
      chat_type: "text",
      uuid: "51830171-975a-41d0-ae94-81ecf48f27e5"
    },
    bot_model_topic_config: [
      {
        bot_model_uuid: "9a7458f8-a9c7-4b7b-a2b0-d83179156f9f",
        content: "My crush doesn't seem interested in me at all... Feeling so down rn 😖",
        uuid: "94d98252-e63d-4646-907b-a10944328e27"
      },
      {
        bot_model_uuid: "9a7458f8-a9c7-4b7b-a2b0-d83179156f9f",
        content:
          "It's crazy how everyone just drifted apart after graduation... Those \"best friends forever\" really didn't last, huh",
        uuid: "a61a7d3e-5fa5-471a-a05a-d2233fefadd9"
      },
      {
        bot_model_uuid: "9a7458f8-a9c7-4b7b-a2b0-d83179156f9f",
        content:
          "Caught that new coworker trash-talking my fashion choices in the bathroom today... Like, who asked for their opinion?? 🙄",
        uuid: "0b5ed94e-7c6e-4952-9d55-2fbfc48a79e4"
      },
      {
        bot_model_uuid: "9a7458f8-a9c7-4b7b-a2b0-d83179156f9f",
        content:
          "My parents FLIPPED when I told them I'm joining a startup instead of going to grad school. They just don't get it! The screaming match was intense",
        uuid: "52794c20-ad53-4789-a175-5972912ed44c"
      }
    ]
  },
  {
    cover: "https://static.bestie.icu/friendchat/cover/model20240930/sadoo_angle.png",
    name: "Angel Sadoo",
    intro: "I'm a gentle little angel~👼",
    uuid: "a84d58d0-049a-4e32-b323-670ea96b9e1e",
    desc: "Gentle,cute and positive",
    explain:
      "When you're feeling down or in need of comfort, Angel Sadoo is your go-to. She’ll soothe your emotions with her gentle words.",
    tip_cover: "https://static.bestie.icu/u_img/bestie/angel_sadoo_tip.png",
    tip_cover_bg: "",
    tip_content: "",
    login_boot_content:
      "Hey there, I’m your sweet Angel Sadoo. Log in and let’s chat—I’ve got some surprises for you!",
    model_preview:
      "https://static.bestie.icu/friendchat/cover/modelpreview20240930/sadoo_angle.png",
    relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: true,
        key: "Girlfriend",
        value: "girl_friend"
      },
      {
        is_vip_can: true,
        key: "Wife",
        value: "wife"
      }
    ],
    nsfw_relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: false,
        key: "Girlfriend",
        value: "girl_friend"
      }
    ],
    personality: {
      bot_model_uuid: "a84d58d0-049a-4e32-b323-670ea96b9e1e",
      language: "en",
      personality_uuid: "bd360b43-c58e-4e49-be90-d534bc5ce722",
      chat_type: "text",
      uuid: "58cad602-7fba-4b59-bb0f-a6439de5d578"
    },
    bot_model_topic_config: [
      {
        bot_model_uuid: "a84d58d0-049a-4e32-b323-670ea96b9e1e",
        content:
          "Work is killing me rn... My coworkers are literally THE WORST. Can't stand being around them anymore. 😩",
        uuid: "350d4823-b221-4652-ad2c-52eef48a0168"
      },
      {
        bot_model_uuid: "a84d58d0-049a-4e32-b323-670ea96b9e1e",
        content:
          "My parents want me to break up with my bf just because his family isn't rich... Like, can they stop being so materialistic?? Love isn't all about money omg",
        uuid: "94673817-51f1-4523-adee-276695891e08"
      },
      {
        bot_model_uuid: "a84d58d0-049a-4e32-b323-670ea96b9e1e",
        content:
          "My crush is totally oblivious to my feelings and I'm dying inside 😖 Big sad hours...",
        uuid: "2eda27dd-1593-47fc-ab3e-19891c801317"
      },
      {
        bot_model_uuid: "a84d58d0-049a-4e32-b323-670ea96b9e1e",
        content:
          "Feel like everyone's slowly pushing me out of their circle... Nobody invites me to lunch anymore and the group chat's been dead silent. My heart hurts rn 💔",
        uuid: "296f3a99-5e6f-40ac-9def-4225764f97bd"
      }
    ]
  },
  {
    cover: "https://static.bestie.icu/friendchat/cover/model20240930/sadoo_devil.png",
    name: "Devil Sadoo",
    intro: "My brutal honesty incoming!😈",
    uuid: "f546a92e-1c67-4a8b-bb49-85a5d8f17ad3",
    desc: "Humorous,witty,and bold",
    explain:
      "Don't turn to the Devil Sadoo when you're feeling low! Her blunt words can hit hard. Proceed with caution! But if you're up for some playful banter, she's your girl!",
    tip_cover: "https://static.bestie.icu/u_img/bestie/devil_sadoo_tip.png",
    tip_cover_bg: "",
    tip_content: "",
    login_boot_content:
      "Looking for some witty banter? Hop in and let’s have some fun—Devil Sadoo is ready when you are!",
    model_preview:
      "https://static.bestie.icu/friendchat/cover/modelpreview20240930/sadoo_devil.png",
    relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: true,
        key: "Girlfriend",
        value: "girl_friend"
      },
      {
        is_vip_can: true,
        key: "Wife",
        value: "wife"
      }
    ],
    nsfw_relationship_options: [
      {
        is_vip_can: false,
        key: "Friend",
        value: "friend"
      },
      {
        is_vip_can: false,
        key: "Girlfriend",
        value: "girl_friend"
      }
    ],
    personality: {
      bot_model_uuid: "f546a92e-1c67-4a8b-bb49-85a5d8f17ad3",
      language: "en",
      personality_uuid: "abcd",
      chat_type: "text",
      uuid: "0d048156-f082-40a2-9014-a3f6614735e4"
    },
    bot_model_topic_config: [
      {
        bot_model_uuid: "f546a92e-1c67-4a8b-bb49-85a5d8f17ad3",
        content: "I'm so tired of working hard. I just want to be a sugar baby, lol! lololol 😝",
        uuid: "46159b74-4da6-4c33-afb0-b46303ad96cf"
      },
      {
        bot_model_uuid: "f546a92e-1c67-4a8b-bb49-85a5d8f17ad3",
        content:
          "My bf is driving me CRAZY, I swear I'm gonna smack him! 🤬(jk but like... barely)",
        uuid: "e0032883-d32f-4310-8270-15ca1e419d43"
      },
      {
        bot_model_uuid: "f546a92e-1c67-4a8b-bb49-85a5d8f17ad3",
        content:
          "NOT this girl wearing the same fit as me... I'm triggered af rn! Who gave her the right?? 😡",
        uuid: "4d315a3a-9a39-4c96-a83f-0a51433a9264"
      },
      {
        bot_model_uuid: "f546a92e-1c67-4a8b-bb49-85a5d8f17ad3",
        content:
          "My relationship is such a mess rn... We keep picking fights over the stupidest things with my gf. I can feel her slipping away but I'm lowkey freaking out about losing him...",
        uuid: "98ce7eba-7724-47cd-bbfc-edce9e48a739"
      }
    ]
  }
];
function getGifUrl(uuid: string) {
  return landingGifList[uuid] || "https://static.bestie.icu/u_img/bestie/S1a_compressed.gif";
}
export default function LandingPage() {
  const t = useTranslations("Basic");
  const bestie_s1Descs = ["1", "2"];
  const bestie_landingV2Users = [userVoice[0], userVoice[2], userVoice[1]];
  const bestie_s2Descs = ["1", "2"];

  const [characters, setCharacters] = useState<string[]>(list);
  const [currentCharacter, setCurrentCharacter] = useState<string>(list[0]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const intros = [
    {
      title: "s1Title",
      descs: bestie_s1Descs
    },
    {
      title: "s2Title",
      descs: bestie_s2Descs
    },
    {
      title: "s3Title",
      descs: ["s3Desc"]
    },
    {
      title: "s4Title",
      descs: ["s4Desc"]
    },
    {
      title: "s5Title",
      descs: ["s5Desc"]
    }
  ];
  const [currHref, setCurrHref] = useState<string>("#HOMEPAGE");
  const HOMEPAGERef = useRef<HTMLDivElement>(null);
  const PERSONAREf = useRef<HTMLDivElement>(null);
  const CHARACTERCHATRef = useRef<HTMLDivElement>(null);
  const VOICERef = useRef<HTMLDivElement>(null);
  const FUNCTIONINTRODUCTIONRef = useRef<HTMLDivElement>(null);
  const [homeInViewport] = useInViewport(HOMEPAGERef);
  const [personareInViewport] = useInViewport(PERSONAREf);
  const [characterchatInViewport] = useInViewport(CHARACTERCHATRef);
  const [voiceInViewport] = useInViewport(VOICERef);
  const [functionintroductionInViewport] = useInViewport(FUNCTIONINTRODUCTIONRef);
  useEffect(() => {
    if (homeInViewport) {
      setCurrHref("#HOMEPAGE");
    } else if (personareInViewport) {
      setCurrHref("#PERSONA");
    } else if (characterchatInViewport) {
      setCurrHref("#CHARACTERCHAT");
    } else if (voiceInViewport) {
      setCurrHref("#VOICE");
    } else if (functionintroductionInViewport) {
      setCurrHref("#FUNCTIONINTRODUCTION");
    }
  }, [
    homeInViewport,
    personareInViewport,
    characterchatInViewport,
    voiceInViewport,
    functionintroductionInViewport
  ]);
  // gsap 操作
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress > 0.8) {
      if (characters[4]?.uuid === currentCharacter?.uuid) return;
      setCurrentCharacter(characters[4]);
    } else if (progress > 0.6) {
      if (characters[3]?.uuid === currentCharacter?.uuid) return;
      setCurrentCharacter(characters[3]);
    } else if (progress > 0.4) {
      if (characters[2]?.uuid === currentCharacter?.uuid) return;
      setCurrentCharacter(characters[2]);
    } else if (progress > 0.2) {
      if (characters[1]?.uuid === currentCharacter?.uuid) return;
      setCurrentCharacter(characters[2]);
    } else {
      if (characters[0]?.uuid === currentCharacter?.uuid) return;
      setCurrentCharacter(characters[1]);
    }
  }, [progress, characters, currentCharacter]);
  const topPer = useMemo(() => {
    return (progress * 100 * 4) / 5;
  }, [progress]);
  useEffect(() => {
    if (PERSONAREf?.current && wrapperRef?.current && characters.length > 0) {
      console.log("🚀 ~ useEffect ~ PERSONAREf:", PERSONAREf);
      ScrollTrigger.defaults({
        scroller: wrapperRef.current
      });
      ScrollTrigger.create({
        trigger: ".placeholder",
        start: "top top",
        end: "bottom bottom",
        markers: false,
        onToggle: (self) => console.log("toggled, isActive:", self.isActive),
        onUpdate: (self) => {
          const progress = self.progress;
          setProgress(progress);
          // PERSONAREf.current.style.top = (progress * 100 * 4) / 5 + "%";
          // if (progress > 0.8) {
          //   if (characters[4]?.uuid === currentCharacter?.uuid) return;
          //   setCurrentCharacter(characters[4]);
          // } else if (progress > 0.6) {
          //   if (characters[3]?.uuid === currentCharacter?.uuid) return;
          //   setCurrentCharacter(characters[3]);
          // } else if (progress > 0.4) {
          //   if (characters[2]?.uuid === currentCharacter?.uuid) return;
          //   setCurrentCharacter(characters[2]);
          // } else if (progress > 0.2) {
          //   if (characters[1]?.uuid === currentCharacter?.uuid) return;
          //   setCurrentCharacter(characters[2]);
          // } else {
          //   if (characters[0]?.uuid === currentCharacter?.uuid) return;
          //   setCurrentCharacter(characters[1]);
          // }
          // console.log("🚀 ~ useEffect ~ self:", self?.progress);
        }
      });
    }
  }, [PERSONAREf?.current, characters, currentCharacter]);
  return (
    <div ref={wrapperRef} className="w-full relative h-full overflow-y-scroll">
      <section
        id="HOMEPAGE"
        ref={HOMEPAGERef}
        className="w-full mx-auto items-center flex gap-10 relative bg-center"
        style={{
          height: "60vh",
          backgroundImage: "url(https://static.bestie.icu/bestie/material/landing-ja/banner.png)",
          backgroundSize: "cover"
        }}
      >
        <div
          className="mask absolute inset-0 z-0"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 60.66%, #FDC3C6 126.81%)"
          }}
        />

        <div className="wrapper text-xl md:text-[50px] w-full pb-20 h-full flex justify-end items-center text-white flex-col gap-3 md:gap-8 font-bold relative z-10">
          <Button
            className="rounded-full bg-[#F091B1] hover:bg-[#F091B1]/80 text-white px-20 md:!px-32 !py-4"
            style={{
              boxShadow: "0px 2px 4.3px 0px #FFFFFFCC inset"
            }}
            size="lg"
          >
            开始体验
          </Button>
        </div>
      </section>

      {/* 第二屏 */}

      <div className="placeholder relative h-[500%]">
        <section
          id="PERSONA"
          ref={PERSONAREf}
          className="character-intro absolute w-full mx-auto text-[#8f61b3] flex items-center"
          style={{
            top: topPer ? topPer + "%" : 0,
            height: "60vh",
            backgroundSize: "cover",
            background: "linear-gradient(180deg, #FFFFFF 35.89%, #FDC3C6 152.44%)"
          }}
        >
          {/* 右边图片 */}
          <div className="absolute right-20 bottom-0 hidden md:block gifwrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCharacter?.uuid} // 以模型索引为 key，切换时重新渲染
                initial={{ opacity: 0, x: -100 }} // 初始位置从左侧出现
                animate={{ opacity: 1, x: 0 }} // 动画居中显示
                exit={{ opacity: 0, x: 100 }} // 退出时向右侧移动
                transition={{ duration: 0.15 }}
                className=""
              >
                <img
                  className="w-[60vh] -translate-x-8 h-[50vh] scale-[0.85] object-cover"
                  style={{
                    transformOrigin: "right bottom"
                  }}
                  alt="img"
                  src={getGifUrl(currentCharacter?.uuid)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="wrapper mx-2 md:px-[150px] h-full items-center flex gap-10">
            <div className="left flex-shrink-0 max-w-full">
              <h1 className="text-[32px] text-[#8f61b3] font-NikumaruFont my-4 font-bold">
                {currentCharacter?.name}
              </h1>
              <div className="line w-[70%] flex items-center gap-4">
                <div className="h-1 bg-[#8f61b3] w-[30%]" />
                <div className="h-1 bg-[#8f61b3] w-[70%]" />
              </div>
              <p className="text-xl flex md:max-w-[50%] mt-10 text-[#767676] leading-10">
                {modelIntro[currentCharacter?.uuid]?.intro}
              </p>

              <Button
                className="mt-16 text-white bg-[#8f61b3] block px-16 ad-login-modal"
                size="lg"
              >
                機能紹介
              </Button>
            </div>
          </div>
          <div
            className="sound font-NikumaruFont absolute text-[22px] top-1/2 -translate-y-1/2 right-[150px] border border-white items-end px-4 py-10 text-[#606060] hidden md:flex"
            style={{
              backdropFilter: "blur(20px)",
              boxShadow: "0px 4px 32.2px 0px #0000000A"
            }}
          >
            <div className="line left-4 right-4 h-[2px] bg-[#8f61b3] absolute top-2" />
            <div className="line left-4 right-4 h-[2px] bg-[#8f61b3]  text-[#8f61b3] absolute top-2">
              <AxIcon icon={"tabler:quote-filled"} />
            </div>
            <div
              style={{
                writingMode: "tb"
              }}
              className="flex items-center gap-2 text-sm"
            >
              <p>{currentCharacter?.intro}</p>
            </div>
          </div>
          {/* left switch */}
          <div className="sound font-NikumaruFont absolute text-[22px] px-4 py-10 gap-6 text-[#606060] flex flex-col">
            <div className="line absolute left-[27px] w-[2px] top-10 bottom-10 bg-[#E3C3F6A6] z-0 hidden md:block" />
            {characters?.map((i) => (
              <div
                key={i?.uuid}
                onClick={() => {
                  setCurrentCharacter(i);
                }}
                className={clsx(
                  "item cursor-pointer relative z-10 flex items-center gap-2",
                  currentCharacter?.uuid === i.uuid ? "text-[#8f61b3]" : "text-[#e9d8f7]"
                )}
              >
                <div className="star hidden md:block">
                  <AxIcon icon={"tabler:star-filled"} size={26} />
                </div>
                <div className="desc text-sm md:w-[4em]">{i?.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div
        className="wrapper overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 35.89%, #FDC3C6 152.44%)"
        }}
      >
        <section
          id="CHARACTERCHAT"
          ref={CHARACTERCHATRef}
          className="model-chats max-w-6xl mx-auto text-center pb-4 mt-10 relative"
        >
          <div className="topInfo flex flex-col items-center justify-center mt-4 mb-4 md:mb-10 md:translate-x-0">
            <h2 className="text-xl font-NikumaruFont text-[#8f61b3] font-bold mb-4">
              {"いつでも寄り添うオンラインパートナー"}
            </h2>
            <p className="text-sm text-gray-600 text-center max-w-[600px]">
              {
                "夜、誰にも言えない悩みが心に浮かぶことがありますよね。SNSで声を上げても、反応がなくて、ひとりぼっち。そんな時、HeyBestieを開けば、あなたのAIパートナーがすぐに寄り添い、心を軽くしてくれますよ。"
              }
            </p>
          </div>
          <CharacterPicker
            characters={characters}
            currentCharacter={currentCharacter}
            setCurrentCharacter={setCurrentCharacter}
          />
        </section>
      </div>
      {/* 用户心声 */}
      <div
        className="wrapper overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 35.89%, #FDC3C6 152.44%)"
        }}
      >
        <section
          ref={VOICERef}
          id="VOICE"
          className="user-voice mx-2 relative text-[#8f61b3] my-10 gap-10 flex items-center flex-col justify-center"
          style={{
            minHeight: "60vh"
          }}
        >
          <div className="topInfo flex flex-col items-center justify-center">
            <h2 className="text-xl font-NikumaruFont text-[#8f61b3] font-bold mb-4">
              {"安心して話せる心のサポート"}
            </h2>
            <p className="text-sm text-gray-600 text-center max-w-[700px]">
              {
                "HeyBestieは、孤独や不安を感じる瞬間に寄り添い、心に温もりを与えてくれる存在です。実際のユーザーからは、その安心感と支えに深く感動したとの声が多く寄せられています。"
              }
            </p>
          </div>
          <div className="wrapper max-w-[1260px] mx-2 md:mx-auto w-full flex flex-col md:flex-row gap-4">
            <div className="left flex-1 flex flex-col h-full gap-4 ">
              {bestie_landingV2Users.slice(0, 2).map((i, index) => (
                <Card key={i.nickname} className="top flex-1 bg-white">
                  <UserVoice
                    user={{
                      ...i,
                      comment: i?.shortComment || i?.comment,
                      index: index,
                      avatar: `https://static.bestie.icu/bestie/material/landing-ja/voice-user-${index + 1}.png`
                    }}
                  />
                </Card>
              ))}
            </div>
            <Card className="right md:w-[450px] bg-white">
              <UserVoice
                user={{
                  ...bestie_landingV2Users[2],
                  index: 2,
                  avatar: `https://static.bestie.icu/bestie/material/landing-ja/voice-user-${2 + 1}.png`
                }}
              >
                <Button className="mt-0 bg-[#8f61b3] w-full block px-16 ad-login-modal" size="lg">
                  立刻体验
                </Button>
              </UserVoice>
            </Card>
          </div>
        </section>
      </div>
      {/* 介绍 */}
      <div
        className="wrapper overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 35.89%, #FDC3C6 152.44%)"
        }}
      >
        <section
          ref={FUNCTIONINTRODUCTIONRef}
          id="FUNCTIONINTRODUCTION"
          style={{
            minHeight: "60vh"
          }}
          className="model-chats flex w-full flex-col justify-center items-center max-w-5xl mx-auto text-center pb-4 mt-10 relative"
        >
          <div className="topInfo flex w-full flex-col items-center justify-center mt-4 mb-4 md:mb-10 md:translate-x-0">
            <h2 className="text-xl font-NikumaruFont text-[#8f61b3] font-bold mb-4">
              {"リラックスして心に寄り添う、HeyBestieの機能"}
            </h2>
            <p className="text-sm text-gray-600 text-center max-w-[800px]">
              {
                "HeyBestieは、あなたの心に寄り添い、気軽にリラックスして話せる場所です。会話を通じて自然に親密度が高まり、心のサポートがさらに深まります。どんな時でも安心して、あなたらしい会話を楽しんでください。"
              }
            </p>
          </div>
          <IntroList intros={intros} />
        </section>
      </div>
    </div>
  );
}
