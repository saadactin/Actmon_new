import mongoose from "mongoose";

const DatabaseSchema = new mongoose.Schema({
  type: { type: String, enum: ["mysql", "mongo"], required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  username: { type: String },
  password: { type: String },
  dbName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Database", DatabaseSchema);
