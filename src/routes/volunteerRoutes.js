//src\routes\voluneerRoutes.js
const express = require('express');
const { updateVolunteerProfile, getVolunteerProfile, getVolunteerHistory } = require('../controllers/volunteerController');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Route to get the volunteer profile
router.get('/profile', verifyToken, getVolunteerProfile);

// Route to update the volunteer profile
router.put('/profile', verifyToken, updateVolunteerProfile);

// Route to get the volunteer's history
router.get('/history', verifyToken, getVolunteerHistory);

module.exports = router;