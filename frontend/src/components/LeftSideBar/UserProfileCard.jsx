import { users } from "../../assets/dummyData";

const user = users[0];

const UserProfileCard = () => {
  return (
    <div
      className="bg-gray-100 dark:bg-[#1f1f1f] 
                    rounded-xl p-4 shadow-sm
                    text-center transition-colors"
    >
      {/* AVATAR */}
      <img
        src={user.avatar}
        className="w-28 h-28 mx-auto rounded-lg object-cover"
      />

      {/* NAME */}
      <h2 className="mt-3 font-semibold text-lg text-gray-800 dark:text-gray-200">
        {user.name}
      </h2>

      {/* AGE */}
      <p className="text-sm text-gray-600 dark:text-gray-400">Age {user.age}</p>

      {/* INFO */}
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <p>📍 Lives in {user.location}</p>

        <p>🎂 {user.dob}</p>

        <p>💼 Works at {user.workplace}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
