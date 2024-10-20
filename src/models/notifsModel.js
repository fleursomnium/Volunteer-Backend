import express from 'express';

const router = express.Router();

// Hardcoded notifications data to simulate a database
const notifications = [
  {
    title: "new event matches for you!!",
    date: "Sept 20, 2024 4:44pm",
    message: "Hey [User's Name]! We have some upcoming events you have been matched to! Please confirm your attendance."
  },
  {
    title: "new event matches for you!!",
    date: "Sept 21, 2024 10:30am",
    message: "Hey [User's Name]! You have a match for another upcoming event! Check your schedule and confirm!"
  },
  {
    title: "Reminder: Upcoming Event",
    date: "Sept 22, 2024 3:00pm",
    message: "Just a reminder that you have an event match happening soon. Make sure to check your attendance!"
  }
];

// Route to get notifications
router.get('/', (req, res) => {
  res.json(notifications);
});

export default router;
