//src\routes\eventRoutes.js
const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController'); // Import getEvents
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');  // Add middleware to verify admin

const router = express.Router();

// Route to fetch all events
router.get('/', verifyToken, verifyAdmin, getEvents);

// Route to create an event, protected for admins only
router.post('/create', verifyToken, verifyAdmin, createEvent);

module.exports = router;