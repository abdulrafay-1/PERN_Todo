import Router from "express"
import { authenticate } from "../middlewares/authenticate"
import { getAllTodo, addTodo, deleteTodo, editTodo } from "../controllers/todo.controller"

const route = Router()

route.get("/todos", authenticate, getAllTodo)
route.post("/todo", authenticate, addTodo)
route.delete("/todo/:id", deleteTodo,)
route.put("/todo/:id", editTodo,)

export default route