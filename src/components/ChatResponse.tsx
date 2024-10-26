// src/components/ChatbotResponse.tsx
import React from "react";

type ChatResponseProps = {
  text: string;
};

const ChatResponse: React.FC<ChatResponseProps> = ({ text }) => {
  return (
    <div className="flex w-full">
      <div className="p-4 rounded-lg bg-gray-300 text-black max-w-lg self-start">
        {text}
      </div>
    </div>
  );
};

export default ChatResponse;
