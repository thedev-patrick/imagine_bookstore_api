const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get the JWT token from the request header
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the JWT token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or has expired
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = verifyToken;
