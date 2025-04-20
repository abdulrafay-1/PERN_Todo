import { Request, Response } from "express";
import { prisma } from "../script";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const exist = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (exist) {
            res.json({ error: "User with email already exists" });
            return;
        }

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password,
            },
        });

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.cookie("token", token).json({
            message: "User created successfully",
            user,
            token,
        });
    } catch (e) {
        res.status(500).json({
            error: "Internal server error",
            e,
        });
    }
}
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        })
        if (!user) {
            res.status(400).json({ error: "User not found" })
            return
        }
        const isMatch = await bcrypt.compare(password, user.password,);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid password" })
            return
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables")
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", // or "None" with HTTPS
        })
        res.json({
            message: "Login successful !",
            user,
            token,
        })
    } catch (e) {
        res.status(500).json({
            error: "Internal server error",
            e,
        })
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token")
        res.json({
            message: "Logout successful !",
        })
    } catch (e) {
        res.status(500).json({
            error: "Internal server error",
            e,
        })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findMany({})

        res.json({
            message: 'All Users',
            user
        })
    } catch (error) {
        res.json(error)
    }
}