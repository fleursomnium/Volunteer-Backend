const mongoose = require('mongoose');

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
  availability: { type: [Date], default: [] },
  confirmedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Ensure this line correctly references the Event model
  volunteerFormCompleted: { type: String, enum: ['not completed', 'completed'], default: 'not completed' }
});

// Check if the model has already been compiled, if so, use it; otherwise, compile it.
module.exports = mongoose.models.VolunteerProfile || mongoose.model('VolunteerProfile', volunteerProfileSchema);

//10/29/2024 const mongoose = require('mongoose');

// const volunteerProfileSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   firstName: { type: String, default: '' },
//   lastName: { type: String, default: '' },
//   preferences: { type: String, default: '' },
//   skills: { type: [String], default: [] },
//   address: {
//     address1: { type: String, default: '' },
//     address2: { type: String, default: '' },
//     city: { type: String, default: '' },
//     state: { type: String, default: '' },
//     zipcode: { type: String, default: '' }
//   },
//   availability: { type: [Date], default: [] },
//   confirmedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
// });

// // Check if the model has already been compiled, if so, use it; otherwise, compile it.
// module.exports = mongoose.models.VolunteerProfile || mongoose.model('VolunteerProfile', volunteerProfileSchema);
// 10/25 11:47
// const mongoose = require('mongoose');

// const volunteerProfileSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   firstName: { type: String, default: '' },
//   lastName: { type: String, default: '' },
//   preferences: { type: String, default: '' },
//   skills: { type: [String], default: [] },
//   address: {
//     address1: { type: String, default: '' },
//     address2: { type: String, default: '' },
//     city: { type: String, default: '' },
//     state: { type: String, default: '' },
//     zipcode: { type: String, default: '' }
//   },
//   availability: { type: [Date], default: [] },
//   confirmedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
// });

// // Check if the model has already been compiled, if so, use it; otherwise, compile it.
// module.exports = mongoose.models.VolunteerProfile || mongoose.model('VolunteerProfile', volunteerProfileSchema);
