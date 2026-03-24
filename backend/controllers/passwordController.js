import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import { sendOTP } from "../config/nodeMailer.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email, "forgot");

  if (!email) {
    throw new ApiError("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const otp = generateOTP();

  await OTP.deleteMany({ email, purpose: "reset" });

  await OTP.create({
    email,
    otp,
    purpose: "reset",
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  await sendOTP(email, otp);

  res.status(200).json({
    success: true,
    message: "Reset OTP sent to email",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError("All fields are required", 400);
  }

  const otpRecord = await OTP.findOne({ email, purpose: "reset" });

  if (!otpRecord) {
    throw new ApiError("OTP not found", 404);
  }

  if (otpRecord.expiresAt < Date.now()) {
    await OTP.deleteMany({ email, purpose: "reset" });
    throw new ApiError("OTP expired", 400);
  }

  if (otpRecord.otp !== otp) {
    throw new ApiError("Invalid OTP", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  await OTP.deleteMany({ email, purpose: "reset" });

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError("Both passwords required", 400);
  }

  const user = await User.findById(req.user._id);

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    throw new ApiError("Old password incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});
