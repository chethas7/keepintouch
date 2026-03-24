import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import ApiError from "../utils/apiError.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError("Not authorized, no token", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id).select("-password");

  next();
});

export default protect;
