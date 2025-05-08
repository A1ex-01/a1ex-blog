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
    <div className="h-full w-full">
      <div className="w-full flex justify-between my-10">
        <NewChat userId={userId} trigger={<Button>New Chat</Button>} />
      </div>
    </div>
  );
}
