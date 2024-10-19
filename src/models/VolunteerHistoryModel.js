//VolunteerHistoryModel.js
const mongoose = require('mongoose');

const volunteerHistorySchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },  // Reference to Event
  dateJoined: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
});

const VolunteerHistory = mongoose.model('VolunteerHistory', volunteerHistorySchema);
module.exports = VolunteerHistory;