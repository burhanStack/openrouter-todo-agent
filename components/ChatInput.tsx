"use client";

import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!value.trim()) return;

    onSend(value);

    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <input
        className="flex-1 rounded-lg border p-3"
        placeholder="Ask your AI..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        className="rounded-lg bg-black px-5 text-white"
      >
        Send
      </button>
    </form>
  );
}