import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request & { error?: Error },
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    const baseLog = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    if (res.statusCode >= 400) {
      console.error(
        `[ERROR] ${baseLog} | ${req.error?.message ?? "Unknown error"}`,
      );
    } else {
      console.log(`[SUCCESS] ${baseLog}`);
    }
  });

  next();
};
