const mongoose = require('mongoose');

const volunteerHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  participationDate: { type: Date, required: true },
  feedback: String
});

const VolunteerHistory = mongoose.model('VolunteerHistory', volunteerHistorySchema);

module.exports = VolunteerHistory;



//modular -------------------------------------------------------------------------------------------------------

// import mongoose from 'mongoose';

// // Volunteer history schema
// const volunteerHistorySchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // g: 10/15
//     eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // g: 10/15
//     participationDate: { type: Date, required: true }, // g: 10/15
//     feedback: String, // g: 10/15
// }, { timestamps: true });

// const VolunteerHistory = mongoose.model('VolunteerHistory', volunteerHistorySchema);

// export default VolunteerHistory;
