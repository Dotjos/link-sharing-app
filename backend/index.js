import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import userDataRoutes from "./routes/userData.js";
import cors from "cors"
// import pool from "./database.js";

//load env variables
dotenv.config()

const app = express()

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//Routes
app.use('/userdata', userDataRoutes);
app.use('/auth', authRoutes);

//start server
const PORT = process.env.PORT || 500
app.listen(PORT, ()=>
    console.log(`server running on port ${PORT}`)
)