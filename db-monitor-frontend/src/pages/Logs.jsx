import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Logs.css";

export default function Logs() {
  const [databases, setDatabases] = useState([]);
  const [selectedDB, setSelectedDB] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all databases
  const fetchDatabases = async () => {
    try {
      const res = await api.get("/logs/databases");
      setDatabases(res.data);
    } catch (err) {
      console.error("Error fetching databases:", err);
    }
  };

  // Fetch latest 5 logs for selected DB
  const fetchLogs = async (dbId) => {
    setSelectedDB(dbId);
    setLoading(true);
    try {
      const res = await api.get(`/logs/${dbId}`);
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabases();
  }, []);

  return (
    <div className="logs-container">
      <h1 className="logs-title">Database Logs</h1>
      <div className="logs-content">
        <div className="logs-db-list">
          <h2>Databases</h2>
          {databases.map(db => (
            <div
              key={db._id}
              className={`db-item ${selectedDB === db._id ? "selected" : ""}`}
              onClick={() => fetchLogs(db._id)}
            >
              {db.dbName} ({db.type})
            </div>
          ))}
        </div>
        <div className="logs-table">
          <h2>Latest 5 Logs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : logs.length === 0 ? (
            <p>No logs found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Message</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log._id}>
                    <td className={log.status === "up" ? "status-up" : "status-down"}>{log.status}</td>
                    <td>{log.message}</td>
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
