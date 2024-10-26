// app/components/Sidebar.tsx
"use client";

import React from "react";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-[5rem] left-0 h-[calc(100%-5rem)] bg-gray-900 text-white w-64 transition-transform duration-300 z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="p-4 space-y-4">
        <a href="#">ChatGPT</a>
        <a href="#">Code Copilot</a>
        <a href="#">AI Humanizer</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
