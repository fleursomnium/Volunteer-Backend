// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Check if the request has the Authorization header
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token. The token is expected in the format "Bearer <token>"
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    
    // Store the decoded user ID in the request for future use
    req.userId = decoded.id;
    next();  // Move to the next middleware or controller
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
};

module.exports = verifyToken;