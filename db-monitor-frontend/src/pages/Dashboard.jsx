import { useEffect, useState } from "react";
import api from "../api/axios";
import DatabaseCard from "../components/DatabaseCard";
import "./Dashboard.css"; // import the new CSS

export default function Dashboard() {
  const [databases, setDatabases] = useState([]);

  const fetchDatabases = async () => {
    try {
      const res = await api.get("/databases");
      const dbs = res.data.map(db => ({ ...db, status: null }));
      setDatabases(dbs);
    } catch (err) {
      console.error("Error fetching databases:", err);
    }
  };

  const checkStatus = async (id) => {
    try {
      const res = await api.get(`/databases/check/${id}`);
      setDatabases(prev =>
        prev.map(db => db._id === id ? { ...db, status: res.data.status } : db)
      );
    } catch (err) {
      setDatabases(prev =>
        prev.map(db => db._id === id ? { ...db, status: "down" } : db)
      );
    }
  };

  const checkAllStatuses = async () => {
    databases.forEach(db => checkStatus(db._id));
  };

  useEffect(() => {
    fetchDatabases();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDatabases(prev => {
        prev.forEach(db => checkStatus(db._id));
        return [...prev];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Database Monitoring</h1>
      <div className="database-grid">
        {databases.map(db => (
          <DatabaseCard key={db._id} db={db} />
        ))}
      </div>
    </div>
  );
}
