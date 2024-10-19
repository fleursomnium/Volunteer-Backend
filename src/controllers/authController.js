//src\controllers\authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel'); // Include admin model

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let finalRole = role;
        if (role === 'admin') {
            const adminExists = await Admin.findOne({ email });
            if (!adminExists) {
                finalRole = 'volunteer'; 
            }
        }

        const user = new User({
            email,
            password: hashedPassword,
            role: finalRole,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', token: generateToken(user._id) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
};