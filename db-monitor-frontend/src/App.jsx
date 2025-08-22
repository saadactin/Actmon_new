import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddDatabase from "./pages/AddDatabase";
import DatabaseLogs from "./pages/Logs";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser"; // ✅ import AddUser
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Dashboard and Logs accessible to all logged-in users */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <DatabaseLogs />
              </ProtectedRoute>
            }
          />

          {/* AddDatabase only for admin */}
          <Route
            path="/add"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddDatabase />
              </ProtectedRoute>
            }
          />

          {/* AddUser only for admin */}
          <Route
            path="/add-user"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
