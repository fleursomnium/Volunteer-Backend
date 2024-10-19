// volunteerHistoryRoutes.js
const express = require('express');
const {
  getVolunteersForEvent,
  getAllVolunteers,
  addVolunteerToEvent,
  removeVolunteerFromEvent,
} = require('../controllers/volunteerHistoryController');
const router = express.Router();

router.get('/event/:eventId', getVolunteersForEvent);  // Fetch volunteers for event
router.get('/all', getAllVolunteers);  // Fetch all volunteers
router.post('/add', addVolunteerToEvent);  // Add volunteer to event
router.post('/remove', removeVolunteerFromEvent);  // Remove volunteer from event

module.exports = router;

