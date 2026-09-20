import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("User", userSchema);
