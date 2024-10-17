const express = require('express');
const { createEvent } = require('../controllers/eventController');

const router = express.Router();

router.post('/create', createEvent);
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put('/update/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.status(200).send({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).send({ message: 'Error updating event', error });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.status(200).send({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting event', error });
  }
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const eventController = require("../controllers/eventController");

// router.post("/", eventController.createEvent);
// router.get("/", eventController.getAllEvents);

// module.exports = router;
