//src\middleware\authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header exists
  if (!authHeader) {
    return res.status(403).json({ msg: "Authorization header missing" });
  }

  const parts = authHeader.split(" ");

  // Check if the token is in the format "Bearer <token>"
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(400).json({ msg: "Invalid authorization format" });
  }

  const token = parts[1];

  // Verify the token using the JWT secret
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    // Attach the decoded token payload to req.user
    req.user = decoded;
    console.log("Decoded Token:", decoded);  // For debugging, you can remove this later

    next();
  });
};

module.exports = verifyToken;
//10/29/2024// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   // Check if the authorization header exists
//   if (!authHeader) {
//     return res.status(403).json({ msg: "Authorization header missing" });
//   }

//   const parts = authHeader.split(" ");

//   // Check if the token is in the format "Bearer <token>"
//   if (parts.length !== 2 || parts[0] !== 'Bearer') {
//     return res.status(400).json({ msg: "Invalid authorization format" });
//   }

//   const token = parts[1];

//   // Verify the token using the JWT secret
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ msg: "Invalid token" });
//     }

//     // Attach the decoded token payload to req.user
//     req.user = decoded;
//     console.log("Decoded Token:", decoded);  // For debugging, you can remove this later

//     next();
//   });
// };

// module.exports = verifyToken;

//10/25 11:43
// //src\middleware\authMiddleware.js
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // This will include userId and role from the token
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = verifyToken;
