// const mongoose = require('mongoose'); 10/23/2024 1:24

// const eventSchema = new mongoose.Schema({
//   eventName: { type: String, required: true },
//   eventDescription: { type: String, required: true },
//   eventLocation: { type: String, required: true },
//   eventTime: { type: String, required: true },
//   skillsRequired: { type: [String], required: true },
//   urgency: { type: String, required: true },
//   registeredVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VolunteerProfile' }],
// });

// const Event = mongoose.model('Event', eventSchema);
// module.exports = Event;
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  requiredSkills: [String],
  urgency: {
    type: String,
    default: 'Normal',
  },
  date: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
