import { useState } from "react";
import api from "../api/axios";
import './AddUser.css'; // import the CSS file

export default function AddUser() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/users/create", form);
      setMsg(res.data.message);
      setForm({ username: "", password: "", role: "user" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="add-user-container">
      <h1>Add New User</h1>
      {msg && <p className="msg">{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
