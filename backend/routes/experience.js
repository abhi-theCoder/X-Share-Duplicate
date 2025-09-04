const express = require('express');
const { shareExperience } = require('../controllers/experienceController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

// The POST route is protected, requiring a valid JWT for access.
router.post('/share', authenticateToken, shareExperience);

module.exports = router;