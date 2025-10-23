import bcrypt from "bcrypt";
import db from "../database.js"
import crypto from "crypto";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const resend = new Resend(process.env.RESEND_API_KEY);

dotenv.config();

export async function signUp(req, res) {
  const {  email, password } = req.body;
  try {
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];

      if (user.is_verified) {
        return res.status(409).json(
          { error: "This email is already registered." }
        );
      } else {
        // User exists but not verified → resend verification email
        const verificationToken = crypto.randomUUID();

        await db.query(
          "UPDATE users SET verification_token=$1 WHERE email=$2",
          [verificationToken, email]
        );

        const verificationLink = `http://localhost:5173/auth/verify?email=${email}&token=${verificationToken}`;
        await resend.emails.send({
          from: "Your App <onboarding@resend.dev>",
          to: email,
          subject: "Verify your account",
          html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
        });

        return res.status(200).json({
          success: true,
          message: "Account already exists but is not verified. A new verification email has been sent.",
        });
      }
    }

    // New user → insert and send verification email
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();

    await db.query(
      "INSERT INTO users (email, password_hash, verification_token, is_verified) VALUES ($1, $2, $3, $4)",
      [ email, passwordHash, verificationToken, false]
    );

    const verificationLink = `http://localhost:5173/auth/verify?email=${email}&token=${verificationToken}`;
    await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Verify your account",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

export async function verifyAccount(req, res) {
  const { email, token } = req.query;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found." });
    }

    const user = result.rows[0];

    // ✅ Already verified
    if (user.is_verified) {
      return res.json({ message: "Email is already verified." });
    }

    // ❌ Token mismatch or missing
    if (!user.verification_token || user.verification_token !== token) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    // ✅ Token valid → Verify user
    await db.query(
      "UPDATE users SET is_verified=true, verification_token=null WHERE email=$1",
      [email]
    );

    return res.json({ message: "Email verified successfully." });

  } catch (err) {
    console.error("Verification error:", err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) 
      return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    if (!user.is_verified)
      return res.status(401).json({ error: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

     // Generate access + refresh tokens
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
        process.env.JWT_SECRET,
      { expiresIn: "1h" } // ⏱️ expires in 1 minute (for testing)
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Optional: store refreshToken in DB if you want revocation support
    await db.query("UPDATE users SET refresh_token=$1 WHERE id=$2", [refreshToken, user.id]);

    // Send refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite:"lax",
      path:"/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCurrentUser(req, res) {
  try {
    const result = await db.query("SELECT id, email FROM users WHERE id = $1", [req.user.id]);
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
}

export async function refreshToken(req, res) {
  console.log("Cookies received:", req.cookies);
  const token = req.cookies.refreshToken;
  console.log(token);
  if (!token) return res.status(401).json({ error: "No refresh token provided" });
  console.log(token);
  try {
    // Verify refresh token
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Optional: verify it matches the one stored in DB (extra security)
    const result = await db.query("SELECT refresh_token FROM users WHERE id=$1", [decoded.id]);
    const savedToken = result.rows[0]?.refresh_token;
    if (savedToken !== token) return res.status(403).json({ error: "Invalid refresh token" });

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    console.error("Token refresh error:", err);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
}
