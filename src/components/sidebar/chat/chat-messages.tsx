"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@ai-sdk/react";
import { ChatMessage } from "./chat-message";
import { LoadingDots } from "./loading-dots";

interface ChatMessagesProps {
  messages: Message[];
  status: string;
}

export function ChatMessages({ messages, status }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 space-y-4 p-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {status === "submitted" && <LoadingDots />}
    </ScrollArea>
  );
}
