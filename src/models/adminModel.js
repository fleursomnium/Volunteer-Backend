//adminModel.js
const mongoose = require('mongoose');

// Admin email schema (for manually added admin emails)
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;