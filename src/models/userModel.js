const mongoose = require('mongoose');

// Define a User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  preferences: { type: String },
  skills: { type: [String] },
  dates: { type: [Date] },
  time: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;



// // import { v4 as uuidv4 } from 'uuid';


// // class User {
// //   constructor({
// //     firstName,
// //     lastName,
// //     address1,
// //     address2,
// //     city,
// //     state,
// //     zipcode,
// //     preferences,
// //     skills = [],
// //     dates = [],
// //     time
// //   }) {
// //     this.id = uuidv4();
// //     this.firstName = firstName;
// //     this.lastName = lastName;
// //     this.address1 = address1;
// //     this.address2 = address2;
// //     this.city = city;
// //     this.state = state;
// //     this.zipcode = zipcode;
// //     this.preferences = preferences;
// //     this.skills = skills;
// //     this.dates = dates;
// //     this.time = time;
// //     this.createdAt = new Date();
// //   }
// // }

// // module.exports = User;
// import { v4 as uuidv4 } from 'uuid';

// class User {
//   constructor({
//     firstName,
//     lastName,
//     address1,
//     address2,
//     city,
//     state,
//     zipcode,
//     preferences,
//     skills = [],
//     dates = [],
//     time
//   }) {
//     this.id = uuidv4();
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.address1 = address1;
//     this.address2 = address2;
//     this.city = city;
//     this.state = state;
//     this.zipcode = zipcode;
//     this.preferences = preferences;
//     this.skills = skills;
//     this.dates = dates;
//     this.time = time;
//     this.createdAt = new Date();
//   }
// }

// // Change this line to use named export
// export default User;
