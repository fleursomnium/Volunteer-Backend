const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Route
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if registering as admin
    if (role === 'admin') {
      const isAdmin = await Admin.findOne({ email });
      console.log('Admin check:', isAdmin); // Add this for debugging
      if (!isAdmin) {
        return res.status(400).json({ message: 'Not authorized to register as admin' });
      }
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });

  } catch (error) {
    console.error('Registration Error:', error); // Log any error to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error); // Log any error to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;