//src\models\volunteerProfileModel.js
const mongoose = require('mongoose');

// Define the sub-schema for availability.general
const availabilityGeneralSchema = new mongoose.Schema({
  Monday: { start: String, end: String },
  Tuesday: { start: String, end: String },
  Wednesday: { start: String, end: String },
  Thursday: { start: String, end: String },
  Friday: { start: String, end: String },
  Saturday: { start: String, end: String },
  Sunday: { start: String, end: String },
}, { _id: false }); // Include _id: false to prevent Mongoose from adding _id fields to subdocuments


const volunteerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  preferences: { type: String, default: '' },
  skills: { type: [String], default: [] },
  address: {
    address1: { type: String, default: '' },
    address2: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipcode: { type: String, default: '' }
  },

  // New Availability Structure
  availability: {
    general: {
      type: availabilityGeneralSchema,
      default: {},
    },
    specific: [
      {
        date: Date,
        start: String,
        end: String,
        isAllDay: Boolean,
      },
    ],
    blocked: [
      {
        date: Date,
        start: String,
        end: String,
        isAllDay: Boolean,
      },
    ],
  }, 

  confirmedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Ensure this line correctly references the Event model
  volunteerFormCompleted: { type: String, enum: ['not completed', 'completed'], default: 'not completed' }
});

// Check if the model has already been compiled, if so, use it; otherwise, compile it.
module.exports = mongoose.models.VolunteerProfile || mongoose.model('VolunteerProfile', volunteerProfileSchema);
