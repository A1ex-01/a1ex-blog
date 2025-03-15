import clsx from "clsx";
import { useTranslations } from "next-intl";

interface UserVoiceProps {
  user: {
    nickname: string;
    desc: string;
    comment: string;
    avatar: string;
    index: number;
  };
  children?: React.ReactNode;
}

export default function UserVoice({ user, children }: UserVoiceProps) {
  const t = useTranslations("Basic");
  if (user?.index < 2) {
    return (
      <div
        className={clsx("wrapper w-full flex gap-6", user?.index === 0 ? "" : "flex-row-reverse")}
      >
        <div className="left flex-1/ p-4">
          <div className="top flex items-center justify-between">
            <div className="left flex items-center gap-2">
              <div className="info flex flex-col gap-1">
                <p className="font-bold font-Sawarabi_Mincho text-[#8f61b3] text-lg">
                  {user.nickname}
                </p>
                <p className="text-gray-500 desc">{user.desc}</p>
              </div>
            </div>
          </div>
          <div className="desc text-xs mt-2 text-[#767676] mb-0 leading-8 indent-4">
            {user.comment}
          </div>
        </div>
        <div className="right w-[30%] flex-shrink-0 hidden md:block aspect-[272/311]">
          <img src={user?.avatar} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper w-full flex flex-col gap-6">
      <div className="top flex relative flex-col items-start justify-between">
        <div className="absolute img h-full object-cover right-0 top-0 bottom-0">
          <img src={user?.avatar} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="left flex items-center gap-2  p-4">
          <div className="info flex flex-col gap-1">
            <p className="font-bold font-Sawarabi_Mincho text-[#8f61b3] my-4 text-lg">
              {user.nickname}
            </p>
            <p className="text-gray-500 desc">{user.desc}</p>
          </div>
        </div>
      </div>
      <div className="desc text-xs mt-2 text-[#767676] mb-0 leading-8  indent-4  p-4">
        {user.comment}
      </div>
      <div className="wrapper p-4">{children}</div>
    </div>
  );
}
