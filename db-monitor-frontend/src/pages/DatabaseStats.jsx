import { useEffect, useState } from "react";
import api from "../api/axios";
import "./stats.css";

export default function DatabaseStats() {
  const [databases, setDatabases] = useState([]);
  const [selectedDb, setSelectedDb] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all databases
  const fetchDatabases = async () => {
    try {
      const res = await api.get("/databases");
      setDatabases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch stats for selected DB
  const fetchStats = async (id) => {
    setLoading(true);
    setStats(null);
    setSelectedDb(id);
    try {
      const res = await api.get(`/stats/${id}`);
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabases();
  }, []);

  return (
    <div className="stats-container">
      <h1>Database Statistics</h1>
      <div className="db-list">
        <h2>Databases</h2>
        <ul>
          {databases.map((db) => (
            <li key={db._id}>
              <button
                className={`db-btn ${selectedDb === db._id ? "active" : ""}`}
                onClick={() => fetchStats(db._id)}
              >
                {db.dbName} ({db.type})
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="db-stats">
        <h2>Latest Stats</h2>
        {loading && <p>Loading...</p>}
        {!loading && stats && (
          <div className="stats-card">
            <p><strong>Database:</strong> {stats.dbName}</p>
            {stats.type === "mysql" ? (
              <>
                <p><strong>Tables:</strong> {stats.tableCount}</p>
                <p><strong>Rows:</strong> {stats.rowsCount}</p>
                <p><strong>Size:</strong> {(stats.sizeBytes / 1024 / 1024).toFixed(2)} MB</p>
              </>
            ) : (
              <>
                <p><strong>Collections:</strong> {stats.collectionCount}</p>
                <p><strong>Documents:</strong> {stats.documentsCount}</p>
                <p><strong>Size:</strong> {(stats.sizeBytes / 1024 / 1024).toFixed(2)} MB</p>
                <p><strong>Indexes:</strong> {stats.indexesCount}</p>
              </>
            )}
          </div>
        )}
        {!loading && !stats && <p>Select a database to view statistics.</p>}
      </div>
    </div>
  );
}
