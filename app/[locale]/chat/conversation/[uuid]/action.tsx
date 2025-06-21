"use server";
import { Spinner } from "@/components/ui/spinner";
import { createMessage, getMessagesByConversation, Message } from "@/db/redis";
import { currentUser, User } from "@clerk/nextjs/server";
import { Fragment, ReactNode, Suspense } from "react";
import { v4 as uuid } from "uuid";
import {
  AssistantMessageWrapper,
  ParseToMarkdown,
  UserMessageWrapper,
} from "./_components/TemplateUI";
import { getLlmStream } from "./llm";
import { createMarkdownBlockGeneratorFromLlmReader } from "./tools/parser";
const getMessages = async (conversationId: string): Promise<Message[]> => {
  const messages = await getMessagesByConversation(conversationId);
  return messages;
};
export const getMessageReactNode = async (
  conversationId: string,
  // If messageContent is null, it will generate a new message from the assistant
  // based on the chat history. Otherwise, it will first save the messageContent
  // as a user message to the DB, and then generate a new message from the assistant
  // based on the chat history + the new user message.
  messageContent: string | null,
): Promise<ReactNode> => {
  const user = await currentUser();
  if (messageContent !== null) {
    await createMessage({
      conversationId,
      aiMessage: {
        role: "user",
        content: messageContent,
      },
    });
  }

  const messages = await getMessages(conversationId);
  const llmStream = await getLlmStream(messages, user!);

  const StreamAssistantMessage = async () => {
    // For a new message to LLM, you need to send all previous messages
    // Perf bottleneck: await getMessages(conversationId)
    const llmReader = llmStream.textStream.getReader();

    // wait until the llmReader outputs a newline
    // we define the parts separated by newlines as "blocks"
    // this is like a transform stream that converts the
    // LLM stream into a stream of blocks
    const generateBlocks = createMarkdownBlockGeneratorFromLlmReader(llmReader);

    const newMessageId = uuid();

    // eslint-disable-next-line prefer-const
    let isFirstChunk = true;

    const StreamableParse = async ({
      accumulator = "",
    }: {
      accumulator?: string;
    }) => {
      const { done, value: block } = await generateBlocks.next();

      // the stream is empty, weird, so we just stop!
      if (isFirstChunk && done) {
        return null;
      }

      if (done) {
        await createMessage({
          conversationId,
          aiMessage: {
            content: accumulator,
            role: "assistant",
          },
        });

        return (
          <>
            {/* <DeleteAllNodesWithMessageId messageId={newMessageId.toString()} /> */}
            <ParseToMarkdown block={accumulator} />
          </>
        );
      }
      const Wrapper = isFirstChunk ? AssistantMessageWrapper : Fragment;

      isFirstChunk = false;
      return (
        <Wrapper>
          <ParseToMarkdown
            data-message-id={newMessageId.toString()}
            block={block}
          />
          <Suspense
            fallback={
              <>
                <Spinner />
                <div className="h-12"></div>
              </>
            }
          >
            <StreamableParse accumulator={accumulator + "\n" + block} />
          </Suspense>
        </Wrapper>
      );
    };

    return <StreamableParse />;
  };

  return (
    <>
      {messageContent !== null ? (
        <UserMessageWrapper user={user!}>{messageContent}</UserMessageWrapper>
      ) : null}
      <Suspense fallback={<Spinner />}>
        <StreamAssistantMessage />
      </Suspense>
      {/* {messageContent !== null ? (
          <UserMessageWrapper>
            {messageContent}
            <Suspense fallback={null}>
              <ExtractUserInformation />
            </Suspense>
          </UserMessageWrapper>
        ) : null}
        <Suspense fallback={<Spinner />}>
          <StreamAssistantMessage />
        </Suspense>
        <Suspense fallback={null}>
          <StreamToolCalls />
        </Suspense>
        <Suspense fallback={null}>
          <MessageAfterToolCallResults />
        </Suspense> */}
    </>
  );
};

export const getInitialMessagesReactNode = async (
  conversationId: string,
  user: User,
): Promise<ReactNode> => {
  const messages = await getMessages(conversationId);
  const AIUser = {
    fullName: "DeepSeek",
  };
  return (
    <>
      {messages.map((message, index) => {
        if (
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.length > 0
        ) {
          const isUser = message.role === "user";
          const Wrapper = isUser ? UserMessageWrapper : AssistantMessageWrapper;

          return (
            <Wrapper key={index} user={user}>
              <div className="flex gap-4">
                <ParseToMarkdown block={message.content} />
              </div>
            </Wrapper>
          );
        }
        return null;
      })}
    </>
  );
};
