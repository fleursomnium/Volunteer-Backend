import express from 'express';
import Notif from '../models/notifModel.js'; // Import the model

const router = express.Router();

// Route to get notifications from MongoDB
router.get('/', async (req, res) => {
  try {
    const notifications = await Notif.find(); // Fetch all notifications from the database
    res.status(200).json(notifications); // Return them as JSON
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch notifications' });
  }
});

export default router;

