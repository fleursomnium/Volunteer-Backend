// volunteerHistoryRoutes.js
const express = require('express');
const router = express.Router();
const VolunteerHistory = require('../models/VolunteerHistoryModel');

// Sign-up for event
router.post('/signup', async (req, res) => {
  const { volunteer, event } = req.body;
  try {
    const newHistory = new VolunteerHistory({ volunteer, event, status: 'signed-up' });
    await newHistory.save();
    res.status(201).json({ message: 'Volunteer signed up successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err });
  }
});

// Decline event
router.delete('/decline', async (req, res) => {
  const { volunteer, event } = req.body;
  try {
    await VolunteerHistory.findOneAndDelete({ volunteer, event });
    res.status(200).json({ message: 'Volunteer declined the event successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error declining event', error: err });
  }
});

module.exports = router;