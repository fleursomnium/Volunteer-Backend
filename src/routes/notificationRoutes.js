// src/routes/notificationRoutes.js
//console.log("Notification routes loaded"); // Add this line to confirm
const express = require('express');
const Notification = require('../models/notificationModel');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ targetAudience: 'volunteer' }).sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
});


module.exports = router;