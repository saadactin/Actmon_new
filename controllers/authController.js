import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "YOUR_SECRET_KEY"; // replace with env variable in production

// Create initial admin user (run once)
export const createAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) return;
  const admin = new User({ username: "admin", password: "admin123", role: "admin" });
  await admin.save();
  console.log("Admin created: username=admin, password=admin123");
};

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, username: user.username, role: user.role });
};
