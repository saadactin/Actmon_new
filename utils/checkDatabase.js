import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";

export const checkDatabase = async (db) => {
  try {
    if (db.type === "mysql") {
      const conn = await mysql.createConnection({
        host: db.host,
        port: db.port,
        user: db.username,
        password: db.password,
        database: db.dbName,
      });
      await conn.query("SELECT 1");
      await conn.end();
      return { status: "up" };
    } else if (db.type === "mongo") {
      const creds = db.username ? `${encodeURIComponent(db.username)}:${encodeURIComponent(db.password)}@` : "";
      const uri = `mongodb://${creds}${db.host}:${db.port}/${db.dbName}`;
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
      await client.connect();
      await client.db(db.dbName).command({ ping: 1 });
      await client.close();
      return { status: "up" };
    }
    return { status: "down" };
  } catch (err) {
    return { status: "down", error: err.message };
  }
};
