import { getConversationById } from "@/db/redis";
import { currentUser } from "@clerk/nextjs/server";
import Wrapper from "./_components/Wrapper";
import { getInitialMessagesReactNode, getMessageReactNode } from "./action";

export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  // const {userId} = await auth();
  const user = await currentUser();
  const conversation = await getConversationById(uuid);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Wrapper
        getMessageReactNode={getMessageReactNode}
        conversationUuid={uuid}
        initialMessagesReactNode={await getInitialMessagesReactNode(
          uuid,
          user!,
        )}
      />
    </div>
  );
}
