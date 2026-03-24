import { conversations } from "../../assets/dummyData";

const RecentChats = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
        Recent Chats
      </h3>

      <div className="space-y-3">
        {conversations.slice(0, 3).map((chat) => {
          const user = chat.participants[1];

          return (
            <div key={chat.id} className="flex items-center gap-3">
              <img src={user.avatar} className="w-8 h-8 rounded-full" />

              <div>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {user.name}
                </p>

                <p className="text-xs text-gray-500">
                  {chat.messages[0].text.slice(0, 25)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentChats;
