import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import pool from "./database.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

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

// Example protected route
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    // req.user.id was set by the middleware
    const { rows } = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.id]);
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

//start server
const PORT = process.env.PORT || 500
app.listen(PORT, ()=>
    console.log(`server running on port ${PORT}`)
)