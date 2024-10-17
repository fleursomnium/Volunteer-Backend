const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const events = [
    { id: 1, name: 'Beach Cleanup', participationDate: '2024-05-01' },
    { id: 2, name: 'Tree Planting', participationDate: '2024-06-15' },
  ];
  res.json(events);
});

module.exports = router;