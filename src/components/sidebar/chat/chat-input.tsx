"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  status: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ChatInput({
  input,
  status,
  onInputChange,
  onSubmit,
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="border-t p-4">
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={onInputChange}
          placeholder="Ask about clinical trials..."
          disabled={status !== "ready"}
          className="flex-1"
        />
        <Button type="submit" disabled={status !== "ready" || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
