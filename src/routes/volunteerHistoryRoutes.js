const express = require('express');
const { getVolunteerHistory } = require('../controllers/volunteerHistoryController');
const router = express.Router();

router.get('/:volunteerId', getVolunteerHistory);

module.exports = router;