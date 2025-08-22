import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = "YOUR_SECRET_KEY";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};

// Only admin
export const admin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};
