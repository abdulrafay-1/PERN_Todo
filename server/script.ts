import { PrismaClient } from "./generated/prisma";
import express from "express"
import cors from "cors"
import userRoutes from './routes/user.routes'
import todoRoutes from './routes/todo.routes'
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // ✅ this is important
}))
app.use(cookieParser())

app.use("/api/v1", userRoutes)
app.use("/api/v1", todoRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(5000, () => {
    console.log("Server is running of port 3000 ⚙")
})

export const prisma = new PrismaClient()
