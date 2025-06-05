"use client";

import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import type { Message } from "@ai-sdk/react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "mb-4 flex w-full",
        message.role === "assistant" ? "justify-start" : "justify-end",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          message.role === "assistant"
            ? "bg-neutral-200 text-neutral-900"
            : "bg-blue-600 text-white",
        )}
      >
        {message.content ? (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        ) : message.toolInvocations?.length ? (
          <div className="text-sm italic">
            Searching for relevant clinical trials...
          </div>
        ) : null}
      </div>
    </div>
  );
}
