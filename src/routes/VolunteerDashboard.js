const express = require('express');
const router = express.Router();

let events = [
  { id: 1, name: 'Beach Cleanup', status: 'upcoming' },
  { id: 2, name: 'Tree Planting', status: 'upcoming' },
];

router.get('/', (req, res) => {
  res.json(events);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const eventIndex = events.findIndex(event => event.id == id);
  if (eventIndex !== -1) {
    events[eventIndex].status = status;
    res.json(events[eventIndex]);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

module.exports = router;