import express from "express";
import ownerAuth from "../middleware/ownerAuth.js";
import upload from "../middleware/multer.js";

import {addProperty,listProperties,updateProperty,removeProperty,getAllProperties,getAllCities} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/add",ownerAuth,upload.array("images",5), addProperty);

router.get("/my-properties",ownerAuth, listProperties);

router.post("/update",ownerAuth, updateProperty);

router.post("/delete",ownerAuth, removeProperty);

router.get("/all", getAllProperties);

router.get("/cities", getAllCities);

export default router;