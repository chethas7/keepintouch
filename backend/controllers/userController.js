import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/apiError.js";

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  user.name = req.body.name || user.name;
  user.gender = req.body.gender || user.gender;
  user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated",
    user,
  });
});
