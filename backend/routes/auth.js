import express from "express"
import { login, signUp, verifyAccount } from "../controllers/authControllers.js"
const router= express.Router()

  //signup
router.post("/signup",signUp)

  // ---------- Login ----------
router.post("/login",login)

//verify
router.get("/verify",verifyAccount)

export default router