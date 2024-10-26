// src/app/chat/page.tsx
"use client";

import React, { useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";
import Sidebar from "../../components/Sidebar";
import SidebarPanel from "../../components/SidebarPanel";
import Header from "../../components/Header";

const ChatPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPanelOpen, setIsSidebarPanelOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleSidebarPanel = () => setIsSidebarPanelOpen((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />

      {/* 좌측 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* 우측 사이드 패널 */}
      <SidebarPanel isOpen={isSidebarPanelOpen} togglePanel={toggleSidebarPanel} />

      {/* 메인 콘텐츠 */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
        style={{
          marginRight: isSidebarPanelOpen ? "50vw" : "0", // 패널이 열릴 때 50vw 만큼 우측 여백 추가
        }}
      >
        <div className="flex flex-col h-full bg-gray-800 pt-16">
          <ChatWindow messages={[{ id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", sender: "bot" }]} />
          <MessageInput onSend={(text) => console.log(text)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
