import express from "express";
import { getLogsByDatabase, getAllDatabases } from "../controllers/logController.js";

const router = express.Router();

router.get("/databases", getAllDatabases);
router.get("/:id", getLogsByDatabase);

export default router;
