//src\middleware\adminMiddleware.js
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // Continue to the next middleware or controller if the user is an admin
    } else {
      res.status(403).json({ msg: 'Access denied. Admins only' }); // Deny access if the user is not an admin
    }
  };
  
  module.exports = verifyAdmin;
   