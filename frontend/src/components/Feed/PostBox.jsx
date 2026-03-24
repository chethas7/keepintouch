import { users } from "../../assets/dummyData";

const currentUser = users[0];

const PostBox = () => {
  return (
    <div
      className="bg-gray-200 dark:bg-[#1f1f1f] 
                    rounded-xl p-4 shadow-sm 
                    transition-colors"
    >
      {/* TOP SECTION */}
      <div className="flex items-center gap-3">
        <img src={currentUser.avatar} className="w-10 h-10 rounded-full" />

        <input
          placeholder="What's on your mind?"
          className="flex-1 
                     bg-white dark:bg-[#2a2a2a]
                     text-gray-800 dark:text-gray-200
                     placeholder-gray-500 dark:placeholder-gray-400
                     px-4 py-2 rounded-full outline-none
                     focus:ring-2 focus:ring-blue-500/20
                     transition-colors"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div
        className="flex justify-around mt-4 text-sm 
                      text-gray-600 dark:text-gray-300"
      >
        <button className="hover:text-blue-500 transition">📷 Photo</button>

        <button className="hover:text-green-500 transition">🎥 Video</button>

        <button className="hover:text-orange-500 transition">
          📍 Location
        </button>
      </div>
    </div>
  );
};

export default PostBox;
