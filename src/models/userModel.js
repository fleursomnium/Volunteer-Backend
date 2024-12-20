const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'admin'], required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

//10/29/2024// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['volunteer', 'admin'], required: true },
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;

//10/25 11:46
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['volunteer', 'admin'], required: true },
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;