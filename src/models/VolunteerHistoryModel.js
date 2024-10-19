//src\models\VolunteerHistoryModel.js
const mongoose = require('mongoose');

const VolunteerHistorySchema = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  status: {
    type: String,
    enum: ['signed-up', 'declined'],
    default: 'signed-up',
  }
});

module.exports = mongoose.model('VolunteerHistory', VolunteerHistorySchema);