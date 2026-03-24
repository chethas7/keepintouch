import { users } from "../../assets/dummyData";

const Birthdays = () => {
  // Taking a slice for dummy data
  const birthdays = users.slice(6, 8);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-neutral-800 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="text-lg">🎂</span> Birthdays
        </h2>
        <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
          See All
        </span>
      </div>

      <div className="space-y-4">
        {birthdays.map((user, index) => (
          <div key={user.id} className="flex items-center gap-3">
            {/* Avatar with status indicator for the first person (Today's Birthday) */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className={`w-10 h-10 rounded-full object-cover p-0.5 ring-2 ${
                  index === 0 ? "ring-blue-500" : "ring-transparent opacity-70"
                }`}
              />
              {index === 0 && (
                <span className="absolute -bottom-1 -right-1 text-[10px]">
                  ✨
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <p
                className={`text-sm font-semibold ${
                  index === 0
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-neutral-400"
                }`}
              >
                {user.name}
              </p>
              <p className="text-[11px] text-gray-400 dark:text-neutral-500">
                {index === 0 ? "Birthday is today!" : "Upcoming birthday"}
              </p>
            </div>

            {/* Action Button for today's birthdays */}
            {index === 0 && (
              <button className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95">
                Wish
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Birthdays;
