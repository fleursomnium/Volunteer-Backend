// src/controllers/statesController.js
const State = require('../models/statesModel');

exports.getAllStates = async (req, res) => {
  try {
    console.log('Fetching all states...');
    const states = await State.find(); // Fetch all states from MongoDB
    res.status(200).json(states); // Return the states as JSON
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ message: 'Error fetching states', error });
  }
};
