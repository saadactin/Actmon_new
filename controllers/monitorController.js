import Database from "../models/Database.js";
import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";

export const getTop5Rows = async (req, res) => {
  try {
    const dbConfig = await Database.findById(req.params.id);
    if (!dbConfig) return res.status(404).json({ error: "Database not found" });

    const tableOrCollection = req.query.table; // table name for MySQL, collection for Mongo
    if (!tableOrCollection) return res.status(400).json({ error: "Table/Collection name is required" });

    if (dbConfig.type === "mysql") {
      const conn = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.dbName,
      });

      const [rows] = await conn.query(`SELECT * FROM \`${tableOrCollection}\` LIMIT 5`);
      await conn.end();
      return res.json({ type: "mysql", dbName: dbConfig.dbName, table: tableOrCollection, rows });

    } else if (dbConfig.type === "mongo") {
      const creds = dbConfig.username ? `${encodeURIComponent(dbConfig.username)}:${encodeURIComponent(dbConfig.password)}@` : "";
      const uri = `mongodb://${creds}${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
      await client.connect();

      const collection = client.db(dbConfig.dbName).collection(tableOrCollection);
      const rows = await collection.find({}).limit(5).toArray();
      await client.close();

      return res.json({ type: "mongo", dbName: dbConfig.dbName, collection: tableOrCollection, rows });
    }

    res.status(400).json({ error: "Unsupported database type" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
