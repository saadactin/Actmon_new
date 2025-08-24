import express from "express";
import { getPerformanceMetrics } from "../controllers/performanceController.js";

const router = express.Router();

// GET /api/performance/:dbId
router.get("/:dbId", getPerformanceMetrics);

export default router;
