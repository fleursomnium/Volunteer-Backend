const express = require('express');
const { getVolunteerDashboardData } = require('../controllers/volunteerDashboardController');
const router = express.Router();

router.get('/', getVolunteerDashboardData);

module.exports = router;