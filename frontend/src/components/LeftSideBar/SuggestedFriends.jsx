import { users } from "../../assets/dummyData";

const SuggestedFriends = () => {
  const suggestions = users.slice(5, 10);

  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm transition-colors">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Suggested Friends
      </h3>

      <div className="space-y-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatar} className="w-8 h-8 rounded-full" />

              <p className="text-sm text-gray-800 dark:text-gray-200">
                {user.name}
              </p>
            </div>

            <button className="text-blue-500 text-xs hover:underline">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;
