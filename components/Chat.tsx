"use client";

import { useState } from "react";

import Message from "./Message";
import ChatInput from "./ChatInput";

import { ChatMessage } from "@/types/chat";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  async function sendMessage(content: string) {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: content,
      }),
    });

    const data = await res.json();

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: data.message,
    };

    setMessages((prev) => [...prev, assistantMessage]);
  }

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col p-6">
      <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}