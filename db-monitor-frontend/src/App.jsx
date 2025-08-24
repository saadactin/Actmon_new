import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddDatabase from "./pages/AddDatabase";
import DatabaseLogs from "./pages/Logs";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import ProtectedRoute from "./components/ProtectedRoute";
import DatabaseStats from "./pages/DatabaseStats";
import PerformanceMetrics from "./pages/PerformanceMetrics";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Dashboard, Logs, Stats accessible to all logged-in users */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><DatabaseLogs /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><DatabaseStats /></ProtectedRoute>} />
<Route
  path="/performance"
  element={
    <ProtectedRoute>
      <PerformanceMetrics />
    </ProtectedRoute>
  }
/>
          {/* Admin-only */}
          <Route path="/add" element={<ProtectedRoute adminOnly={true}><AddDatabase /></ProtectedRoute>} />
          <Route path="/add-user" element={<ProtectedRoute adminOnly={true}><AddUser /></ProtectedRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
