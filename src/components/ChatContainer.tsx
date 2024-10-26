// src/components/ChatContainer.tsx
"use client";

import React, { useState } from "react";
import ChatbotResponse from "./ChatResponse";
import UserMessage from "./UserMessage";
import MessageInput from "./MessageInput";

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", sender: "bot" },
  ]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 변수

  const handleSend = async (text: string) => {
    const userMessage = { id: messages.length + 1, text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true); // 로딩 시작

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { id: messages.length + 2, text: data.response, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: messages.length + 2, text: "서버 응답에 실패했습니다.", sender: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: messages.length + 2, text: "통신 오류가 발생했습니다.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) =>
          msg.sender === "user" ? (
            <UserMessage key={msg.id} text={msg.text} />
          ) : (
            <ChatbotResponse key={msg.id} text={msg.text} />
          )
        )}
      </div>
      <MessageInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
