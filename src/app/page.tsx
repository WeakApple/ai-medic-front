"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex flex-col flex-1 transition-all duration-300 pt-16 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <main className="flex items-center justify-center flex-1 bg-gray-100 max-w-5xl mx-auto p-4">
          <h1 className="text-5xl font-bold">Welcome to the Main Page</h1>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
