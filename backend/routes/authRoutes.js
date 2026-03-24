import express from "express";
import {
  sendSignupOTP,
  verifySignupOTP,
  loginUser,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import {
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/passwordController.js";
import { googleLogin } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/send-otp", sendSignupOTP);
router.post("/verify-otp", verifySignupOTP);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/change-password", protect, changePassword);
router.post("/google-login", googleLogin);

export default router;
