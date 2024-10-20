import Link from "next/link";

interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <footer>
      <div>
        <div className="h-[145px] bg-theme-bgc w-full flex flex-col items-center justify-center box-border border-t-8 border-solid border-main-color">
          <p>[a1ex的博客]</p>
          <div>
            [主页随机文案由
            <Link href={"https://developer.hitokoto.cn/"} className="text-primary" target="_blank">
              一言
            </Link>
            提供]
          </div>
          <Link href={"https://beian.miit.gov.cn/"} className="text-primary" target="_blank">
            [赣ICP备2022002397号]
          </Link>
        </div>
      </div>
    </footer>
  );
}
