// src/components/MessageInput.tsx
import React, { useState } from "react";

type MessageInputProps = {
  onSend: (text: string) => void;
  isLoading: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && !isLoading) { // 로딩 중에는 제출 불가
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="flex items-center bg-white p-2 rounded-full shadow-md"> {/* rounded-full 추가 */}
      <input
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none" // rounded-full 추가
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="메시지를 입력하세요..."
        disabled={isLoading} // 로딩 중일 때 입력 불가
      />
      <button
        onClick={handleSubmit}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full" // rounded-full 추가
        disabled={isLoading} // 로딩 중일 때 버튼 비활성화
      >
        {isLoading ? "Loading..." : "Send"} {/* 로딩 중일 때 텍스트 변경 */}
      </button>
    </div>
  );
};

export default MessageInput;
