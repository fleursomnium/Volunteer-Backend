// import express from 'express';
// const router = express.Router();

// let events = [
//   {
//     id: 1,
//     name: 'Event 1',
//     description: 'Description of event 1',
//     location: 'Location 1',
//     date: '2024-10-17',
//     urgency: 'low',
//     skills: 'Teamwork',
//     status: 'waiting',
//     image: '/public/event1.png'
//   },
//   {
//     id: 2,
//     name: 'Event 2',
//     description: 'Description of event 2',
//     location: 'Location 2',
//     date: '2024-10-27',
//     urgency: 'medium',
//     skills: 'Communication, Adaptability',
//     status: 'waiting',
//     image: '/public/event2.png'
//   },
//   {
//     id: 3,
//     name: 'Very long name of event that is exactly 100 characters which is the maximum an event name can be!!!!',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci nisl, semper ut ullamcorper sed, consequat id tellus. Aliquam id justo elit. Sed id ipsum viverra, convallis erat vel, efficitur eros. Etiam semper, sem vitae facilisis cursus, justo mi dictum nibh, eu accumsan felis sapien id orci. Maecenas orci tellus, porta non libero eget, finibus vestibulum ante. Curabitur lobortis et eros at pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet imperdiet tortor. Quisque ut massa ex.',
//     location: 'Location 3',
//     date: '2024-10-13',
//     urgency: 'high',
//     skills: 'Teamwork, Leadership',
//     status: 'waiting',
//     image: '/public/event3.png'
//   },
//   {
//     id: 4,
//     name: 'Event 4 that is the name',
//     description: 'Description of event 4',
//     location: 'Location 4',
//     date: '2024-10-17',
//     urgency: 'medium',
//     skills: 'Teamwork',
//     status: 'waiting',
//     image: '/public/event4.png'
//   },
//   {
//     id: 5,
//     name: 'Event 5',
//     description: 'Description of event 5',
//     location: 'Location 5',
//     date: '2024-10-30',
//     urgency: 'high',
//     skills: 'Teamwork',
//     status: 'waiting',
//     image: '/public/event5.png'
//   },
//   {
//     id: 6,
//     name: 'Event 6 that is the name of the event',
//     description: 'Description of event 6',
//     location: 'Location 6',
//     date: '2024-10-17',
//     urgency: 'medium',
//     skills: 'Teamwork',
//     status: 'waiting',
//     image: '/public/event6.png'
//   }
// ];

// // GET /api/volunteer-dashboard: Fetch all RSVP events
// router.get('/', (req, res) => {
//     res.json(events);
// });

// // PUT /api/volunteer-dashboard/:id: Update the status of a specific event
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Find the event by ID
//     const eventIndex = events.findIndex(event => event.id == id);
//     if (eventIndex !== -1) {
//         // Update the status of the event
//         events[eventIndex].status = status;
//         res.json(events[eventIndex]); // Return the updated event
//     } else {
//         res.status(404).json({ error: 'Event not found' }); // Event not found
//     }
// });

// export default router;