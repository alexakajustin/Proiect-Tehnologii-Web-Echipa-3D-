/**
 * Login Component
 * Handles user authentication with username, password, and role selection
 * Supports both login for existing users and registration for new users
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, GraduationCap } from 'lucide-react';
import API_URL from '../config/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handle login form submission
   * Attempts login first, registers if user doesn't exist
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        // Register new user
        const res = await axios.post(`${API_URL}/api/auth/register`, { username, password, role });
        localStorage.setItem('user', JSON.stringify(res.data));
      } else {
        // Login existing user
        const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
        localStorage.setItem('user', JSON.stringify(res.data));
      }

      // Navigate based on role
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'professor') {
        navigate('/professor/home');
      } else {
        navigate('/student/home');
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || 'Authentication failed';
      setError(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h1 className="login-title">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 text-emerald-100" style={{ display: 'block' }}>
              Username
            </label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 text-emerald-100" style={{ display: 'block' }}>
              Password
            </label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {isRegistering && (
            <div className="role-selector">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`role-btn ${role === 'student' ? 'active-student' : ''}`}
              >
                <User size={24} />
                <span className="font-medium">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('professor')}
                className={`role-btn ${role === 'professor' ? 'active-professor' : ''}`}
              >
                <GraduationCap size={24} />
                <span className="font-medium">Professor</span>
              </button>
            </div>
          )}

          {error && (
            <div className="alert alert-ended" style={{ textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full py-3 text-lg">
            {isRegistering ? 'Create Account' : 'Login'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-emerald-400 underline text-sm"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
