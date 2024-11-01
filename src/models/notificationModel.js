// src/models/notificationModel.js
const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  targetAudience: { type: String, required: true, enum: ['volunteer', 'admin', 'all'] }, // target audience can be volunteers, admins, or all users
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' } // optional link to an event
});


const Notification = mongoose.model('Notification', notificationSchema);


module.exports = Notification;