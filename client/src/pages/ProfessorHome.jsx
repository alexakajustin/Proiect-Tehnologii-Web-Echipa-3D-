import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, History } from 'lucide-react';

const ProfessorHome = () => {
  const [activityName, setActivityName] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const createActivity = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/activities', {
        professorId: user.id,
        name: activityName
      });
      navigate(`/professor/activity/${res.data.code}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create activity');
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Professor Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user?.username}</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-6 text-indigo-400">
            <Plus size={24} />
            <h2 className="text-xl font-semibold">New Activity</h2>
          </div>
          <form onSubmit={createActivity} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Activity Name</label>
              <input
                type="text"
                className="input-field"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                placeholder="e.g. Lecture 1: Intro to Web"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Create & Start
            </button>
          </form>
        </div>

        <div className="card opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3 mb-6 text-pink-400">
            <History size={24} />
            <h2 className="text-xl font-semibold">History</h2>
          </div>
          <p className="text-slate-400 text-sm">
            Past activities will appear here. (Not implemented in this version)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessorHome;
