const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const { users, activities, feedbacks } = require('./store');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for now
    methods: ["GET", "POST"]
  }
});

// --- API ROUTES ---

// Auth (Mock)
app.post('/api/auth/login', (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) return res.status(400).json({ error: 'Missing fields' });
  
  // Simple "login" - just return the user info
  const user = { id: uuidv4(), username, role };
  users.push(user);
  res.json(user);
});

// Create Activity (Professor)
app.post('/api/activities', (req, res) => {
  const { professorId, name } = req.body;
  if (!professorId || !name) return res.status(400).json({ error: 'Missing fields' });

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const activity = {
    id: uuidv4(),
    code,
    name,
    professorId,
    isActive: true,
    createdAt: new Date()
  };
  
  activities[code] = activity;
  res.json(activity);
});

// Join/Get Activity (Student/Professor)
app.get('/api/activities/:code', (req, res) => {
  const { code } = req.params;
  const activity = activities[code];
  
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  if (!activity.isActive) return res.status(400).json({ error: 'Activity ended' });
  
  res.json(activity);
});

// End Activity (Professor)
app.put('/api/activities/:code/end', (req, res) => {
  const { code } = req.params;
  const activity = activities[code];
  
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  
  activity.isActive = false;
  io.to(code).emit('activity_ended');
  res.json(activity);
});

// Get Feedback Logs (Professor)
app.get('/api/activities/:code/feedbacks', (req, res) => {
  const { code } = req.params;
  const activityFeedbacks = feedbacks.filter(f => f.activityCode === code);
  res.json(activityFeedbacks);
});

// --- SOCKET.IO ---

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_activity', (code) => {
    socket.join(code);
    console.log(`User ${socket.id} joined activity ${code}`);
  });

  socket.on('send_feedback', (data) => {
    // data: { activityCode, type, timestamp }
    const { activityCode, type } = data;
    const feedback = {
      id: uuidv4(),
      activityCode,
      type,
      timestamp: new Date()
    };
    feedbacks.push(feedback);
    
    // Broadcast to everyone in the room (specifically the professor)
    io.to(activityCode).emit('receive_feedback', feedback);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
