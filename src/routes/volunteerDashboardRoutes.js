//src\routes\volunteerDashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getVolunteerDashboard } = require('../controllers/volunteerDashboardController');
const { protect } = require('../middleware/authMiddleware');

// GET volunteer dashboard data
router.get('/', protect, getVolunteerDashboard);

module.exports = router;
