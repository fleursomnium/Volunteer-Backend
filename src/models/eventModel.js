const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventTime: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  urgency: { type: String, required: true },
  registeredVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VolunteerProfile' }],
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
