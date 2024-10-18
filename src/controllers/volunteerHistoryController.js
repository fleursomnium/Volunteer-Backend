// volunteerHistoryController.js
const VolunteerHistory = require('../models/VolunteerHistoryModel');
const Event = require('../models/eventModel');

// Volunteer RSVP for an event
exports.rsvpForEvent = async (req, res) => {
  const { volunteerId, eventId } = req.body;
  try {
    const history = new VolunteerHistory({
      volunteer: volunteerId,
      event: eventId,
      dateJoined: new Date(),
      status: 'pending',  // Initially marked as pending
    });
    await history.save();
    res.status(201).json({ message: 'RSVP successful', history });
  } catch (error) {
    res.status(500).json({ message: 'Error RSVP for the event', error });
  }
};

// Admin views all volunteers for an event
exports.getVolunteersForEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const volunteers = await VolunteerHistory.find({ event: eventId }).populate('volunteer');
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers for the event', error });
  }
};

// Get the volunteer history for a specific volunteer
exports.getVolunteerHistory = async (req, res) => {
  const { volunteerId } = req.params;
  try {
    const history = await VolunteerHistory.find({ volunteer: volunteerId }).populate('event');
    if (!history) {
      return res.status(404).json({ message: 'No history found for the specified volunteer' });
    }
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteer history', error });
  }
};
