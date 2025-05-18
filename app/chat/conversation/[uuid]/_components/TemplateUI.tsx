import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@clerk/nextjs/server";
import { marked } from "marked";
export const ParseToMarkdown = async ({
  block,
  "data-message-id": messageId
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
      className="animate-fade-in motion-safe:animate-fadeIn"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const UserMessageWrapper = ({
  children,
  user
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <div className="flex gap-4 items-start w-full">
      <div className="bg-black flex-1 text-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 ">
        <div className="flex items-start gap-3">
          <div className="markdown-content prose prose-gray prose-sm max-w-none">{children}</div>
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
  user
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <div className="flex gap-4 items-start w-full">
      <Avatar>
        <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? ""} />
        <AvatarFallback>{user?.fullName?.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="bg-[#F4F4F5] text-black p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="markdown-content markdown-body prose prose-indigo prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
