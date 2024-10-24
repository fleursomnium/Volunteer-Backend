const States = require('../models/statesModel');

exports.getAllStates = async (req, res) => {
    try {
        // Fetch all events from the database
        const states = await States.find();
        res.status(200).json(states); // Return the events as JSON
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ message: 'Error fetching states', error });
    }
};