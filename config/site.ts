export type SiteConfig = typeof siteConfig;
import CategoryIcon from "@/assets/icon/category.svg";
import HomeIcon from "@/assets/icon/home.svg";
import TagIcon from "@/assets/icon/tag.svg";
export const siteConfig = {
  name: "a1ex`s blog",
  description: "a1ex`s blog",
  url: "http://a1ex.vip",
  navItems: [
    {
      name: "首页",
      icon: HomeIcon,
      path: "/home",
      keyword: "Home"
    },
    // {
    //   name: "归档",
    //   icon: ArchiveIcon,
    //   path: "/archive",
    //   keyword: "archive"
    // },
    // {
    //   name: "关于",
    //   icon: AboutIcon,
    //   path: "/about",
    //   keyword: "about"
    // },
    {
      name: "分类",
      icon: CategoryIcon,
      path: "/categories",
      keyword: "Categories"
    },
    {
      name: "标签",
      icon: TagIcon,
      path: "/tags",
      keyword: "Tags"
    }
    // {
    //   name: "友链",
    //   icon: LinkIcon,
    //   path: "/friend",
    //   keyword: "friend"
    // }
  ]
};
