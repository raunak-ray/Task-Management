import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { sendResponse } from "../lib/sendResponse.ts";
import { AppError } from "../lib/AppError.ts";
import { User } from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwtToken.ts";

export const registerController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      throw new AppError(400, "All fields are required");
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new AppError(400, "Invalid email address");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError(409, "User already exists");
    }

    // Password rule
    if (password.length < 8) {
      throw new AppError(400, "Password must be at least 8 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  },
);

export const loginController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, "All fields are required");
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError(401, "Invalid credentials");
    }

    // Generate JWT token for authenticated user
    const token = generateToken(user._id.toString(), user.role);

    sendResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  },
);