import { useState } from "react";
import { useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";

import { toggleLikeAPI, addCommentAPI } from "../../api/postAPI";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

const PostFetch = ({ posts }) => {
  const [expandedPosts, setExpandedPosts] = useState({});
  const [localPosts, setLocalPosts] = useState(posts);
  const [commentInputs, setCommentInputs] = useState({});

  const currentUser = useSelector((state) => state.auth.user);

  // 👍 FORMAT COUNTS
  const formatCount = (num) => {
    if (!num) return 0;
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  // ❤️ LIKE TOGGLE
  const handleLike = async (postId) => {
    const userId = currentUser?.id;

    if (!userId) return; // ✅ silent guard

    const userIdStr = userId.toString();

    setLocalPosts((prev) =>
      prev.map((p) => {
        if (p._id !== postId) return p;

        const likesArray = (p.likes || []).map((id) => id?.toString());

        const isLiked = likesArray.includes(userIdStr);

        return {
          ...p,
          likes: isLiked
            ? likesArray.filter((id) => id !== userIdStr)
            : [...likesArray, userIdStr],
        };
      }),
    );

    toggleLikeAPI(postId).catch(console.log);
  };

  // 💬 COMMENT
  const handleComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    try {
      const res = await addCommentAPI(postId, { text });

      setLocalPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p,
        ),
      );

      setCommentInputs((prev) => ({
        ...prev,
        [postId]: "",
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleComments = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="space-y-6">
      {localPosts.map((post) => {
        const postUser = post.user;
        if (!postUser) return null;

        const userId = currentUser?.id?.toString();

        const isLiked =
          userId &&
          (post.likes || []).map((id) => id?.toString()).includes(userId);

        const visibleComments = expandedPosts[post._id]
          ? post.comments
          : post.comments?.slice(0, 3);

        return (
          <div
            key={post._id}
            className="bg-gray-100 dark:bg-[#1f1f1f] p-5 rounded-2xl"
          >
            {/* USER */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={postUser.avatar || DEFAULT_AVATAR}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-semibold">{postUser.name}</p>
            </div>

            {/* CONTENT */}
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              {post.content}
            </p>

            {/* IMAGE */}
            {post.image && (
              <img
                src={post.image}
                className="rounded-xl mb-3 w-full max-h-[500px] object-cover"
              />
            )}

            {/* 👍 STATS */}
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>👍 {formatCount(post.likes?.length)}</span>
              <span>{post.comments?.length || 0} comments • 0 shares</span>
            </div>

            <hr className="border-gray-300 dark:border-gray-700 mb-2" />

            {/* ACTION BUTTONS */}
            <div className="flex justify-around text-sm font-medium text-gray-600 dark:text-gray-300">
              {/* LIKE */}
              <button
                disabled={!currentUser?.id}
                onClick={() => handleLike(post._id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition 
                  ${
                    !currentUser?.id
                      ? "opacity-50 cursor-not-allowed"
                      : isLiked
                        ? "text-blue-500"
                        : "hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                  }`}
              >
                👍 <span>Like</span>
              </button>

              {/* COMMENT */}
              <button
                onClick={() => toggleComments(post._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
              >
                💬 <span>Comment</span>
              </button>

              {/* SHARE */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2a2a2a]">
                🔁 <span>Share</span>
              </button>
            </div>

            <hr className="border-gray-300 dark:border-gray-700 mt-2 mb-3" />

            {/* COMMENTS */}
            <div
              className="space-y-2 overflow-hidden transition-all duration-700 ease-in-out"
              style={{
                maxHeight: expandedPosts[post._id]
                  ? `${Math.min((post.comments?.length || 0) * 70, 400)}px`
                  : `${Math.min((visibleComments?.length || 0) * 70, 210)}px`,
              }}
            >
              {visibleComments?.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <img
                    src={c.user?.avatar || DEFAULT_AVATAR}
                    className="w-7 h-7 rounded-full"
                  />

                  <div className="bg-gray-200 dark:bg-[#2a2a2a] px-3 py-2 rounded-xl">
                    <p className="text-xs font-semibold text-gray-800 dark:text-white">
                      {c.user?.name}
                    </p>

                    <p className="text-xs text-gray-700 dark:text-gray-200">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}

              {post.comments?.length > 3 && (
                <button
                  onClick={() => toggleComments(post._id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  {expandedPosts[post._id] ? "Show less" : "Show more comments"}
                </button>
              )}
            </div>

            {/* ADD COMMENT */}
            <div className="flex gap-2 mt-3">
              <input
                value={commentInputs[post._id] || ""}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [post._id]: e.target.value,
                  })
                }
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 rounded-full bg-white dark:bg-[#2a2a2a]
                           text-gray-800 dark:text-white outline-none"
              />

              <FiSend
                onClick={() => handleComment(post._id)}
                className="cursor-pointer text-gray-500 hover:text-blue-500"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostFetch;
