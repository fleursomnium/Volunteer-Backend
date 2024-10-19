//eventController.js
const Event = require('../models/EventModel');

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err });
  }
};

// Add/Remove Volunteers from Event
exports.manageVolunteers = async (req, res) => {
  const { eventId, volunteerId } = req.params;
  const { action } = req.body; // action can be 'add' or 'remove'
  try {
    const event = await Event.findById(eventId);
    if (action === 'add') {
      event.volunteers.push(volunteerId);
    } else {
      event.volunteers.pull(volunteerId);
    }
    await event.save();
    res.status(200).json({ message: `Volunteer ${action === 'add' ? 'added' : 'removed'} successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Error managing volunteers', error: err });
  }
};