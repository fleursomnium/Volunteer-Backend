const express = require('express');

const { getAllStates } = require('../controllers/statesController'); // Ensure these are correctly imported
const router = express.Router();


router.get('/', getAllStates); // GET route for fetching all events

module.exports = router;

//10/29/2024
// const express = require('express');
// const { getAllStates } = require('../controllers/statesController'); // Ensure these are correctly imported
// const router = express.Router();

// router.get('/', getAllStates); // GET route for fetching all events

// module.exports = router;