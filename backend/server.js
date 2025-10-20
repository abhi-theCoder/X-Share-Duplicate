const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/auth.js');
const experienceRoutes = require('./routes/experience.js');
const profileRoutes = require('./routes/profile.js');
const bookmarks = require('./routes/bookmark.js');
const resumeRoutes = require('./routes/resume.js');

const app = express();

// CORS for Vite frontend
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/bookmarks', bookmarks);
app.use('/api/resumes', resumeRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});