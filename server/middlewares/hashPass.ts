import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password) {
        res.status(400).json({ error: "Password is required" });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        res.status(500).json({ error: "Error hashing password" });
    }
};
