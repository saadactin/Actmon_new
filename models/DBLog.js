import mongoose from "mongoose";

const DBLogSchema = new mongoose.Schema({
  database: { type: mongoose.Schema.Types.ObjectId, ref: "Database", required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["up", "down"], required: true },
}, { timestamps: true });

export default mongoose.model("DBLog", DBLogSchema);
