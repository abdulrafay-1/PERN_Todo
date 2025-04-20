import { Request, Response } from "express"
import { prisma } from "../script"
import { AuthenticatedRequest } from "../types"

export const getAllTodo = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "ID is required" })
        return
    }
    try {
        const todo = await prisma.todo.findMany({
            where: { userId: Number(id) },
        })
        if (!todo) {
            res.status(404).json({ message: "Todo not found" })
            return
        }
        res.json(todo)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const addTodo = async (req: AuthenticatedRequest, res: Response) => {
    const { title } = req.body
    const user = req.user

    if (!user) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    try {
        const todo = await prisma.todo.create({
            data: { title, userId: user.id },
        })
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteTodo = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params
    const user = req.user

    if (!id) {
        res.status(400).json({ message: "ID is required" })
        return
    }

    try {
        const todo = await prisma.todo.delete({
            where: { id: Number(id) },
        })
        res.json(todo)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const editTodo = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params
    const { title } = req.body

    if (!id) {
        res.status(400).json({ message: "ID is required" })
        return
    }

    try {
        const todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title },
        })
        res.json(todo)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}