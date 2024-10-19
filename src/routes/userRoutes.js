//src\routes\userRoutes.js
const express = require('express');
const { registerUser, 
        loginUser,
        getUserProfile, 
        updateUserProfile, 
        updateAvailability } = require('../controllers/userController');
const { getVolunteerDashboard } = require('../controllers/volunteerDashboardController');  // Import here
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Route for volunteer-dashboard
router.get('/profile/:id', getUserProfile); // Ensure this is correct
router.put('/profile/:userId', protect, updateUserProfile); // Ensure this is correct
router.put('/availability/:id', updateAvailability);
router.get('/volunteer-dashboard', protect, getVolunteerDashboard); // Fix for volunteer dashboard

// Other routes
router.post('/register', registerUser);
router.post('/login', loginUser);  // Ensure loginUser is correctly imported and used here
console.log(loginUser);  // Check if loginUser is correctly imported

router.put('/:userId', updateUserProfile);

module.exports = router;
