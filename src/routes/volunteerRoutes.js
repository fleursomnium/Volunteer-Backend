//src\routes\voluneerRoutes.js
const express = require('express');
const { updateProfile } = require('../controllers/volunteerController');
const router = express.Router();

router.put('/profile/:userId', updateProfile);

module.exports = router;
