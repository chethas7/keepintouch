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
