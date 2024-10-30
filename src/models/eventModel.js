// // //src\models\eventModel.js
//src\models\eventModel.js
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
  skillsRequired: { type: [String], required: true },
  urgency: { type: String, required: true, enum: ['Low', 'Medium', 'High'] },
  registeredVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VolunteerProfile', default: [] }] // Add default: []
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

//10/25 11:45
// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   address: {  // Change location to address to store detailed address
//     address1: { type: String, required: true },
//     address2: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipcode: { type: String, required: true }
//   },
//   date: { type: Date, required: true },
//   skillsRequired: { type: [String], required: true },
//   urgency: { type: String, required: true, enum: ['Low', 'Medium', 'High'] }
// });

// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event;


// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   address: {  // Change location to address to store detailed address
//     address1: { type: String, required: true },
//     address2: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipcode: { type: String, required: true }
//   },
//   date: { type: Date, required: true },
//   skillsRequired: { type: [String], required: true },
//   urgency: { type: String, required: true, enum: ['Low', 'Medium', 'High'] }
// });

// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event;

// //src\models\eventModel.js
// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   address: {  // Change location to address to store detailed address
//     address1: { type: String, required: true },
//     address2: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipcode: { type: String, required: true }
//   },
//   date: { type: Date, required: true },
//   skillsRequired: { type: [String], required: true },
//   urgency: { type: String, required: true, enum: ['Low', 'Medium', 'High'] }
// });

// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event;