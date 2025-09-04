const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController.js');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware.js');

// GET user profile
router.get('/', authenticateToken, getProfile);

// PUT update user profile
router.put('/', authenticateToken, updateProfile);

module.exports = router;