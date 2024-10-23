const express = require('express');
const eventController = require('../controllers/eventController'); // Import eventController

const router = express.Router();

// Define your routes
router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:eventId/volunteers', eventController.getVolunteersForEvent);

module.exports = router;


// const express = require('express'); last one for testing


// const {
//     createEvent,
//     getEvents,
//     getVolunteersForEvent,
// } = require('../controllers/eventController');

// const router = express.Router();

// router.post('/', createEvent);
// router.get('/', getEvents);
// router.get('/:eventId/volunteers', getVolunteersForEvent);

// module.exports = router;



// const express = require('express');
// const { getEvents, createEvent } = require('../controllers/eventController');

// const router = express.Router();

// router.get('/', getEvents);  // This should reference a valid function
// router.post('/', createEvent);

// module.exports = router;



// import express from 'express';  // Use ES module syntax
// import { createEvent } from '../controllers/eventController.js';  // Use ES module import


// const router = express.Router();


// router.post("/", createEvent);  // Define your POST route for user creation


// export default router;  // Export the router using ES module syntax




// const express = require("express");
// const router = express.Router();
// const eventController = require("../controllers/eventController");

// router.post("/", eventController.createEvent);
// router.get("/", eventController.getAllEvents);

// module.exports = router;
