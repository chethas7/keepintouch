import { users } from "../../assets/dummyData";

const OnlineFriends = () => {
  const online = users.filter((user) => user.isOnline).slice(0, 6);

  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
        Online Friends
      </h3>

      <div className="space-y-3">
        {online.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              <img src={user.avatar} className="w-8 h-8 rounded-full" />

              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-[#1f1f1f]" />
            </div>

            <p className="text-sm text-gray-800 dark:text-gray-200">
              {user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineFriends;
