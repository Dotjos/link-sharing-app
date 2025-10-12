import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import userDataRoutes from "./routes/userData.js";
import cors from "cors"
import pool from "./database.js";

//load env variables
dotenv.config()

const app = express()

//Middleware
app.use(cors())
app.use(express.json())



//Routes
app.use('/userdata', userDataRoutes);
app.use('/auth', authRoutes);

//start server
const PORT = process.env.PORT || 500
app.listen(PORT, ()=>
    console.log(`server running on port ${PORT}`)
)