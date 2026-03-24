import UserProfileCard from "./UserProfileCard";
import SuggestedFriends from "./SuggestedFriends";
import FriendsCard from "./FriendsCard";

const LeftSidebar = () => {
  return (
    <div
      className="
      sticky top-20
      h-[calc(100vh-80px)]
      overflow-y-auto
      space-y-4
      pr-2
      "
    >
      <UserProfileCard />
      <FriendsCard />
      <SuggestedFriends />
    </div>
  );
};

export default LeftSidebar;
