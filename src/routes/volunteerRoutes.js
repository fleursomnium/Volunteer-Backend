//src\routes\voluneerRoutes.js
const express = require('express');
const { updateVolunteerProfile, getVolunteerProfile, getVolunteerHistory, 
    updateGeneralAvailability, updateBlockedDates, updateSpecificAvailability, 
    updateAvailability, getAvailability } = require('../controllers/volunteerController');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Route to get the volunteer profile
router.get('/profile', verifyToken, getVolunteerProfile);

// Route to update the volunteer profile
router.put('/profile', verifyToken, updateVolunteerProfile);

// Route to get the volunteer's history
router.get('/history', verifyToken, getVolunteerHistory);

// Route to update general availability
router.post('/availability/general', verifyToken, updateGeneralAvailability);

// Route to update blocked dates
router.post('/availability/blocked', verifyToken, updateBlockedDates);

// Route to update specific dates
router.post('/availability/specific', verifyToken, updateSpecificAvailability);

//combined updates
router.patch('/availability', verifyToken, updateAvailability); // Changed from post to patch

//Route to fetch current availability
router.get('/availability', verifyToken, getAvailability);


module.exports = router;