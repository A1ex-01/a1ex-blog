import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NewChat from "./_components/NewChat";
interface ChatProps {}

export default async function Chat(props: ChatProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/chat/login");
  }
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="w-full flex my-10 mt-48">
        <div className="mx-auto flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold">新建个对话吧～</h2>
          <NewChat userId={userId} trigger={<Button>New Chat</Button>} />
        </div>
      </div>
    </div>
  );
}
