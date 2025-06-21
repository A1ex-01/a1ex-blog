import { Message } from "@/db/redis";
import { deepseek } from "@ai-sdk/deepseek";
import { User } from "@clerk/nextjs/server";
import { CoreMessage, streamText } from "ai";
import { pick } from "lodash";
export const getLlmStream = async (messages: Message[], user: User) => {
  // const userInformation = (await getUserInformation()).join(" ");

  return await streamText({
    model: deepseek("deepseek-chat"),
    messages: [
      {
        role: "system",
        content: `請以中文回答!!!!`,
      },
      {
        role: "system",
        content: `你是一个给前端开发者解疑答惑的专业顾问，请以中文回答!!!!`,
      },
      {
        role: "system",
        content: `你在nextjs方向有极强的研究，nextjs的官方文档: https://nextjs.org/docs`,
      },
      {
        role: "system",
        content: `以下是我們了解到关于该使用者的一些资讯: ${JSON.stringify(pick(user, ["createdAt", "id", "firstName", "lastName", "email", "username"]))}`,
      },
      {
        role: "system",
        content: `今天的日期是 ${new Date().toLocaleDateString()}`,
      },
      ...messages,
    ] as CoreMessage[],
  });
};
