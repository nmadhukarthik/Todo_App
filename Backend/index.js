import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import todoRouter from "./Routes/todoRoute.js"
import userRouter from "./Routes/userRoute.js"
 

dotenv.config()
const PORT = process.env.PORT 
const URL  = process.env.MONGO_URI
const app = express()

//mongodb connection
try {
    await mongoose.connect(URL)
    console.log("Connected to mongoDB")
} catch (error) {
    console.log(error)
}


//middlewares and routes
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
    })
  );
app.use(cookieParser())
app.use(express.json())
app.use("/todo", todoRouter)
app.use("/user", userRouter)


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})