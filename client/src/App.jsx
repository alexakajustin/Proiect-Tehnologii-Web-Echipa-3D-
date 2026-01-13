/**
 * App Component
 * Main application router with route protection and user info header
 */
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import ProfessorHome from './pages/ProfessorHome';
import StudentHome from './pages/StudentHome';
import ProfessorActivity from './pages/ProfessorActivity';
import StudentActivity from './pages/StudentActivity';

/**
 * Get current user from localStorage
 */
const getUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

/**
 * ProtectedRoute - redirects based on user role
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to correct home based on role
    return <Navigate to={user.role === 'professor' ? '/professor/home' : '/student/home'} replace />;
  }

  return children;
};

/**
 * UserHeader - displays logged-in user info and logout button
 */
const UserHeader = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(getUser());
  }, [location]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Don't show header on login page
  if (location.pathname === '/' || !user) {
    return null;
  }

  return (
    <div className="user-header">
      <div className="user-info">
        <span className="user-role">{user.role === 'professor' ? '🎓' : '👤'}</span>
        <span className="user-name">{user.username}</span>
        <span className="user-role-text">({user.role})</span>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

function AppContent() {
  return (
    <div className="app-container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/professor/home" element={
          <ProtectedRoute allowedRole="professor">
            <ProfessorHome />
          </ProtectedRoute>
        } />
        <Route path="/student/home" element={
          <ProtectedRoute allowedRole="student">
            <StudentHome />
          </ProtectedRoute>
        } />
        <Route path="/professor/activity/:code" element={
          <ProtectedRoute allowedRole="professor">
            <ProfessorActivity />
          </ProtectedRoute>
        } />
        <Route path="/student/activity/:code" element={
          <ProtectedRoute allowedRole="student">
            <StudentActivity />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
