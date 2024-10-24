//src\routes\eventRoutes.js
const express = require('express');
const { createEvent, getEvents, getAvailableEvents, getScheduledEvents, 
    registerVolunteerToEvent, unregisterVolunteerFromEvent } = require('../controllers/eventController'); // Import getEvents
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');  // Add middleware to verify admin

const router = express.Router();

// Route to fetch all events
router.get('/', verifyToken, verifyAdmin, getEvents);

// Route to create an event, protected for admins only
router.post('/create', verifyToken, verifyAdmin, createEvent);

// Route to get all available events (those not registered by the volunteer)
router.get('/available', verifyToken, getAvailableEvents);

// Route to get all scheduled events (those the volunteer is registered for)
router.get('/scheduled', verifyToken, getScheduledEvents);

// Route to register a volunteer to an event
router.post('/register', verifyToken, registerVolunteerToEvent);

// Route to unregister a volunteer from an event
router.post('/unregister', verifyToken, unregisterVolunteerFromEvent);

module.exports = router;