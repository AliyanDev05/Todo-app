import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "validation error",
      error: error.issues,
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      errors: error.errors,
      data: error.data,
    });
    return;
  }

  if (error instanceof Error && mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid Id",
    });
    return;
  }

  console.error(error);
  res.status(500).json({
    success: false,
    message: "internal server error",
  });
};
