"use client";

import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
  className?: string;
}

export default function ChatInput({ onSend, className = "" }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!value.trim()) return;

    onSend(value);

    setValue("");
  }

  const buttonClassName =
    !value.trim()
      ? "px-4 py-2 rounded-r bg-blue-300 text-white cursor-not-allowed"
      : "px-4 py-2 rounded-r bg-blue-500 text-white hover:bg-blue-600";

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <input
        className="flex-1 px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        className={buttonClassName}
      >
        Send
      </button>
    </form>
  );
}