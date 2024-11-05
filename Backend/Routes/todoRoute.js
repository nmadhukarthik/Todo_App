import express from "express"
import { createTodo, deleteTodo, getTodo, updateTodo } from "../Controllers/todoController.js"
import { autenticate } from "../Middlewares/Authorization.js"

const todoRouter = express.Router()

todoRouter.post("/create", autenticate, createTodo)
          .get("/fetchTodos", autenticate, getTodo)
          .put("/update/:id", autenticate, updateTodo)
          .delete("/delete/:id", autenticate, deleteTodo)

export default todoRouter