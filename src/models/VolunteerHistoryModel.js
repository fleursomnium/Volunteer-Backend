const mongoose = require('mongoose');

const volunteerHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  participationDate: { type: Date, required: true },
  feedback: String
});

const VolunteerHistory = mongoose.model('VolunteerHistory', volunteerHistorySchema);

module.exports = VolunteerHistory;