import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import pool from "./database.js";

//load env variables
dotenv.config()

const app = express()

//Middleware
app.use(cors())
app.use(express.json())

//Test route to check DB conection
app.get("/db-test", async (req,res)=>{
    try{
        const result = await pool.query('SELECT NOW()')
        res.json({ success: true, time: result.rows[0] });
    }catch(err){
        console.error(err)
        res.status(500).json({ success: false, error: err.message });
    }
})

app.use('/auth', authRoutes);

//start server
const PORT = process.env.PORT || 500
app.listen(PORT, ()=>
    console.log(`server running on port ${PORT}`)
)