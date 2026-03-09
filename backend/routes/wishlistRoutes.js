import express from "express";
import userAuth from "../middleware/userAuth.js";
import {addToWishlist,removeFromWishlist,getWishlist} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", userAuth, addToWishlist);
router.post("/remove", userAuth, removeFromWishlist);
router.get("/", userAuth, getWishlist);

export default router;