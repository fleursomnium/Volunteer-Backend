//src\models\userModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['volunteer', 'admin'],
    default: 'volunteer',
  },

  profile: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    preference: { type: String, default: '' },
    // Add any other profile fields you need
  },

  availability: {
    type: String,
    default: 'Not set',
  },
});

module.exports = mongoose.model('User', UserSchema);

