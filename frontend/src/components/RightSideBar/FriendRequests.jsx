import { users } from "../../assets/dummyData";

const FriendRequests = () => {
  const requests = users.slice(3, 6);

  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
        Friend Requests
      </h3>

      <div className="space-y-3">
        {requests.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatar} className="w-8 h-8 rounded-full" />

              <p className="text-sm text-gray-800 dark:text-gray-200">
                {user.name}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                Accept
              </button>

              <button className="text-xs bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
