//eventRoutes.js
const express = require('express');
const { createEvent, getAllEvents } = require('../controllers/eventController'); // Use getAllEvents
const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents); // This route will fetch all events

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const eventController = require("../controllers/eventController");

// router.post("/", eventController.createEvent);
// router.get("/", eventController.getAllEvents);

// module.exports = router;
