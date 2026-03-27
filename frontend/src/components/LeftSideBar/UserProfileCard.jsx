import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

const UserProfileCard = () => {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);

  if (!user) return null;

  const isProfileIncomplete = !user.location || !user.workplace || !user.dob;

  return (
    <>
      <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm">
        {/* AVATAR */}
        <img
          src={user.avatar || DEFAULT_AVATAR}
          className="w-24 h-24 mx-auto rounded-lg object-cover"
        />

        {/* NAME */}
        <h2 className="mt-3 text-center font-semibold text-lg">{user.name}</h2>

        {/* INFO PREVIEW */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1 text-center">
          {user.location && <p>📍 {user.location}</p>}
          {user.workplace && <p>💼 {user.workplace}</p>}
        </div>

        {/* WARNING */}
        {isProfileIncomplete && (
          <p className="mt-3 text-xs text-yellow-500 text-center">
            ⚠ Complete your profile
          </p>
        )}

        {/* SEE MORE / EDIT */}
        <button
          onClick={() => setOpenModal(true)}
          className="mt-3 text-sm text-blue-500 hover:underline block mx-auto"
        >
          {isProfileIncomplete ? "Complete Profile" : "Edit Profile"}
        </button>
      </div>

      {openModal && <ProfileModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default UserProfileCard;
