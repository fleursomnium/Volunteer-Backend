const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  urgency: String,
  requiredSkills: [String],
  date: { type: [Date], required: true },  // Changed to array for multiple dates
  time: { type: String, required: true },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;



// const { v4: uuidv4 } = require("uuid");

// class Event {
//   constructor({ name, date, location, description }) {
//     this.id = uuidv4();
//     this.name = name;
//     this.date = date;
//     this.location = location;
//     this.description = description;
//     this.createdAt = new Date();
//   }
// }

// module.exports = Event;
