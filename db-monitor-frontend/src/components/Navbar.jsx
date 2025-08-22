import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './Navbar.css'; // import the CSS file

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">DB Monitor</h1>

        {user && (
          <>
            <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              
              <Link 
                to="/logs" 
                className={location.pathname === '/logs' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Logs
              </Link>

              {/* Stats accessible to all logged-in users */}
              <Link 
                to="/stats"
                className={location.pathname === '/stats' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Stats
              </Link>

              {user.role === "admin" && (
                <>
                  <Link 
                    to="/add" 
                    className={location.pathname === '/add' ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Add DB
                  </Link>
                  <Link 
                    to="/add-user" 
                    className={location.pathname === '/add-user' ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Add User
                  </Link>
                </>
              )}

              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
              {menuOpen ? '✖' : '☰'}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
