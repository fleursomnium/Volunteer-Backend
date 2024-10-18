const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};



// const User = require("../models/userModel");
// const fileHandler = require("../utils/fileHandler");
// const path = require("path");

// const USERS_FILE = path.join(__dirname, "../data/users.json");

// const createUser = async (req, res, next) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       address1,
//       address2,
//       city,
//       state,
//       zipcode,
//       preferences,
//       skills,
//       dates,
//       time,
//     } = req.body;

//     if (!firstName || !lastName || !address1 || !city || !state || !zipcode) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "Required fields: firstName, lastName, address1, city, state, and zipcode.",
//         });
//     }

//     const newUser = new User({
//       firstName,
//       lastName,
//       address1,
//       address2,
//       city,
//       state,
//       zipcode,
//       preferences,
//       skills,
//       dates,
//       time,
//     });

//     const users = await fileHandler.readJSON(USERS_FILE);
//     users.push(newUser);

//     await fileHandler.writeJSON(USERS_FILE, users);

//     res
//       .status(201)
//       .json({ message: "User created successfully.", user: newUser });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createUser,
// };

// import User from "../models/userModel.js"; // Ensure that userModel.js is using named export
// import { readJSON, writeJSON } from "../utils/fileHandler.js"; // Use named imports
// import path from "path";

// const USERS_FILE = path.join(path.dirname(import.meta.url), "../data/users.json"); // Adjust path resolution

// const createUser = async (req, res, next) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       address1,
//       address2,
//       city,
//       state,
//       zipcode,
//       preferences,
//       skills,
//       dates,
//       time,
//     } = req.body;

//     if (!firstName || !lastName || !address1 || !city || !state || !zipcode) {
//       return res.status(400).json({
//         message: "Required fields: firstName, lastName, address1, city, state, and zipcode.",
//       });
//     }

//     const newUser = new User({
//       firstName,
//       lastName,
//       address1,
//       address2,
//       city,
//       state,
//       zipcode,
//       preferences,
//       skills,
//       dates,
//       time,
//     });

//     const users = await readJSON(USERS_FILE); // Call readJSON directly
//     users.push(newUser);

//     await writeJSON(USERS_FILE, users); // Call writeJSON directly

//     res.status(201).json({ message: "User created successfully.", user: newUser });
//   } catch (error) {
//     next(error);
//   }
// };

// export { createUser }; // Use named export

