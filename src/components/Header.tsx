// app/components/Header.tsx
"use client";

import React from "react";
import Image from "next/image";
import logo from "../../public/images/medibotLogo.png"; // 로고 이미지 파일 경로

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-950 text-white p-4 z-10 flex items-center justify-between">
      {/* 좌측 사이드바 토글 버튼 */}
      <button
        onClick={toggleSidebar}
        className="text-white bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center"
      >
        ☰
      </button>
      <div className="flex items-center">
              <Image src={logo} alt="Chat Application Logo" width={100} height={100} className="mr-2" />
      </div>
    </header>
  );
};

export default Header;
