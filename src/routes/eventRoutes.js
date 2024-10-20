
const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);

module.exports = router;


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
