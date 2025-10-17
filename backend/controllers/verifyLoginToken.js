//Backend to verify login token
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyLoginToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting
  console.log("token, process.env.JWT_SECRET");
  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // You can optionally check expiration or user data
    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({ valid: false, message: 'Invalid token' });
  }
};

module.exports = verifyLoginToken;