"use client";

import { useChat } from "@ai-sdk/react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

export function SidebarChat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat",
    maxSteps: 10,
    id: "sidebar-chat",
  });

  return (
    <div className="flex h-full flex-col">
      <ChatMessages messages={messages} status={status} />
      <ChatInput
        input={input}
        status={status}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
