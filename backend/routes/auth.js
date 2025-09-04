const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');
const router = express.Router();

// Route for user registration. It calls the registerUser function from the controller.
router.post('/register', registerUser);

// Route for user login. It calls the loginUser function from the controller.
router.post('/login', loginUser);

module.exports = router;