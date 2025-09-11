const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware.js');
const { getBookmarks, addBookmark, removeBookmark, getBookmarkedExperiences } = require('../controllers/bookmarkController.js');

const router = express.Router();

router.get('/:userId', authenticateToken, getBookmarks);
router.get('/:userId/experiences', authenticateToken, getBookmarkedExperiences); 
router.post('/', authenticateToken, addBookmark);
router.delete('/', authenticateToken, removeBookmark);

module.exports = router;