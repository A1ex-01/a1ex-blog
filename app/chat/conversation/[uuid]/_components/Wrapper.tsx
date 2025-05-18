"use client";
import { Button } from "@/components/ui/button";
import { ReactNode, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { TbLoader, TbSend } from "react-icons/tb";

interface WrapperProps {
  conversationUuid: string;
  getMessageReactNode: (
    conversationId: string,
    message: string,
    isAi: boolean
  ) => Promise<ReactNode>;
  initialMessagesReactNode: ReactNode;
}

export default function Wrapper({
  getMessageReactNode,
  conversationUuid,
  initialMessagesReactNode
}: WrapperProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ReactNode[]>([initialMessagesReactNode]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();
  return (
    <>
      <div className="flex flex-col gap-4 flex-1 overflow-y-scroll">
        {messages.length === 0 ||
        (Array.isArray(messages[0]) && messages.length === 1 && messages[0].length === 0) ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Fast Chat</h1>
            <div className="text-gray-600 max-w-md mb-8">
              <p>Start a conversation by typing a message below.</p>
              <p>Use Shift + Enter to quickly send messages.</p>
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
          const newNode = await getMessageReactNode(conversationUuid, inputValue, false);
          setMessages((prev) => [...prev, newNode]);
          setInputValue("");
        }}
      >
        <div ref={inputRef} className="my-4 bg-white">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 pr-12 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type a message..."
              rows={3}
            />
            <Button
              disabled={pending}
              type="submit"
              className="absolute bottom-3 right-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition-colors"
              aria-label="Send message"
            >
              {pending ? <TbLoader className="animate-spin" /> : <TbSend />}
              发送
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
