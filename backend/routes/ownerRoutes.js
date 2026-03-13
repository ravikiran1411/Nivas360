import express from "express";
import userAuth from "../middleware/userAuth.js";
import ownerAuth from "../middleware/ownerAuth.js";
import upload from "../middleware/multer.js";

import {addProperty,updateProperty,removeProperty,listProperties} from "../controllers/propertyController.js";

import {requestOwnerPermission,getOwnerRequestStatus} from "../controllers/ownerController.js";

const router = express.Router();

router.post("/request",userAuth,upload.single("document"),requestOwnerPermission);

router.post("/add-property",userAuth,ownerAuth,upload.array("images", 6),addProperty);

router.post("/update-property",userAuth,ownerAuth,upload.array("images",6),updateProperty);

router.post("/remove-property",userAuth,ownerAuth,removeProperty);

router.get("/properties",userAuth,ownerAuth,listProperties);

router.get("/status", userAuth, getOwnerRequestStatus);

export default router;