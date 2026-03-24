import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";

const FriendsModal = ({ users, closeModal }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 cursor-default animate-[fadeIn_.15s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1f1f1f] w-[500px] max-h-[70vh] rounded-xl p-6 overflow-y-auto shadow-xl animate-[modalPop_.25s_ease]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Friends
          </h2>

          <FaTimes
            onClick={closeModal}
            className="cursor-pointer text-gray-500 hover:text-red-500"
          />
        </div>
        {/* FRIEND LIST */}
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={user.avatar} className="w-10 h-10 rounded-full" />

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500">{user.profession}</p>
                </div>
              </div>

              <button className="text-blue-500 text-sm hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;
