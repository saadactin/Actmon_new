import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./AddDatabase.css"; // import the new CSS

export default function AddDatabase() {
  const [form, setForm] = useState({ type: "mysql", host: "", port: "", username: "", password: "", dbName: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/databases/add", form);
      setMsg("Database added successfully!");
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.error || "Error adding DB");
    }
  }

  return (
    <div className="add-db-container">
      <h1 className="add-db-title">Add New Database</h1>
      {msg && <p className="add-db-msg">{msg}</p>}
      <form onSubmit={handleSubmit} className="add-db-form">
        <select name="type" value={form.type} onChange={handleChange} className="add-db-input">
          <option value="mysql">MySQL</option>
          <option value="mongo">MongoDB</option>
        </select>
        <input type="text" name="host" placeholder="Host" onChange={handleChange} className="add-db-input" required />
        <input type="number" name="port" placeholder="Port" onChange={handleChange} className="add-db-input" required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="add-db-input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="add-db-input" />
        <input type="text" name="dbName" placeholder="Database Name" onChange={handleChange} className="add-db-input" required />
        <button type="submit" className="add-db-button">Add Database</button>
      </form>
    </div>
  );
}
