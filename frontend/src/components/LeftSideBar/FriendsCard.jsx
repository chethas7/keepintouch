import { useState } from "react";
import { users } from "../../assets/dummyData";
import FriendsModal from "./FriendsModal";

const FriendsCard = () => {
  const [showModal, setShowModal] = useState(false);

  const friends = users.slice(1, 10);

  return (
    <>
      <div
        className="bg-gray-100 dark:bg-[#1f1f1f]
        rounded-xl p-4 shadow-sm transition-colors"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Friends
          </h3>

          <button
            onClick={() => setShowModal(true)}
            className="text-xs text-blue-500 hover:underline"
          >
            See All →
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={friend.avatar}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <p className="text-xs mt-1 text-gray-700 dark:text-gray-300 truncate w-full">
                {friend.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <FriendsModal users={users} closeModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export default FriendsCard;
