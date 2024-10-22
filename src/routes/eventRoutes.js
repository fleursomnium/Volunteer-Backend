const express = require('express');
const { createEvent, registerVolunteerToEvent } = require('../controllers/eventController');
const router = express.Router();

router.post('/create', createEvent);
router.post('/register', registerVolunteerToEvent);

module.exports = router;
