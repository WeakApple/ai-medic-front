// src/components/UserMessage.tsx
import React from "react";

type UserMessageProps = {
  text: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ text }) => {
  return (
    <div className="flex w-full justify-end">
      <div className="p-4 rounded-lg bg-blue-500 text-white max-w-lg self-end">
        {text}
      </div>
    </div>
  );
};

export default UserMessage;
