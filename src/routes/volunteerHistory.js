const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const events = [
    {
      id: 1,
      name: 'Event 1',
      description: 'Description of event 1',
      location: 'Location 1',
      date: '2024-09-11',
      urgency: 'high',
      skills: 'Leadership, Communication',
      status: 'yes'
    },
    {
      id: 2,
      name: 'Event 2',
      description: 'Description of event 2',
      location: 'Location 2',
      date: '2024-10-15',
      urgency: 'low',
      skills: 'Teamwork, Organization',
      status: 'no'
    }
  ];
  res.json(events);
});

module.exports = router;
