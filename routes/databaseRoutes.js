import express from "express";
import { addDatabase, listDatabases, checkStatus } from "../controllers/databaseController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Only admin can add
router.post("/add", protect, admin, addDatabase);

// Everyone can list
router.get("/", protect, listDatabases);

// Everyone can check status
router.get("/check/:id", protect, checkStatus);

export default router;
