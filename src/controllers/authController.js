//src\controllers\authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const VolunteerProfile = require('../models/volunteerProfileModel');
const mongoose = require('mongoose');

// Use MongoDB native query for admin emails collection
const ADMIN_EMAILS_COLLECTION = 'adminEmails';  // Manually created collection in your database

// Register a user (volunteer/admin)
const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Check if the email is already registered in the User collection (for both volunteer and admin)
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already in use' });

    // Additional check if the role is admin
    if (role === 'admin') {
      // Check if email exists in the manually created admin collection
      const adminEmailExists = await mongoose.connection.collection(ADMIN_EMAILS_COLLECTION).findOne({ email });
      if (!adminEmailExists) return res.status(400).json({ msg: 'Admin registration not allowed for this email' });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user (admin or volunteer)
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    // If the user is a volunteer, create a blank volunteer profile
    if (role === 'volunteer') {
      const volunteerProfile = new VolunteerProfile({
        userId: user._id,
        firstName: '',          // Blank fields for volunteer to update
        lastName: '',
        preferences: '',
        skills: [],
        address: {
          address1: '',
          address2: '',
          city: '',
          state: '',
          zipcode: ''
        },
        availability: [],
        confirmedEvents: []      // Empty by default, to be updated later
      });
      await volunteerProfile.save();
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user role
    res.status(201).json({ token, role });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and role
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { register, login };

//10/29/2024 //src\controllers\authController.js
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const VolunteerProfile = require('../models/volunteerprofileModel');
// const mongoose = require('mongoose');

// // Use MongoDB native query for admin emails collection
// const ADMIN_EMAILS_COLLECTION = 'adminEmails';  // Manually created collection in your database

// // Register a user (volunteer/admin)
// const register = async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     // Check if the email is already registered in the User collection (for both volunteer and admin)
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ msg: 'Email already in use' });

//     // Additional check if the role is admin
//     if (role === 'admin') {
//       // Check if email exists in the manually created admin collection
//       const adminEmailExists = await mongoose.connection.collection(ADMIN_EMAILS_COLLECTION).findOne({ email });
//       if (!adminEmailExists) return res.status(400).json({ msg: 'Admin registration not allowed for this email' });
//     }

//     // Hash the password for security
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user (admin or volunteer)
//     const user = new User({ email, password: hashedPassword, role });
//     await user.save();

//     // If the user is a volunteer, create a blank volunteer profile
//     if (role === 'volunteer') {
//       const volunteerProfile = new VolunteerProfile({
//         userId: user._id,
//         firstName: '',          // Blank fields for volunteer to update
//         lastName: '',
//         preferences: '',
//         skills: [],
//         address: {
//           address1: '',
//           address2: '',
//           city: '',
//           state: '',
//           zipcode: ''
//         },
//         availability: [],
//         confirmedEvents: []      // Empty by default, to be updated later
//       });
//       await volunteerProfile.save();
//     }

//     // Generate JWT token for authentication
//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Send response with token and user role
//     res.status(201).json({ token, role });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Login an existing user
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: 'Invalid credentials' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(404).json({ msg: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Return token and role
//     res.json({ token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// module.exports = { register, login };

//src\controllers\authController.js
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const VolunteerProfile = require('../models/volunteerprofileModel');
// const mongoose = require('mongoose');

// // Use MongoDB native query for admin emails collection
// const ADMIN_EMAILS_COLLECTION = 'adminEmails';  // Manually created collection in your database

// // Register a user (volunteer/admin)
// const register = async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     // Check if the email is already registered in the User collection (for both volunteer and admin)
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ msg: 'Email already in use' });

//     // Additional check if the role is admin
//     if (role === 'admin') {
//       // Check if email exists in the manually created admin collection
//       const adminEmailExists = await mongoose.connection.collection(ADMIN_EMAILS_COLLECTION).findOne({ email });
//       if (!adminEmailExists) return res.status(400).json({ msg: 'Admin registration not allowed for this email' });
//     }

//     // Hash the password for security
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user (admin or volunteer)
//     const user = new User({ email, password: hashedPassword, role });
//     await user.save();

//     // If the user is a volunteer, create a blank volunteer profile
//     if (role === 'volunteer') {
//       const volunteerProfile = new VolunteerProfile({
//         userId: user._id,
//         firstName: '',          // Blank fields for volunteer to update
//         lastName: '',
//         preferences: '',
//         skills: [],
//         address: {
//           address1: '',
//           address2: '',
//           city: '',
//           state: '',
//           zipcode: ''
//         },
//         availability: [],
//         confirmedEvents: []      // Empty by default, to be updated later
//       });
//       await volunteerProfile.save();
//     }

//     // Generate JWT token for authentication
//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//     // Send response with token and user role
//     res.status(201).json({ token, role });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Login an existing user
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: 'Invalid credentials' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(404).json({ msg: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Return token and role
//     res.json({ token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// module.exports = { register, login };
