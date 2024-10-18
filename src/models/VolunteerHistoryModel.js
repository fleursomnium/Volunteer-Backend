const mongoose = require('mongoose');

const volunteerHistorySchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  dateJoined: { type: Date, required: true },
  status: { type: String, enum: ['completed', 'pending', 'cancelled'], default: 'pending' },
});

const VolunteerHistory = mongoose.model('VolunteerHistory', volunteerHistorySchema);
module.exports = VolunteerHistory;