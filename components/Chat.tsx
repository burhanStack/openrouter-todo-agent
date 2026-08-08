"use client";

import { useState, useRef, useEffect } from "react";

import Message from "./Message";
import ChatInput from "./ChatInput";

import { ChatMessage } from "@/types/chat";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current?.scrollHeight || 0,
      behavior: "smooth"
    });
  }, [messages, isLoading]);

  async function sendMessage(content: string) {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
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
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <header className="border-b px-4 py-4">
          <h2 className="text-xl font-semibold text-gray-900">Todo Assistant</h2>
        </header>

        {/* Messages Container - Scrollable */}
        <div className="flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4" ref={messageListRef}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="text-center py-4">
                <p className="text-gray-500 italic">Thinking...</p>
              </div>
            )}
          </div>
        </div>

        {/* Input Container - Fixed at bottom */}
        <div className="border-t px-4 py-4">
          <ChatInput onSend={sendMessage} className="" />
        </div>
      </div>
    </div>
  );
}