import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {adminLogin,getPendingRequests,getApprovedRequests,approveRequest,rejectRequest,listOwners,removeOwner,getDashboardStats} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/pending", adminAuth, getPendingRequests);
router.get("/approved", adminAuth, getApprovedRequests);

router.post("/approve", adminAuth, approveRequest);
router.post("/reject", adminAuth, rejectRequest);

router.get("/owners", adminAuth, listOwners);
router.post("/remove-owner", adminAuth, removeOwner);
router.get("/stats", adminAuth, getDashboardStats);



export default router;
