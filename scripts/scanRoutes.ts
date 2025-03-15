import { locales } from "@/config/lng";
import fs from "fs";
import path from "path";

export interface RouteInfo {
  path: string;
  isDynamic: boolean;
  params?: string[];
}

function scanRoutes(directory: string = "app"): RouteInfo[] {
  const pagesDir = path.join(process.cwd(), directory);
  const routes: RouteInfo[] = [];

  function processDirectory(dir: string, currentPath: string = "") {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      // 处理动态路由
      const isDynamic = file.startsWith("[") && file.endsWith("]");
      const cleanFileName = isDynamic
        ? file.slice(1, -1) // 移除 [] 括号
        : file;

      // 当前路径
      const relativePath = path.join(currentPath, cleanFileName);

      // 检查是否是页面
      if (stat.isDirectory()) {
        // 检查是否有 page 文件
        const pageFiles = ["page.tsx", "page.jsx", "page.ts", "page.js"];

        const hasPageFile = pageFiles.some((pageFile) =>
          fs.existsSync(path.join(fullPath, pageFile))
        );

        if (hasPageFile) {
          routes.push({
            path: relativePath === "" ? "/" : `/${relativePath}`,
            isDynamic,
            params: isDynamic ? [cleanFileName] : []
          });
        }

        // 递归处理子目录
        processDirectory(fullPath, relativePath);
      }
    });
  }

  processDirectory(pagesDir);
  const omitLngRoutes = routes.map((route) => {
    return {
      ...route,
      path: route.path.replace("/lng", "")
    };
  });
  // 遍历多语言
  return omitLngRoutes
    .map((route) => {
      return locales
        .map((locale) => {
          const localizedRoute = {
            ...route,
            path: `/${locale}${route.path}`
          };
          return localizedRoute;
        })
        .flat(2);
    })
    .flat(2);
}

// 使用示例
function printRoutes() {
  const routes = scanRoutes();
  console.log("应用程序路由:");
  routes.forEach((route) => {
    console.log(`路径: ${route.path}`);
    console.log(`是否动态路由: ${route.isDynamic}`);
    if (route.isDynamic) {
      console.log(`动态参数: ${route.params?.join(", ")}`);
    }
    console.log("---");
  });
}

export { printRoutes, scanRoutes };
