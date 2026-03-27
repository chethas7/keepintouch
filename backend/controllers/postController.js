import Post from "../models/postModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import cloudinary from "../config/cloudinary.js";

// @desc Create new post
// @route POST /api/posts
// @access Private
export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content && !req.file) {
    throw new ApiError("Post cannot be empty", 400);
  }

  let imageUrl = "";

  // upload image if exists
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts",
    });

    imageUrl = result.secure_url;
  }

  const post = await Post.create({
    user: req.user._id,
    content,
    image: imageUrl,
  });

  res.status(201).json({
    success: true,
    post,
  });
});
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("user", "name avatar")
    .populate("comments.user", "name avatar")
    .sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: posts.length, posts });
});

// @desc Toggle like on post
// @route PUT /api/posts/:id/like
// @access Private
export const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log(post, "post like");

  const userId = req.user._id;

  const isLiked = post.likes.includes(userId);

  if (isLiked) {
    post.likes.pull(userId); // unlike
  } else {
    post.likes.push(userId); // like
  }

  await post.save();

  res.json({
    success: true,
    likes: post.likes,
  });
});

// @desc Add comment to post
// @route POST /api/posts/:id/comment
// @access Private
export const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = {
    user: req.user._id,
    text: req.body.text,
  };

  post.comments.push(comment);

  await post.save();

  // 🔥 ADD THIS LINE HERE
  await post.populate("comments.user", "name avatar");

  // ✅ THEN send response
  res.status(201).json({
    success: true,
    comments: post.comments,
  });
});
