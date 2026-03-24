import FriendRequests from "./FriendRequests";
import OnlineFriends from "./OnlineFriends";
import Birthdays from "./Birthdays";
import RecentChats from "./RecentChats";
import TrendingHashtags from "./TrendingHashtags";

const RightSidebar = ({ panel }) => {
  return (
    <div className="sticky top-20 h-[calc(100vh-80px)] overflow-y-auto space-y-4 pr-2">
      <FriendRequests />
      <OnlineFriends />
      <Birthdays />

      {/* HIDE WHEN CHAT OPEN */}
      {panel !== "chat" && <RecentChats />}

      <TrendingHashtags />
    </div>
  );
};

export default RightSidebar;
