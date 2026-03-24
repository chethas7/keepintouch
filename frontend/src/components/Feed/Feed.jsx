import PostBox from "./PostBox";
import PostFetch from "./PostFetch";

const Feed = () => {
  return (
    <div className="space-y-4">
      {/* Create Post */}
      <PostBox />

      {/* Posts */}
      <PostFetch />
    </div>
  );
};

export default Feed;
