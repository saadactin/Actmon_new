import { useState, useEffect } from "react";
import api from "../api/axios";
import "./PerformanceMetrics.css"
export default function PerformanceMetrics() {
  const [databases, setDatabases] = useState([]);
  const [selectedDb, setSelectedDb] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const res = await api.get("/databases");
        setDatabases(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDatabases();
  }, []);

  const handleSelectDb = async (db) => {
    setSelectedDb(db);
    setLoading(true);
    try {
      const res = await api.get(`/performance/${db._id}`);
      setMetrics(res.data.metrics);
    } catch (err) {
      console.error(err);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Performance Metrics</h1>

      <div className="performance-container">
        <div className="db-list">
          <h2>Databases</h2>
          <ul>
            {databases.map((db) => (
              <li key={db._id}>
                <button onClick={() => handleSelectDb(db)}>
                  {db.dbName} ({db.type})
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="metrics-display">
          {loading && <p>Loading metrics...</p>}
          {!loading && metrics && (
            <div>
              <h2>{selectedDb.dbName} Metrics</h2>
              <p>CPU Usage: {metrics.cpuUsagePercent}%</p>
              <p>Memory Usage: {metrics.memoryUsagePercent}%</p>
              <p>Network Latency: {metrics.networkLatencyMs ?? "N/A"} ms</p>
            </div>
          )}
          {!loading && !metrics && <p>Select a database to view metrics.</p>}
        </div>
      </div>
    </div>
  );
}
