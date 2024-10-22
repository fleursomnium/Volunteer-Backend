const Event = require('../models/eventModel');
const VolunteerProfile = require('../models/eventModel');

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const registerVolunteerToEvent = async (req, res) => {
  const { eventId, volunteerId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    const volunteer = await VolunteerProfile.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ msg: 'Volunteer not found' });

    event.registeredVolunteers.push(volunteerId);
    volunteer.confirmedEvents.push(eventId);

    await event.save();
    await volunteer.save();

    res.status(200).json({ msg: 'Volunteer registered for event' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createEvent, registerVolunteerToEvent };
