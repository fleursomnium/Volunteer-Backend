

// // userController.js today.
// const User = require('../models/userModel');

// // Update user profile
// exports.updateUserProfile = async (req, res) => {
//   const { userId } = req.params;
//   const { firstName, lastName, address1, address2, city, state, zipcode, preferences, skills, dates} = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           firstName,
//           lastName,
//           address1,
//           address2,
//           city,
//           state,
//           zipcode,
//           preferences,
//           skills,
//           dates,

//         },
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating profile', error });
//   }
// };
// userController.js

const User = require('../models/userModel');

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, preferences, skills, dates } = req.body;

    if (!firstName || !lastName || !preferences || !skills || !dates) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, preferences, skills, dates },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      message: 'Error updating profile',
      error: error.message || 'Internal server error',
    });
  }
};

module.exports = {
  updateUserProfile,
};




// const User = require('../models/userModel');7:47

// // Update user profile
// exports.updateUserProfile = async (req, res) => {
//   const { userId } = req.params;
//   const { firstName, lastName, preferences, skills, dates } = req.body;

//   // Ensure all required fields are present
//   if (!firstName || !lastName || !preferences || !skills.length || !dates.length) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Try to find and update the user
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           firstName,
//           lastName,
//           preferences,
//           skills,
//           dates
//         },
//       },
//       { new: true } // Return the updated document
//     );

//     // If the user doesn't exist, return 404
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return a success message with the updated user info
//     res.status(200).json({
//       message: 'User profile updated successfully.',
//       user: updatedUser,
//     });
//   } catch (error) {
//     // If there is any other server error, return 500
//     res.status(500).json({
//       message: 'Error updating profile',
//       error: error.message || error,
//     });
//   }
// };

// // userController.js

// const User = require('../models/userModel');7:45

// // Update user profile
// exports.updateUserProfile = async (req, res) => {
//   const { userId } = req.params;
//   const { firstName, lastName, address1, address2, city, state, zipcode, preferences, skills, dates } = req.body;

//   // Check if all required fields are provided
//   if (!firstName || !lastName || !preferences || !skills.length || !dates ) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           firstName,
//           lastName,
//           address1,
//           address2,
//           city,
//           state,
//           zipcode,
//           preferences,
//           skills,
//           dates,
         
//         },
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating profile', error });
//   }
//   console.log(req.body);

// };



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

