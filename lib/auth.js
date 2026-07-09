import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "codenest-secret-key-change-in-production";

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@codenest.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
};
