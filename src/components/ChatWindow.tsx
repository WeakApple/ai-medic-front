// src/components/ChatWindow.tsx
import React from "react";
import ChatResponse from "./ChatResponse";
import UserMessage from "./UserMessage";

type ChatWindowProps = {
  messages: { id: number; text: string; sender: "user" | "bot" }[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) =>
        msg.sender === "user" ? (
          <UserMessage key={msg.id} text={msg.text} />
        ) : (
          <ChatResponse key={msg.id} text={msg.text} />
        )
      )}
    </div>
  );
};

export default ChatWindow;
