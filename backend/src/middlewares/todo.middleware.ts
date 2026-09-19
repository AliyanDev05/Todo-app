import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

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

  if (error instanceof Error && error.name === "CastError") {
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
