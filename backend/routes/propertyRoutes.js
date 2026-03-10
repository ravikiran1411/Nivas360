import express from "express";
import { getAllProperties, getAllCities } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/all", getAllProperties);

router.get("/cities", getAllCities);

export default router;