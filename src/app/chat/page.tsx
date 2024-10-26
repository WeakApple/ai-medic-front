// src/app/chat/page.tsx
"use client";

import React, { useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";
import Sidebar from "../../components/Sidebar";
import SidebarPanel from "../../components/SidebarPanel";
import Header from "../../components/Header";

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", sender: "bot" },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPanelOpen, setIsSidebarPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleSidebarPanel = () => setIsSidebarPanelOpen((prev) => !prev);

  const handleSend = async (text: string) => {
    const userMessage = { id: messages.length + 1, text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-800 pt-5 pb-5">
      <Header toggleSidebar={toggleSidebar} />

      {/* 좌측 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* 우측 사이드 패널 */}
      <SidebarPanel isOpen={isSidebarPanelOpen} togglePanel={toggleSidebarPanel} />

      {/* 메인 콘텐츠 */}
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : ""} ${
          isSidebarPanelOpen ? "mr-[50vw]" : "mr-0"
        } flex justify-center`} // flex와 justify-center 추가
      >
        {/* 최대 가로 크기 제한 */}
        <div className="flex flex-col h-full bg-gray-800 pt-16 w-full max-w-3xl px-4">
          <ChatWindow messages={messages} />
          <MessageInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
