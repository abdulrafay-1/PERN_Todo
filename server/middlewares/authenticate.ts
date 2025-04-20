import jwt from "jsonwebtoken";
import { Response, NextFunction, RequestHandler } from "express";
import { User } from "../generated/prisma";
import { AuthenticatedRequest, UserPayload } from "../types";


export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token || req.headers.token;

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
};


