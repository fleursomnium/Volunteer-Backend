const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  requiredSkills: { type: [String], required: true },
});

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
