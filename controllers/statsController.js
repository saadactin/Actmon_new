import Database from "../models/Database.js";
import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";

export const getDatabaseStats = async (req, res) => {
  try {
    const dbConfig = await Database.findById(req.params.id);
    if (!dbConfig) return res.status(404).json({ error: "Database not found" });

    if (dbConfig.type === "mysql") {
      const conn = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.dbName,
      });

      // Get all tables
      const [tables] = await conn.query("SHOW TABLE STATUS");
      const tableCount = tables.length;
      const rowsCount = tables.reduce((sum, t) => sum + t.Rows, 0);
      const dataSize = tables.reduce((sum, t) => sum + t.Data_length + t.Index_length, 0);

      await conn.end();

      res.json({
        type: "mysql",
        dbName: dbConfig.dbName,
        tableCount,
        rowsCount,
        sizeBytes: dataSize,
      });

    } else if (dbConfig.type === "mongo") {
      const creds = dbConfig.username ? `${encodeURIComponent(dbConfig.username)}:${encodeURIComponent(dbConfig.password)}@` : "";
      const uri = `mongodb://${creds}${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

      await client.connect();
      const db = client.db(dbConfig.dbName);
      const collections = await db.listCollections().toArray();

      let docCount = 0;
      for (const coll of collections) {
        const count = await db.collection(coll.name).countDocuments();
        docCount += count;
      }

      // Get database stats
      const stats = await db.command({ dbStats: 1 });
      await client.close();

      res.json({
        type: "mongo",
        dbName: dbConfig.dbName,
        collectionCount: collections.length,
        documentsCount: docCount,
        sizeBytes: stats.storageSize,
        indexesCount: stats.indexes,
      });
    } else {
      res.status(400).json({ error: "Unsupported database type" });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
