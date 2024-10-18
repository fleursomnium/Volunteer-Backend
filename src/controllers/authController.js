//authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send token and user data back to the client (without password field)
    const { password: _, ...userDataWithoutPassword } = user.toObject();
    res.json({ token, user: userDataWithoutPassword });
  } catch (error) {
    console.error(error);  // Log server error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Register function (for future expansion)
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token and user data (without the password)
    const { password: _, ...userDataWithoutPassword } = newUser.toObject();
    res.status(201).json({ token, user: userDataWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};