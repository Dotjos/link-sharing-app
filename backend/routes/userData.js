import express from "express";
import { getUserLinks, saveUserLinks } from "../routes/controllers/userDataController.js";

const router = express.Router();

router.post("/links", saveUserLinks);
router.get("/links/:userId", getUserLinks);

export default router;