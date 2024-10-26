// src/components/SidebarPanel.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

type SidebarPanelProps = {
  isOpen: boolean;
  togglePanel: () => void;
};

const NaverMapHospitals = dynamic(() => import("./NaverMapHospitals"), {
  ssr: false,
});

const SidebarPanel: React.FC<SidebarPanelProps> = ({ isOpen, togglePanel }) => {
  return (
    <div
      className={`fixed top-[5rem] right-0 h-[calc(100%-5rem)] bg-gray-900 text-white w-1/2 transform transition-transform duration-300 z-20 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={togglePanel}
        className="absolute top-1/2 -left-10 transform -translate-y-1/2 p-3 rounded-r-lg text-white text-2xl"
      >
        {isOpen ? ">" : "<"}
      </button>
      {/* 병원 지도 표시 */}
      <div className="p-4 h-full">
        <NaverMapHospitals />
      </div>
    </div>
  );
};

export default SidebarPanel;
