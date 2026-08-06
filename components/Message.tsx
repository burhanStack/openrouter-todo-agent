import { ChatMessage } from "@/types/chat";

interface Props {
  message: ChatMessage;
}

export default function Message({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-lg rounded-xl px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}