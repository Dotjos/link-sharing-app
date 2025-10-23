import express from "express"
import { getCurrentUser, login, refreshToken, signUp, verifyAccount } from "../controllers/authControllers.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
const router= express.Router()

  //signup
router.post("/signup",signUp)

  // ---------- Login ----------
router.post("/login",login)

  //verify
router.get("/verify",verifyAccount)

  //getCurrentUser
router.get("/me",authenticateToken,getCurrentUser)

//logout
router.post("/refresh", refreshToken); // ✅ NEW endpoint

export default router;