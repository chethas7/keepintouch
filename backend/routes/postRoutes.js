import express from "express";
import {
  addComment,
  createPost,
  getPosts,
  toggleLike,
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// CREATE POST
router.post("/", protect, upload.single("image"), createPost);
router.get("/", protect, getPosts);
router.put("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);

export default router;
