import { RouteInfo, scanRoutes } from "@/scripts/scanRoutes";
import { expect, test } from "@playwright/test";
import { filter } from "lodash";
const routes = scanRoutes();
const isStaticRoute = filter(routes, (r: RouteInfo) => !r.isDynamic);
const generatePageTestByRoute = (route: RouteInfo) => {
  test.describe(`<${route.path}> 加载测试`, () => {
    test(`<${route.path}> 加载成功`, async ({ page }) => {
      // 检查页面响应状态码
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
    });
    if (route.path.includes("svgTransform")) {
      test(`<${route.path}> svg 过渡变换 并且包含预览 codebox`, async ({ page }) => {
        // 检查页面响应状态码
        const response = await page.goto(route.path);
        expect(response?.status()).toBe(200);
        const htmlContent = await page.content();
        const bol = htmlContent.includes("IconTransformProps");
        expect(bol).toBe(true);
      });
    }

    // test("关键元素存在", async ({ page }) => {
    //   // 检查特定文本内容
    //   const welcomeText = await page.getByText(/Home/i);
    //   expect(welcomeText).toBeTruthy();
    // });

    // test("无控制台错误", async ({ page }) => {
    //   const logs: string[] = [];

    //   // 捕获浏览器控制台错误
    //   page.on("console", (msg) => {
    //     if (msg.type() === "error") {
    //       logs.push(msg.text());
    //     }
    //   });

    //   await page.goto("/home");

    //   // 等待页面加载完成
    //   await page.waitForLoadState("networkidle");

    //   // 断言无错误
    //   expect(logs, `控制台错误: ${logs.join("; ")}`).toHaveLength(0);
    // });
  });
};

isStaticRoute.forEach(generatePageTestByRoute);
