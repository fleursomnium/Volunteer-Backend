//src\models\eventModel.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  requiredSkills: {
    type: [String],
    default: [],
  },
  date: {
    type: [String],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Event', EventSchema);
