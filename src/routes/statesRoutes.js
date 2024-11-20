// src/routes/statesRoutes.js
const express = require('express');
const { getAllStates } = require('../controllers/statesController');
const router = express.Router();

router.get('/', getAllStates); // Define the route for fetching all states

module.exports = router;