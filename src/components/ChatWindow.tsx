// app/components/ChatWindow.tsx
"use client";

import React from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const ChatWindow: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-800 w-full max-w-5xl mx-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`my-2 p-3 rounded-lg ${
            msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-500 text-white"
          }`}
          style={{ maxWidth: "80%" }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
