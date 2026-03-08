import express from "express";
import {loginUser,registerUser,forgotPassword,verifyOtp,resetPassword,getProfile} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/profile", userAuth, getProfile);


export default router;
