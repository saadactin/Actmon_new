import "./Navbar.css"
export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">DB Monitor</h1>
      <div className="navbar-links">
        <a href="/" className="navbar-link">Dashboard</a>
                <a href="/logs" className="navbar-link">Logs</a>

        <a href="/add" className="navbar-link">Add DB</a>
      </div>
    </nav>
  );
}
