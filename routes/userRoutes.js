import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { createUser, listUsers } from "../controllers/userController.js";

const router = express.Router();

// Only admin can create users
router.post("/create", protect, admin, createUser);

// List all users (optional, admin only)
router.get("/", protect, admin, listUsers);

export default router;
