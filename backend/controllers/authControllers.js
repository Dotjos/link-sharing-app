import bcrypt from "bcrypt";
import db from "../database.js"
import crypto from "crypto";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);


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
  // (your login logic, but add a check for is_verified)
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    if (!user.is_verified) {
      return res.status(401).json({ error: "Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
