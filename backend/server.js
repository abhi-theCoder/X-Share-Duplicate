const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');
const experienceRoutes = require('./routes/experience.js');
const profileRoutes = require('./routes/profile.js');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json());

// Mount the authentication routes under the /api/auth path
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/profile',profileRoutes);

// A simple welcome route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the XShare Backend API!');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});