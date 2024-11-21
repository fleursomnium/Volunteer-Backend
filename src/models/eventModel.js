//src\models\eventModel.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: {  // Change location to address to store detailed address
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }
  },
  date: { type: Date, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  urgency: { type: String, required: true, enum: ['Low', 'Medium', 'High'] },
  registeredVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VolunteerProfile', default: [] }] // Add default: []
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
