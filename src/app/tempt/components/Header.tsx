// app/components/Header.tsx
"use client";

import React from "react";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between z-50">
      {/* 사이드바 토글 버튼 */}
      <button onClick={toggleSidebar} className="text-white bg-blue-500 p-2 rounded-full">
        ☰
      </button>
      <div className="text-xl font-bold">My Application</div>
      <div className="flex items-center space-x-4">
        <button className="hover:text-gray-300">Notifications</button>
        <button className="hover:text-gray-300">Profile</button>
      </div>
    </header>
  );
};

export default Header;
