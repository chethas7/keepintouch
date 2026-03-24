import express from "express";
import { createPost } from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// CREATE POST
router.post("/", protect, upload.single("image"), createPost);

export default router;
