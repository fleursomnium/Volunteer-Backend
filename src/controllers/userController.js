// src\controllers\userController.js
// src/controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user with the hashed password
    const newUser = new User({ 
      email, 
      password: hashedPassword, 
      role 
    });

    // Save the new user in the database
    const savedUser = await newUser.save();

    // Automatically create an empty profile with preferences instead of bio
    const emptyProfile = {
      userId: savedUser._id,  // Use the registered user's ID
      firstName: '',
      lastName: '',
      preferences: '', // Use preferences here
      // Add other profile fields here as needed
    };

    // Update the user profile with empty values for fields
    await User.findByIdAndUpdate(savedUser._id, { profile: emptyProfile }, { new: true });

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
};

// Get User Profile by ID
exports.getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data', error: err });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;  // Extract userId from request parameters
    const { firstName, lastName, preferences, skills, dates, time } = req.body;

    const updatedProfile = {
      'profile.firstName': firstName,
      'profile.lastName': lastName,
      'profile.preferences': preferences,
      'profile.skills': skills,
      'profile.dates': dates,
      'profile.time': time,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

// Update Availability
exports.updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { availability }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating availability', error: err });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Volunteer Dashboard
exports.getVolunteerDashboard = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the user ID from token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch relevant data for the volunteer (e.g., events)
    const events = []; // Add event fetching logic if needed

    res.status(200).json({ user, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
