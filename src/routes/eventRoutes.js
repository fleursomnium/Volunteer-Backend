// const express = require('express');
// const { createEvent, registerVolunteerToEvent } = require('../controllers/eventController');
// const router = express.Router();

// router.post('/create', createEvent);
// router.post('/register', registerVolunteerToEvent);

// module.exports = router;
const express = require('express');
const { createEvent, getAllEvents } = require('../controllers/eventController'); // Ensure these are correctly imported
const router = express.Router();

router.post('/create', createEvent); // POST route for creating an event
router.get('/events', getAllEvents); // GET route for fetching all events

module.exports = router;
