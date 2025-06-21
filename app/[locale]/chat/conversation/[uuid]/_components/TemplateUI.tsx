import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@clerk/nextjs/server";
import { marked } from "marked";
export const ParseToMarkdown = async ({
  block,
  "data-message-id": messageId,
}: {
  block: string;
  "data-message-id"?: string;
}) => {
  // const md = MarkdownItAsync()
  // md.use(
  //   fromAsyncCodeToHtml(
  //     // 传递 codeToHtml 函数
  //     codeToHtml,
  //     {
  //       themes: {
  //         light: 'vitesse-light',
  //         dark: 'vitesse-dark',
  //       }
  //     }
  //   )
  // )
  const html = await marked(block);
  // const html = await md.renderAsync('# Title\n```ts\nconsole.log("Hello, World!")\n```')
  return (
    <div
      data-message-id={messageId}
      className="animate-fade-in motion-safe:animate-fadeIn -mb-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const UserMessageWrapper = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <div className="flex w-full items-start justify-end gap-4">
      <div className="rounded-2xl bg-foreground p-3 text-background shadow-sm transition-shadow duration-200 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="markdown-content prose prose-gray prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
      <Avatar>
        <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? ""} />
        <AvatarFallback>{user?.fullName ?? ""}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export const AssistantMessageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full items-start gap-4">
      <Avatar>
        <AvatarImage src={"/deepseek-color.png"} className="p-2" />
        <AvatarFallback>D</AvatarFallback>
      </Avatar>
      <Card className="rounded-2xl p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="markdown-content markdown-body prose prose-indigo prose-sm max-w-none">
            {children}
          </div>
        </div>
      </Card>
    </div>
  );
};
