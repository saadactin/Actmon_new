import express from "express";
import { getTop5Rows } from "../controllers/monitorController.js";

const router = express.Router();

// GET /api/monitor/:id?table=employees
router.get("/:id", getTop5Rows);

export default router;
