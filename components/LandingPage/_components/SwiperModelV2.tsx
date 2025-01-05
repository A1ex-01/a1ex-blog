import { ICharacterV2 } from "@/services/user";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperModelV2Props {
  characters: ICharacterV2[];
  setSadoo: (s: ICharacterV2) => void;
  currentCharacter: ICharacterV2;
  tip?: "intro" | string;
}

const SwiperModelV2 = ({
  characters,
  setSadoo,
  currentCharacter,
  tip = "intro",
}: SwiperModelV2Props) => {
  const onPre = () => {
    const index = characters.findIndex((i) => i.uuid === currentCharacter.uuid);
    if (index > 0) {
      setSadoo(characters[index - 1]);
    } else {
      setSadoo(characters[characters.length - 1]);
    }
  };

  const onNext = () => {
    const index = characters.findIndex((i) => i.uuid === currentCharacter.uuid);
    if (index == characters.length - 1) {
      setSadoo(characters[0]);
    } else {
      setSadoo(characters[index + 1]);
    }
  };
  return (
    <div className="flex items-center gap-4 justify-center">
      <IconChevronLeft
        onClick={onPre}
        className="text-[#E1E1E1] cursor-pointer hover:text-primary"
        size={64}
      />

      <div className="slider flex  gap-2 flex-row flex-shrink-0 select-none">
        {characters?.map((i) => {
          return (
            <div
              key={i?.uuid}
              className={clsx(
                "item cursor-pointer border-2 border-[#FFE7AA] rounded-md w-[60px] h-[60px] md:w-[100px] md:h-[100px] overflow-hidden",
                currentCharacter.uuid === i.uuid && "border-primary border-3",
              )}
              onClick={() => {
                setSadoo(i);
              }}
            >
              <img
                src={i?.cover}
                alt="cover"
                className="object-contain w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
      <IconChevronRight
        onClick={onNext}
        className="text-[#E1E1E1] cursor-pointer hover:text-primary"
        size={64}
      />
    </div>
  );
};

export default SwiperModelV2;
