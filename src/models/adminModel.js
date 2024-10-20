const mongoose = require('mongoose');

// Admin schema
const adminSchema = new mongoose.Schema({
  name: {   // Add this field
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
