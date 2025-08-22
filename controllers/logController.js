import DBLog from "../models/DBLog.js"; // this works now

export const addLog = async (databaseId, message, status) => {
  try {
    const log = new DBLog({ database: databaseId, message, status });
    await log.save();
    return log;
  } catch (err) {
    console.error("Error adding log:", err);
  }
};

export const getLogsByDatabase = async (req, res) => {
  try {
    const logs = await DBLog.find({ database: req.params.id })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDatabases = async (req, res) => {
  try {
    const Database = (await import("../models/Database.js")).default;
    const dbs = await Database.find().sort({ createdAt: -1 });
    res.json(dbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
