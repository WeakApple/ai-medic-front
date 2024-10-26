// app/components/Sidebar.tsx
"use client";

import React, { useEffect, useState } from "react";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 컴포넌트가 클라이언트에서만 렌더링되도록 설정
    setIsClient(true);
  }, []);

  return (
    <aside
      className={`fixed top-16 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"
      }`}
      style={{ zIndex: 40 }}
    >
      {/* 메뉴 (사이드바가 접힐 때 글씨 숨기기) */}
      {isClient && (
        <nav
          className={`flex flex-col space-y-4 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <a href="#" className="text-white hover:bg-gray-700 p-2 rounded">
            ChatGPT
          </a>
          <a href="#" className="text-white hover:bg-gray-700 p-2 rounded">
            Code Copilot
          </a>
          <a href="#" className="text-white hover:bg-gray-700 p-2 rounded">
            AI Humanizer
          </a>
          <a href="#" className="text-white hover:bg-gray-700 p-2 rounded">
            GPT 탐색
          </a>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
