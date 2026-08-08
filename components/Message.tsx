import { ChatMessage } from "@/types/chat";

interface Props {
  message: ChatMessage;
}

export default function Message({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`mb-4 ${isUser ? "ml-auto" : "mr-auto"} max-w-[80%] `}>
      <div className={`px-3 py-2 rounded-lg ${
        isUser
          ? "bg-blue-500 text-white"
          : "bg-gray-100 text-gray-900"
      } `}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}