"use client";
import { Button } from "@/components/ui/button";
import { useMount } from "ahooks";
import { ReactNode, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import RenderFromPending from "./RenderFormPending";

interface WrapperProps {
  conversationUuid: string;
  getMessageReactNode: (
    conversationId: string,
    message: string,
    isAi: boolean,
  ) => Promise<ReactNode>;
  initialMessagesReactNode: ReactNode;
}

export default function Wrapper({
  getMessageReactNode,
  conversationUuid,
  initialMessagesReactNode,
}: WrapperProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ReactNode[]>([
    initialMessagesReactNode,
  ]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    wrapperRef.current?.scrollTo({ top: 100000000, behavior: "smooth" });
  };
  useMount(() => {
    scrollToBottom();
  });
  return (
    <div className="flex h-[calc(100vh-60px)] flex-col">
      <div
        className="flex flex-1 flex-col gap-4 overflow-y-scroll"
        ref={wrapperRef}
      >
        {messages.length === 0 ||
        (Array.isArray(messages[0]) &&
          messages.length === 1 &&
          messages[0].length === 0) ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Welcome to Fast Chat
            </h1>
            <div className="mb-8 max-w-md text-gray-600">
              <p>Start a conversation by typing a message below.</p>
            </div>
          </div>
        ) : (
          messages
        )}
      </div>
      <form
        ref={formRef}
        action={async () => {
          if (!inputValue.trim()) return;
          const newNode = await getMessageReactNode(
            conversationUuid,
            inputValue,
            false,
          );
          setMessages((prev) => [...prev, newNode]);
          setInputValue("");
          scrollToBottom();
        }}
      >
        <div ref={inputRef} className="my-4 bg-background">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full resize-none rounded border border-foreground px-3 py-2 pr-12 focus:outline-none focus:ring-2"
              placeholder="Type a message..."
              rows={3}
            />
            <Button
              disabled={pending}
              type="submit"
              color="primary"
              className="absolute bottom-3 right-3 cursor-pointer rounded-full transition-colors"
              aria-label="Send message"
            >
              <RenderFromPending
                pendingNode={
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white" />
                }
                notPendingNode={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                }
              />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
