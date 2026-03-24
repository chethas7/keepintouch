import jwt from "jsonwebtoken";
import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import { sendOTP } from "../config/nodeMailer.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const sendSignupOTP = asyncHandler(async (req, res) => {
  const { name, email, password, gender, dateOfBirth } = req.body;

  if (!name || !email || !password || !gender || !dateOfBirth) {
    throw new ApiError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError("User already exists", 400);
  }

  const otp = generateOTP();

  const hashedPassword = await bcrypt.hash(password, 10);

  await OTP.deleteMany({ email });

  await OTP.create({
    name,
    email,
    password: hashedPassword,
    otp,
    gender,
    dateOfBirth,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  await sendOTP(email, otp);

  res.status(200).json({
    success: true,
    message: "OTP sent to email",
  });
});

export const verifySignupOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError("Email and OTP are required", 400);
  }

  const otpRecord = await OTP.findOne({ email });

  if (!otpRecord) {
    throw new ApiError("OTP not found", 404);
  }

  if (otpRecord.expiresAt < Date.now()) {
    await OTP.deleteMany({ email });
    throw new ApiError("OTP expired", 400);
  }

  if (otpRecord.otp !== otp) {
    throw new ApiError("Invalid OTP", 400);
  }

  const user = await User.create({
    name: otpRecord.name,
    email: otpRecord.email,
    password: otpRecord.password,
    isVerified: true,
    gender: otpRecord.gender,
    dateOfBirth: otpRecord.dateOfBirth,
  });

  await OTP.deleteMany({ email });

  res.status(201).json({
    success: true,
    message: "Signup successful",
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("Email and password required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (!user.isVerified) {
    throw new ApiError("Please verify email first", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError("Invalid credentials", 400);
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
});
