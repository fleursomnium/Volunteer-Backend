//src\routes\eventRoutes.js
const express = require('express');
const { createEvent, getEvents, updateEventRSVP } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', protect, getEvents);
router.put('/:eventId/rsvp', protect, updateEventRSVP);

module.exports = router;