// authRoutes.js
const express = require('express');  
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);  // Register a new user
router.post('/login', login);  // Login a user

module.exports = router;  // Export the router correctly