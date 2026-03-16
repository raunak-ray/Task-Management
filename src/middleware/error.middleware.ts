import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/AppError";

export const errorMiddleware = (
  err: Error | AppError,
  req: Request & { error?: Error },
  res: Response,
  next: NextFunction,
) => {
  req.error = err;

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
