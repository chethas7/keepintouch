import { OAuth2Client } from "google-auth-library";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    throw new ApiError("Google credential missing", 400);
  }

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub, email, name, picture } = payload;

  let user = await User.findOne({ email });

  // CASE 1: User already exists (manual signup before)
  if (user) {
    // Link google if not linked
    if (!user.googleId) {
      user.googleId = sub;
      user.avatar = picture;
      await user.save();
    }
  } else {
    // CASE 2: New Google user
    user = await User.create({
      name,
      email,
      avatar: picture,
      googleId: sub,
      authProvider: "google",
      isVerified: true,
    });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Logged in with Google",
    token,
    user,
    needsProfileCompletion: !user.dateOfBirth || !user.gender,
  });
});
