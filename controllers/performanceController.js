import os from "os";
import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";
import ping from "ping";
import Database from "../models/Database.js";

export const getPerformanceMetrics = async (req, res) => {
  try {
    const dbId = req.params.dbId;
    const dbConfig = await Database.findById(dbId);
    if (!dbConfig) return res.status(404).json({ error: "Database not found" });

    let hostIP = dbConfig.host;

    // Network latency (ping)
    let latency = null;
    try {
      const pingRes = await ping.promise.probe(hostIP, { timeout: 2 });
      latency = pingRes.time; // ms
    } catch (err) {
      latency = null;
    }

    // CPU Usage (average load %)
    const cpus = os.cpus();
    const cpuLoad = cpus.reduce((acc, cpu) => {
      const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
      const idle = cpu.times.idle;
      return acc + (1 - idle / total);
    }, 0) / cpus.length * 100;

    // Memory usage
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsage = (usedMem / totalMem) * 100;

    // Disk usage (basic: only root / partition, using node-os-utils if needed)
    // For now, let's skip disk details for simplicity

    res.json({
      dbName: dbConfig.dbName,
      type: dbConfig.type,
      host: dbConfig.host,
      metrics: {
        cpuUsagePercent: cpuLoad.toFixed(2),
        memoryUsagePercent: memUsage.toFixed(2),
        networkLatencyMs: latency
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
