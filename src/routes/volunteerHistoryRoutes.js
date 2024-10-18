// volunteerHistoryRoutes.js
const express = require('express');
const {
  getVolunteerHistory,    // Add missing function imports here
  rsvpForEvent,           // Make sure RSVP and other functions are properly imported
  getVolunteersForEvent
} = require('../controllers/volunteerHistoryController');
const router = express.Router();

router.get('/:volunteerId', getVolunteerHistory);  // Route to get history for a volunteer
router.post('/rsvp', rsvpForEvent);                // Route for RSVP functionality
router.get('/event/:eventId', getVolunteersForEvent);  // Route to get volunteers for an event

module.exports = router;
