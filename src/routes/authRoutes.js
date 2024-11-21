
const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Use the controller functions for register and login
router.post('/register', register);
router.post('/login', login);
router.get('/user', verifyToken, getUser);

module.exports = router;
