//eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create event
router.post('/', eventController.createEvent);

// Delete event
router.delete('/:id', eventController.deleteEvent);

// Manage volunteers
router.put('/:eventId/:volunteerId', eventController.manageVolunteers);

module.exports = router;