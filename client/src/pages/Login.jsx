import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, GraduationCap } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, role });
      localStorage.setItem('user', JSON.stringify(res.data));
      if (role === 'professor') {
        navigate('/professor/home');
      } else {
        navigate('/student/home');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Username</label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === 'student' 
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <User size={24} />
              <span className="font-medium">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('professor')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === 'professor' 
                  ? 'bg-pink-500/20 border-pink-500 text-pink-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <GraduationCap size={24} />
              <span className="font-medium">Professor</span>
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 text-lg">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
