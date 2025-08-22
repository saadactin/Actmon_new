import express from "express";
import { addDatabase, listDatabases, checkStatus } from "../controllers/databaseController.js";

const router = express.Router();

router.post("/add", addDatabase);
router.get("/", listDatabases);
router.get("/check/:id", checkStatus);

export default router;
