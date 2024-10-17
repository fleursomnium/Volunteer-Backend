const express = require("express");
const router = express.Router();
const eventController = require("../src/controllers/eventController");

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);

module.exports = router;
