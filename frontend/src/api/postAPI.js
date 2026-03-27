import axiosInstance from "./axiosInstance";

// 📌 Get all posts
export const getPostsAPI = () => axiosInstance.get("/posts");

// 📌 Create post
export const createPostAPI = (data) => axiosInstance.post("/posts", data);

// 📌 Like / Unlike post
// export const toggleLikeAPI = (postId) =>
//   axiosInstance.put(`/posts/${postId}/like`);
export const toggleLikeAPI = (postId) => {
  console.log("Toggling like for Post ID:", postId);
  return axiosInstance.put(`/posts/${postId}/like`);
};

// 📌 Add comment
export const addCommentAPI = (postId, data) =>
  axiosInstance.post(`/posts/${postId}/comment`, data);
