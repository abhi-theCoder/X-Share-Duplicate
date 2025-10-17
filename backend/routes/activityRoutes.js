const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware.js');
const { getActivityData, addActivity } = require('../controllers/activityController.js');

const router = express.Router();

router.get('/', authenticateToken, getActivityData);
router.post('/add', authenticateToken, addActivity);

module.exports = router;
