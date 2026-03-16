import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { sendResponse } from "../lib/sendResponse";

export const registerController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      statusCode: 200,
      message: "User registered successfully",
      data: {},
    });
  },
);

export const loginController = expressAsyncHandler(
  async (req: Request, res: Response) => {},
);
