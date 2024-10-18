// authRoutes.js
const express = require('express');
const { login, register } = require('../controllers/authController');  // Make sure login and register are correctly imported
const router = express.Router();

router.post('/login', login);  // POST request for login
router.post('/register', register);  // POST request for registration

module.exports = router;
