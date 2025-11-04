import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import type { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: { userId: number, username: string, role: string }
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send({ error: "missing token" })

    try {
        const decodedToken = verifyToken(token) as JwtPayload
        req.user = {
            userId: decodedToken.userId,
            username: decodedToken.username,
            role: decodedToken.role
        };
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send("Invalid token")
    }
}