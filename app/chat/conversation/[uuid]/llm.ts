import { Message } from "@/app/db/redis";
import { deepseek } from "@ai-sdk/deepseek";
import { CoreMessage, streamText } from "ai";
export const getLlmStream = async (messages: Message[]) => {
  // const userInformation = (await getUserInformation()).join(" ");

  return await streamText({
    model: deepseek("deepseek-chat"),
    messages: [
      {
        role: "system",
        content: `請以中文回答!!!!`
      },
      {
        role: "system",
        content: `以下是我們瞭解到關於該使用者的一些資訊: 名字-${"a1ex"}`
      },
      {
        role: "system",
        content: `今天的日期是 ${new Date().toLocaleDateString()}`
      },
      ...messages
    ] as CoreMessage[]
  });
};
