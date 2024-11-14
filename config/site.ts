export type SiteConfig = typeof siteConfig;
export const siteConfig = {
  name: "a1ex`s blog",
  description: "a1ex`s blog",
  url: "http://a1ex.vip",
  navItems: [
    {
      name: "首页",
      icon: "tabler:home-filled",
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
      icon: "tabler:category-filled",
      path: "/categories",
      keyword: "Categories"
    },
    {
      name: "标签",
      icon: "icon-park-solid:tag",
      path: "/tags",
      keyword: "Tags"
    },
    {
      name: "工具",
      icon: "entypo:tools",
      path: "/tools",
      keyword: "Tools"
    },
    {
      name: "示例",
      icon: "arcticons:example",
      path: "/example",
      keyword: "Example"
    }
    // {
    //   name: "友链",
    //   icon: LinkIcon,
    //   path: "/friend",
    //   keyword: "friend"
    // }
  ]
};
