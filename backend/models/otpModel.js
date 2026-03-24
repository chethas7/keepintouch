import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  otp: String,
  purpose: String, // signup or reset
  expiresAt: Date,
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
