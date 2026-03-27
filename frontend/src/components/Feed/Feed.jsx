import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import PostBox from "./PostBox";
import PostFetch from "./PostFetch";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/posts");

      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {/* CREATE POST */}
      <PostBox onPostCreated={fetchPosts} />

      {/* POSTS */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <PostFetch posts={posts} />
      )}
    </div>
  );
};

export default Feed;
