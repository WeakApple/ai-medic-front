// app/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <div className="font-bold">Logo</div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 px-2 py-1 rounded"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:text-gray-300">Notifications</button>
        <button className="hover:text-gray-300">Profile</button>
      </div>
    </header>
  );
};

export default Header;
