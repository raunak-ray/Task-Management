import { Response } from "express";

interface SendResponseOptions {
  statusCode?: number;
  message?: string;
  data?: any;
}

export const sendResponse = (
  res: Response,
  { statusCode = 200, message = "Success", data = null }: SendResponseOptions,
) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};
