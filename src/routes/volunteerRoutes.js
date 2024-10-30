const express = require('express');
const { updateVolunteerProfile } = require('../controllers/volunteerController');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Apply the middleware to protect the route
router.put('/profile', verifyToken, updateVolunteerProfile);

module.exports = router;

// //src\routes\voluneerRoutes.js
// const express = require('express');
// const { updateVolunteerProfile } = require('../controllers/volunteerController');
// const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

// const router = express.Router();

// // Apply the middleware to protect the route
// router.put('/profile', verifyToken, updateVolunteerProfile);

// module.exports = router;


