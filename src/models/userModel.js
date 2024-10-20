//src\models\userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'volunteer'], required: true },
  profile: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    preferences: { type: String, default: '' },
    skills: [{ type: String }],
    dates: [{ type: Date }],
    availability: { type: String, default: 'Not set' }
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
