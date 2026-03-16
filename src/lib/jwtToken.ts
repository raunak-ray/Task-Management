import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthPayload {
  id: string;
  role: string;
}

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role: role }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): AuthPayload => {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
};
