//userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import userController
const authMiddleware = require('../middleware/authMiddleware');

// Update profile
router.put('/:id', userController.updateUserProfile);

// Update availability
router.put('/:id/availability', userController.updateAvailability);

// Route to get the user profile
router.get('/:id', authMiddleware, userController.getUserProfile); // Add the getUserProfile function

module.exports = router;