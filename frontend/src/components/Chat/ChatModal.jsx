import { users, conversations } from "../../assets/dummyData";
import { useState } from "react";

const ChatModal = ({ onClose }) => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-5xl h-[85vh] bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg flex overflow-hidden">
        {/* LEFT SIDE — CHAT LIST */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 font-semibold text-gray-800 dark:text-white">
            Chats
          </div>

          {conversations.map((chat) => {
            const user = chat.participants[1];

            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition
                  ${
                    selectedChat.id === chat.id
                      ? "bg-blue-100 dark:bg-[#2a2a2a]"
                      : "hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                  }`}
              >
                <img src={user.avatar} className="w-10 h-10 rounded-full" />

                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {chat.messages[chat.messages.length - 1].text.slice(0, 20)}
                    ...
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE — CHAT WINDOW */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <div className="p-4 border-b flex justify-between items-center">
            <span className="text-gray-800 dark:text-white font-semibold">
              {selectedChat.participants[1].name}
            </span>

            <button onClick={onClose}>❌</button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[60%] p-2 rounded-lg text-sm
                  ${
                    msg.sender.id === selectedChat.participants[0].id
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 dark:bg-[#2a2a2a] text-gray-800 dark:text-white"
                  }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-4 border-t flex gap-2">
            <input
              placeholder="Type message..."
              className="flex-1 p-2 rounded-full bg-gray-100 dark:bg-[#2a2a2a] outline-none"
            />

            <button className="bg-blue-500 text-white px-4 rounded-full">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
