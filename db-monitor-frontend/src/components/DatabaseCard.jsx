export default function DatabaseCard({ db }) {
  return (
    <div className="db-card">
      <div className="db-card-header">
        <h2>{db.dbName}</h2>
        <span className={`status-indicator ${db.status === "up" ? "up" : db.status === "down" ? "down" : "unknown"}`}></span>
      </div>
      <div className="db-card-body">
        <p><strong>Type:</strong> {db.type}</p>
        <p><strong>Host:</strong> {db.host}:{db.port}</p>
        <p><strong>Status:</strong> <span className="status-text">{db.status || "unknown"}</span></p>
      </div>
    </div>
  );
}
