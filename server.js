import express from "express";
import cors from "cors";
import connectMongo from "./config/db.js";
import databaseRoutes from "./routes/databaseRoutes.js";
import logRoutes from "./routes/logRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// connect to Mongo (where we store DB connection configs)
connectMongo();

app.get("/", (req, res) => {
  res.json({ ok: true, message: "DB Monitor Backend running" });
});

app.use("/api/databases", databaseRoutes);
app.use("/api/logs", logRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
