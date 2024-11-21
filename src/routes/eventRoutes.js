const express = require('express');

const { createEvent, updateEvent, getEvent, matchVolunteersToEvent, acceptMatchedEvent, registerFromMatch, unregisterVolunteer, 
  getEvents, getUpcomingEvents, getPastEvents, getAvailableEvents, getScheduledEvents, rejectMatchedEvent } = require('../controllers/eventController'); // Import getEvents

const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');  // Add middleware to verify admin

const router = express.Router();

router.post('/create', verifyToken, verifyAdmin, createEvent); // Route to create an event, protected for admins only

router.get('/upcoming', verifyToken, getUpcomingEvents);

router.get('/past', verifyToken, getPastEvents);

router.get('/available', verifyToken, getAvailableEvents); // Route to get all available events (those not registered by the volunteer)

router.get('/scheduled', verifyToken, getScheduledEvents); // Route to get all scheduled events (those the volunteer is registered for)

router.put('/:id', verifyToken, verifyAdmin, updateEvent); // Route to update an existing event by its ID

router.get('/:id', verifyToken, getEvent); // Route to update an existing event by its ID

router.post('/match/:eventId', verifyToken, verifyAdmin, matchVolunteersToEvent); // Route to match volunteers to an event

router.post('/accept/:eventId', verifyToken, acceptMatchedEvent); // Route to accept a matched event

router.post('/register-from-match/:eventId', verifyToken, registerFromMatch); // Route to register volunteers from a matched event

router.post('/unregister', verifyToken, unregisterVolunteer); // Route to unregister a volunteer from an event

router.post('/reject/:eventId', verifyToken, rejectMatchedEvent);

router.get('/', verifyToken, verifyAdmin, getEvents); // Route to fetch all events

module.exports = router;

// const { createEvent, updateEvent, getEvents, getAvailableEvents, getScheduledEvents, 
//     registerVolunteerToEvent, unregisterVolunteerFromEvent, matchVolunteersToEvent, acceptMatchedEvent,
//     getUpcomingEvents, getPastEvents } = require('../controllers/eventController'); // Import getEvents

// Route to register a volunteer to an event
// router.post('/register', verifyToken, registerVolunteerToEvent);

// Route to unregister a volunteer from an event
// router.post('/unregister', verifyToken, unregisterVolunteerFromEvent);

//router.post('/run-matches', verifyToken, runMatches);


// 10/29/2024//
//const express = require('express');
// const { createEvent, getEvents, getAvailableEvents, getScheduledEvents,
//     registerVolunteerToEvent, unregisterVolunteerFromEvent } = require('../controllers/eventController'); // Import getEvents
// const verifyToken = require('../middleware/authMiddleware');
// const verifyAdmin = require('../middleware/adminMiddleware');  // Add middleware to verify admin

// const router = express.Router();

// // Route to fetch all events
// router.get('/', verifyToken, verifyAdmin, getEvents);

// // Route to create an event, protected for admins only
// router.post('/create', verifyToken, verifyAdmin, createEvent);

// // Route to get all available events (those not registered by the volunteer)
// router.get('/available', verifyToken, getAvailableEvents);

// // Route to get all scheduled events (those the volunteer is registered for)
// router.get('/scheduled', verifyToken, getScheduledEvents);

// // Route to register a volunteer to an event
// router.post('/register', verifyToken, registerVolunteerToEvent);

// // Route to unregister a volunteer from an event
// router.post('/unregister', verifyToken, unregisterVolunteerFromEvent);

// module.exports = router;

//10/25 11:48

// const express = require('express');
// const { createEvent, getEvents } = require('../controllers/eventController');  // Import getEvents as well

// const verifyToken = require('../middleware/authMiddleware');
// const verifyAdmin = require('../middleware/adminMiddleware');  // Assuming you have this middleware

// const router = express.Router();

// // Route to fetch all events
// router.get('/', verifyToken, verifyAdmin, getEvents);

// // Route to create an event, protected for admins only
// router.post('/create', verifyToken, verifyAdmin, createEvent);

// module.exports = router;

// //src\routes\eventRoutes.js //10:28
// const express = require('express');
// const { createEvent } = require('../controllers/eventController');

// const verifyToken = require('../middleware/authMiddleware');
// const verifyAdmin = require('../middleware/adminMiddleware');  // Add middleware to verify admin

// const router = express.Router();

// // Route to fetch all events
// router.get('/', verifyToken, verifyAdmin, getEvents);

// // Route to create an event, protected for admins only
// router.post('/create', verifyToken, verifyAdmin, createEvent);

// module.exports = router;

// //src\routes\eventRoutes.js
// const express = require('express');
// const { createEvent, getEvents } = require('../controllers/eventController'); // Import getEvents
// const verifyToken = require('../middleware/authMiddleware');
// const verifyAdmin = require('../middleware/adminMiddleware');  // Add middleware to verify admin

// const router = express.Router();

// // Route to fetch all events
// router.get('/', verifyToken, verifyAdmin, getEvents);

// // Route to create an event, protected for admins only
// router.post('/create', verifyToken, verifyAdmin, createEvent);

// module.exports = router;

//10/23/2024 9:44
//src\routes\eventRoutes.js
// const express = require('express');
// const { createEvent } = require('../controllers/eventController');
// const verifyToken = require('../middleware/authMiddleware');
// const verifyAdmin = require('../middleware/adminMiddleware');  // Add middleware to verify admin

// const router = express.Router();

// // Route to fetch all events
// router.get('/', verifyToken, verifyAdmin, getEvents);

// // Route to create an event, protected for admins only
// router.post('/create', verifyToken, verifyAdmin, createEvent);

// module.exports = router;