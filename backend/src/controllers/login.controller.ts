import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/apiError.js";
import { loginValidation } from "../validation/auth.validation.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = loginValidation.parse(req.body);
  if (!email) {
    throw new ApiError(400, "email is required");
  }
  const existedUser = await User.findOne({ email }).select("+password");
  if (!existedUser) {
    throw new ApiError(404, "kindly register first");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password is not valid");
  }

  const loggedInUser = await User.findById(existedUser._id).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        existedUser: loggedInUser,
      },
      "user log In successfully",
    ),
  );
});
