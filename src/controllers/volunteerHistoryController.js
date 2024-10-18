const VolunteerHistory = require('../models/VolunteerHistoryModel');

exports.getVolunteerHistory = async (req, res) => {
  try {
    const history = await VolunteerHistory.find({ volunteer: req.params.volunteerId });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteer history', error });
  }
};