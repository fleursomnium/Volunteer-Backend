// src\routes\authRoutes.js
// src\routes\authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Use the controller functions for register and login
router.post('/register', register);
router.post('/login', login);

module.exports = router;
