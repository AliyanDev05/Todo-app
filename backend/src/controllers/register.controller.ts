import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/async-handler.js";
import { registerValidation } from "../validation/auth.validation.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = registerValidation.parse(req.body);

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409, "user with this email or username already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const userCreated = await User.findById(user._id).select("-password");

  const response = new ApiResponse(
    201,
    { user: userCreated },
    "new user created successfully",
  );

  return res.status(response.statusCode).json(response);
});
