import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthPayload {
  userId: string;
  role: string;
}

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId: userId, role: role }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): AuthPayload => {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
};
