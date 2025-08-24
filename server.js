import express from "express";
import cors from "cors";
import connectMongo from "./config/db.js";
import databaseRoutes from "./routes/databaseRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import { createAdmin } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ ADD THIS LINE
import userRoutes from "./routes/userRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// connect to Mongo (where we store DB connection configs)
connectMongo();
createAdmin(); // create admin if not exists

app.get("/", (req, res) => {
  res.json({ ok: true, message: "DB Monitor Backend running" });
});

app.use("/api/databases", databaseRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // ✅ must match /api/users/create
app.use("/api/stats", statsRoutes);
app.use("/api/performance", performanceRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
