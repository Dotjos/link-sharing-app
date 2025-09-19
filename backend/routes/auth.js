import express from "express"
import pool from "../database.js"
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router= express.Router()
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Helper: simple input check (you can replace with a schema validator later)
function validateSignup({ name, email, password }) {
    if (!name || !email || !password) return 'name, email and password are required';
    // add more checks (password length, email format) as needed
    return null;
  }


  //signup
  router.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body

    //basic validation to avoid garbage DB writes
    const validationError = validateSignup({name,email,password})
    if (validationError) return res.status(400).json({error:validationError})

      try{
    // Why: hash the password BEFORE storing it. We never store plaintext passwords.
    // 10 salt rounds is a good default (balance of security vs CPU).
     const hashedPassword = await bycrypt.hash(password,10)

     // Why: parameterized query ($1, $2, $3) prevents SQL injection.
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );

    // Why: return the created user (without password). HTTP 201 indicates resource created.
    return res.status(201).json({ user: result.rows[0] });
      }catch(err){
        if (err.code === '23505') {
          return res.status(409).json({ error: 'Email already in use' }); // 409 Conflict
        }
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
  })

  // ---------- Login ----------
router.post("/login", async(req,res)=>{
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    // Why: parameterized select; we need hashed password to compare
    const userResult = await pool.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    // Why: compare provided password with stored hashed password
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // Why: create a JWT so client can authenticate future requests
    const payload = { id: user.id }; // minimal payload — avoid putting sensitive data in token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Why: respond with token and user info (without password). Client stores token (see security note).
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
})

export default router