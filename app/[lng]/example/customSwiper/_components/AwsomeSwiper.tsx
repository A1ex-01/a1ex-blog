import { Icon } from "@iconify/react/dist/iconify.js";
import { useMemo, useState } from "react";

interface AwsomeSwiperProps {}
const imgs = [
  {
    title: "这是第一张图",
    order: 1,
    src: "https://www.notion.so/images/page-cover/woodcuts_13.jpg"
  },
  {
    title: "这是第二张图",
    order: 2,
    src: "https://www.notion.so/images/page-cover/rijksmuseum_jansz_1637.jpg"
  },
  {
    title: "这是第三张图",
    order: 3,
    src: "https://www.notion.so/images/page-cover/woodcuts_13.jpg"
  },
  {
    title: "这是第四张图",
    order: 4,
    src: "https://www.notion.so/images/page-cover/rijksmuseum_jansz_1637.jpg"
  },
  {
    title: "这是第五张图",
    order: 5,
    src: "https://www.notion.so/images/page-cover/woodcuts_13.jpg"
  },
  {
    title: "这是第六张图",
    order: 6,
    src: "https://www.notion.so/images/page-cover/rijksmuseum_jansz_1637.jpg"
  },
  {
    title: "这是第七张图",
    order: 7,
    src: "https://www.notion.so/images/page-cover/woodcuts_13.jpg"
  },
  {
    title: "这是第八张图",
    order: 8,
    src: "https://www.notion.so/images/page-cover/rijksmuseum_jansz_1637.jpg"
  }
];
export default function AwsomeSwiper(props: AwsomeSwiperProps) {
  const [index, setIndex] = useState(0);
  const currentItem = useMemo(() => imgs[index], [index]);
  const onNext = () => {
    setIndex((index + 1) % imgs.length);
  };
  const onPre = () => {
    setIndex((index - 1 + imgs.length) % imgs.length);
  };

  const renderImgs = useMemo(() => {
    return imgs.slice(index).concat(imgs.slice(0, index));
  }, [index]);
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background: `url(${currentItem.src}) center center / cover no-repeat`
      }}
    >
      <div className="btns flex text-lg gap-2 items-center absolute top-4 left-1/2 -translate-x-1/2">
        <div className="left cursor-pointer" onClick={onPre}>
          <Icon icon="tabler:arrow-left" />
        </div>
        <div className="right cursor-pointer" onClick={onNext}>
          <Icon icon="tabler:arrow-right" />
        </div>
      </div>
      <div className="swiper absolute flex h-[260px] items-center gap-4 left-1/2 bottom-4">
        {renderImgs.map((item, index) => {
          return (
            <div
              key={item.order}
              className="item absolute w-[140px] aspect-[2/3] shadow-md rounded-md overflow-hidden"
              style={{
                transform: `translateX(${index * 140 + index * 10}px)`,
                transition: "all 0.5s ease-in-out"
              }}
            >
              <img className="w-full h-full object-cover" src={item.src} alt={item.title} />
              <div className="summary absolute bottom-2 left-2">
                <div className="title text-lg font-bold">{item.title}</div>
                <div className="index text-font-sub">{index + 1}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
