import express from "express";
import { getDatabaseStats } from "../controllers/statsController.js";

const router = express.Router();

// GET /api/stats/:id
router.get("/:id", getDatabaseStats);

export default router;
