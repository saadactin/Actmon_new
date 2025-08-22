import User from "../models/User.js";

// Create new user
export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already exists" });

    const user = new User({ username, password, role });
    await user.save();
    res.json({ message: "User created successfully", user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all users (optional)
export const listUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
