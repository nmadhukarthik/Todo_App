import express from "express"
import { login, logout, signup } from "../Controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/signup", signup)
         .post("/login", login)
         .get("/logout", logout)

export default userRouter