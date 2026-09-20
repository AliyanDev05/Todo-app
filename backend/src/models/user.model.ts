import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: {
        url: {
          type: String,
          default: "https://placehold.co/200x200",
        },
        localPath: {
          type: String,
          default: "",
        },
      },
      default: {
        url: "https://placehold.co/200x200",
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: [100, "only 100 characters allowed"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    fullName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
