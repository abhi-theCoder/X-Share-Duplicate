// middleware/authMiddleware.js - Middleware to verify JWT tokens.
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  let token;

  // Check for the 'Authorization' header and its format
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add the user's ID from the token payload to the request object
      // This ID can be used by the route handler to associate the experience with the user.
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      res.status(401).json({ message: 'Invalid or expired token. Please re-login' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

module.exports = { authenticateToken };
