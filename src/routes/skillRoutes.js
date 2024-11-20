// src/routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// Routes
router.get('/', skillController.getAllSkills); // Get all skills
router.post('/', skillController.createSkill); // Create a new skill

module.exports = router;
