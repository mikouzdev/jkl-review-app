import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("Missing JWT_SECRET env var");

export const generateToken = (payload: object) => jwt.sign(payload, secret, { expiresIn: "1h" });

export const verifyToken = (token: string) => jwt.verify(token, secret);
