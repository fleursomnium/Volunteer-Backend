const mongoose = require('mongoose');

const volunteerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: String,
  lastName: String,
  preferences: String,
  skills: [String],
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: String,
  },
  availability: [Date],
  confirmedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const VolunteerProfile = mongoose.model('VolunteerProfile', volunteerProfileSchema);
module.exports = VolunteerProfile;