import express from "express";
import { getUserLinks, saveUserLinks, updateUserProfile, uploadProfileImage } from "../routes/controllers/userDataController.js";
import upload from "../middleware/uploadFile.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/links", saveUserLinks);
router.get("/links/:userId", getUserLinks);
//upload profile image route

router.post("/upload-profile",authenticateToken,upload.single("image"),uploadProfileImage)

router.patch("/update-profile/",authenticateToken, updateUserProfile);

export default router;