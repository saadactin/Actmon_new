import Database from "../models/Database.js";
import { checkDatabase } from "../utils/checkDatabase.js";
import { addLog } from "./logController.js";

// Add a new database
export const addDatabase = async (req, res) => {
  try {
    const db = new Database(req.body);
    await db.save();
    res.json({ message: "Database added successfully", db });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all databases
export const listDatabases = async (req, res) => {
  try {
    const dbs = await Database.find().sort({ createdAt: -1 });
    res.json(dbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check status and add log
export const checkStatus = async (req, res) => {
  try {
    const db = await Database.findById(req.params.id);
    if (!db) return res.status(404).json({ error: "Database not found" });

    const result = await checkDatabase(db);
    const status = result.status || "down";

    // Add a log entry
    const message = status === "up" 
      ? "Ping successful" 
      : `Ping failed: ${result.error || "unknown error"}`;
    await addLog(db._id, message, status);

    res.json({
      id: db._id,
      type: db.type,
      host: db.host,
      port: db.port,
      dbName: db.dbName,
      status,
      error: result.error || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
