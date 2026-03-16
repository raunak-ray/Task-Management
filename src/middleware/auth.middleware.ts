import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/AppError.ts";
import { verifyToken } from "../lib/jwtToken.ts";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(401, "Not authorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Token missing");
  }

  const decoded = verifyToken(token);

  req.user = decoded;

  next();
};
