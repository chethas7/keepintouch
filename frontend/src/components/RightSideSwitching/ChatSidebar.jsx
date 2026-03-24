import { useState } from "react";
import { conversations } from "../../assets/dummyData";

const ChatSidebar = ({ openModal }) => {
  const [showAll, setShowAll] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);
  const visibleChats = showAll ? conversations : conversations.slice(0, 10);

  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Chats
      </h3>

      <div className="space-y-3">
        {visibleChats.map((chat) => {
          const user = chat.participants[1];
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <div
              key={chat.id}
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition
                ${
                  chat.unread > 0
                    ? "bg-blue-100 dark:bg-[#2a2a2a]"
                    : "hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                }`}
            >
              {/* Avatar */}
              <img src={user.avatar} className="w-9 h-9 rounded-full" />

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {user.name}
                </p>

                <p className="text-xs text-gray-500">
                  {lastMessage.text.slice(0, 25)}...
                </p>
              </div>

              {/* Unread count */}
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* SEE MORE */}
      <button
        onClick={() => openModal(true)}
        className="text-blue-500 text-sm hover:underline cursor-pointer"
      >
        See More
      </button>
    </div>
  );
};

export default ChatSidebar;
