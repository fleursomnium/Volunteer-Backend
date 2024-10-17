const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // If the role is admin, validate if the email is in the admin list
    if (role === 'admin') {
      const adminEmail = await Admin.findOne({ email });
      if (!adminEmail) {
        return res.status(403).json({ message: 'Unauthorized: email not allowed for admin registration' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', role });
  } catch (error) {
    console.error('Error during registration:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal server error during registration', error });
  }
};

// Define loginUser to prevent undefined error
const loginUser = async (req, res) => {
  res.status(200).json({ message: 'Login route not yet implemented' });
};

module.exports = { registerUser, loginUser };


// import User from '../models/userModel.js';  // Use ES module import
// import { readJSON, writeJSON } from '../utils/fileHandler.js';
// import path from 'path';
// import { fileURLToPath } from 'url';


// // Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


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
//           message: "Required fields: firstName, lastName, address1, city, state, and zipcode.",
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


//     const users = await readJSON(USERS_FILE);
//     users.push(newUser);


//     await writeJSON(USERS_FILE, users);


//     res
//       .status(201)
//       .json({ message: "User created successfully.", user: newUser });
//   } catch (error) {
//     next(error);
//   }
// };


// export { createUser };



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

