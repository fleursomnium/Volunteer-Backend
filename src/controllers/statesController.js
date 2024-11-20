// src/controllers/statesController.js
const State = require('../models/statesModel');

exports.getAllStates = async (req, res) => {
  try {
    console.log('Fetching all states...');
    const states = await State.find(); // Fetch all states from MongoDB
    console.log('Fetched states:', states);
    res.status(200).json(states); // Return the states as JSON
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ message: 'Error fetching states', error });
  }
};
//10/25 11:40
// const States = require('../models/statesModel');

// exports.getAllStates = async (req, res) => {
//     try {
//         // Fetch all events from the database
//         const states = await States.find();
//         res.status(200).json(states); // Return the events as JSON
//     } catch (error) {
//         console.error('Error fetching states:', error);
//         res.status(500).json({ message: 'Error fetching states', error });
//     }
// };