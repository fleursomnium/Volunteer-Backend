import express from 'express';

const router = express.Router();

// Hardcoded volunteer data to simulate a database
const volunteerData = [
  {
    name: "John Doe",
    skills: ["python", "leadership"],
    preferences: "Lorem ipsum dolor sit amet..."
  },
  {
    name: "Jane Smith",
    skills: ["javascript", "management"],
    preferences: "Lorem ipsum dolor sit amet..."
  }
  // Add more volunteers as needed
];

// Route to get volunteer data
router.get('/', (req, res) => {
  res.json(volunteerData);
});

export default router;