import { useState } from "react";
import { posts, users, comments } from "../../assets/dummyData";
import { FaRegHeart, FaRegComment, FaPaperPlane } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const PostFetch = () => {
  const [expandedPosts, setExpandedPosts] = useState({});

  const toggleComments = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const user = users.find((u) => u.id === post.userId);
        if (!user) return null;

        const postComments = comments.filter((c) => c.postId === post.id);

        const visibleComments = expandedPosts[post.id]
          ? postComments
          : postComments.slice(0, 3);

        return (
          <div
            key={post.id}
            className="bg-gray-300 dark:bg-[#1f1f1f]
                       text-gray-800 dark:text-gray-200
                       rounded-2xl p-5 shadow-sm
                       transition-colors"
          >
            {/* USER */}
            <p className="font-semibold mb-1">{user.name}</p>

            {/* TEXT */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {post.content}
            </p>

            {/* IMAGE */}
            {post.media && post.media.length > 0 && (
              <img src={post.media[0].url} className="rounded-xl mb-4 w-full" />
            )}

            {/* ACTION BAR */}
            <div className="flex gap-6 text-xl text-gray-600 dark:text-gray-300 mb-4">
              <FaRegHeart className="cursor-pointer hover:text-red-500 transition" />
              <FaRegComment className="cursor-pointer hover:text-blue-500 transition" />
              <FaPaperPlane className="cursor-pointer hover:text-green-500 transition" />
            </div>

            <hr className="border-gray-300 dark:border-gray-700 mb-4" />

            {/* COMMENTS */}
            <div className="space-y-4">
              {visibleComments.map((comment) => {
                const commentUser = users.find((u) => u.id === comment.userId);

                return (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={commentUser.avatar}
                      className="w-8 h-8 rounded-full"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        {commentUser.name}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* SHOW MORE */}
              {postComments.length > 3 && (
                <button
                  onClick={() => toggleComments(post.id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  {expandedPosts[post.id] ? "Show less" : "Show more comments"}
                </button>
              )}
            </div>

            {/* ADD COMMENT */}
            <div className="flex items-start gap-3 mt-4">
              <img src={user.avatar} className="w-9 h-9 rounded-full" />

              <div className="flex flex-col flex-1">
                <p className="text-sm font-semibold">{user.name}</p>

                <div
                  className="flex items-center
                             bg-white dark:bg-[#2a2a2a]
                             rounded-full px-4 py-2 mt-1"
                >
                  <input
                    placeholder="Write your comment..."
                    className="bg-transparent outline-none flex-1 text-sm
                               text-gray-700 dark:text-gray-200
                               placeholder-gray-500 dark:placeholder-gray-400"
                  />

                  <FiSend className="text-gray-500 dark:text-gray-300 cursor-pointer hover:text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostFetch;
