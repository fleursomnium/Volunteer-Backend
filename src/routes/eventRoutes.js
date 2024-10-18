const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const eventController = require("../controllers/eventController");

// router.post("/", eventController.createEvent);
// router.get("/", eventController.getAllEvents);

// module.exports = router;
