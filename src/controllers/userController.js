import User from '../models/userModel.js';  // Use ES module import
import { readJSON, writeJSON } from '../utils/fileHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const USERS_FILE = path.join(__dirname, "../data/users.json");


const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipcode,
      preferences,
      skills,
      dates,
      time,
    } = req.body;


    if (!firstName || !lastName || !address1 || !city || !state || !zipcode) {
      return res
        .status(400)
        .json({
          message: "Required fields: firstName, lastName, address1, city, state, and zipcode.",
        });
    }


    const newUser = new User({
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipcode,
      preferences,
      skills,
      dates,
      time,
    });


    const users = await readJSON(USERS_FILE);
    users.push(newUser);


    await writeJSON(USERS_FILE, users);


    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    next(error);
  }
};


export { createUser };



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

