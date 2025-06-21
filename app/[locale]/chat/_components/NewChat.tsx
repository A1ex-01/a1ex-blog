import { createConversation } from "@/db/redis";
import { redirect } from "next/navigation";

interface NewChatProps {
  trigger: React.ReactNode;
  userId: string;
}

export default function NewChat({ userId, trigger }: NewChatProps) {
  return (
    <form
      action={async () => {
        "use server";
        const conversation = await createConversation({ userId });
        redirect(`/chat/conversation/${conversation.id}`);
      }}
    >
      <div>{trigger}</div>
    </form>
  );
}
