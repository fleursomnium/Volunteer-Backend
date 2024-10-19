//src\routes\notificationRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');

// Get notifications for new events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}); // Retrieve all events
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err });
  }
});

module.exports = router;