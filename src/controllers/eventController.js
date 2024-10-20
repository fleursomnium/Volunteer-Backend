const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
    try {
        console.log('Received event data:', req.body); // Debugging log

        const {
            eventName,
            eventDescription,
            address1,
            address2,
            city,
            state,
            zipcode,
            urgency,
            skills,
            dates,
        } = req.body;

        // Validate required fields
        if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates || dates.length === 0) {
            return res.status(400).json({ message: 'Missing required fields or invalid data.' });
        }

        // Create new event object
        const newEvent = new Event({
            eventName,
            description: eventDescription,
            location: {
                address: address1,
                address2: address2 || '', // Optional field
                city,
                state,
                zipcode,
            },
            urgency: urgency || 'Normal', // Set default urgency if not provided
            requiredSkills: skills || [], // Default to empty array if not provided
            date: dates,
        });

        // Save the event in the database
        const savedEvent = await newEvent.save();
        console.log('Event created successfully:', savedEvent); // Debugging log
        res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
    } catch (error) {
        console.error('Error creating event:', error); // Debugging log
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', error: error.message });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { createEvent };

// const Event = require('../models/eventModel');8:13


// const createEvent = async (req, res) => {
//     try {
//         console.log('Received event data:', req.body); // Debugging log

//         const {
//             eventName,
//             eventDescription,
//             address1,
//             address2,
//             city,
//             state,
//             zipcode,
//             urgency,
//             skills,
//             dates,
            
//         } = req.body;

//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates ) {
//             return res.status(400).json({ message: 'Missing required fields.' });
//         }

//         const newEvent = new Event({
//             eventName,
//             description: eventDescription,
//             location: {
//                 address: address1,
//                 city,
//                 state,
//                 zipcode,
//             },
//             urgency,
//             requiredSkills: skills,
//             date: dates,
         
//         });

//         const savedEvent = await newEvent.save();
//         console.log('Event created successfully:', savedEvent); // Debugging log
//         res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
//     } catch (error) {
//         console.error('Error creating event:', error); // Debugging log
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// };

// module.exports = { createEvent }; 

// const request = require('supertest');
// const { app } = require('../../server'); // Import your Express app
// const Event = require('../models/eventModel'); // Import the Event model
// const VolunteerHistory = require('../models/volunteerHistoryModel'); // Import the VolunteerHistory model

// jest.mock('../models/eventModel'); // Mock the Event model
// jest.mock('../models/volunteerHistoryModel'); // Mock the VolunteerHistory model

// describe('Event Controller', () => {

//     // Mock event data
//     const mockEvent = {
//         _id: '12345',
//         name: 'Community Cleanup',
//         description: 'Help clean the local park.',
//         location: 'Spring, TX',
//         requiredSkills: ['cleaning', 'organization'],
//         urgency: 'High',
//         date: '2024-10-17'
//     };

//     // Mock volunteer history data
//     const mockVolunteerHistory = [
//         { _id: 'v1', volunteer: 'John Doe', event: '12345', status: 'confirmed' },
//         { _id: 'v2', volunteer: 'Jane Doe', event: '12345', status: 'pending' }
//     ];

//     beforeEach(() => {
//         jest.clearAllMocks(); // Clear mocks before each test
//     });

//     describe('POST /api/events', () => {
//         it('should create a new event successfully', async () => {
//             Event.prototype.save = jest.fn().mockResolvedValue(mockEvent);

//             const response = await request(app)
//                 .post('/api/events')
//                 .send(mockEvent);

//             expect(response.status).toBe(201);
//             expect(response.body).toEqual(mockEvent);
//             expect(Event.prototype.save).toHaveBeenCalled();
//         });

//         it('should return 500 if there is a server error', async () => {
//             Event.prototype.save = jest.fn().mockRejectedValue(new Error('Server error'));

//             const response = await request(app)
//                 .post('/api/events')
//                 .send(mockEvent);

//             expect(response.status).toBe(500);
//             expect(response.body.message).toBe('Server error');
//             expect(Event.prototype.save).toHaveBeenCalled();
//         });
//     });

//     describe('GET /api/events', () => {
//         it('should fetch all events', async () => {
//             Event.find = jest.fn().mockResolvedValue([mockEvent]);

//             const response = await request(app).get('/api/events');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual([mockEvent]);
//             expect(Event.find).toHaveBeenCalled();
//         });

//         it('should return 500 if there is a server error', async () => {
//             Event.find = jest.fn().mockRejectedValue(new Error('Server error'));

//             const response = await request(app).get('/api/events');

//             expect(response.status).toBe(500);
//             expect(response.body.message).toBe('Server error');
//             expect(Event.find).toHaveBeenCalled();
//         });
//     });

//     describe('GET /api/events/:eventId/volunteers', () => {
//         it('should fetch volunteers for a specific event', async () => {
//             VolunteerHistory.find = jest.fn().mockResolvedValue(mockVolunteerHistory);

//             const response = await request(app).get('/api/events/12345/volunteers');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(mockVolunteerHistory);
//             expect(VolunteerHistory.find).toHaveBeenCalledWith({ event: '12345' });
//         });

//         it('should return 500 if there is an error fetching volunteers', async () => {
//             VolunteerHistory.find = jest.fn().mockRejectedValue(new Error('Error fetching volunteers'));

//             const response = await request(app).get('/api/events/12345/volunteers');

//             expect(response.status).toBe(500);
//             expect(response.body.message).toBe('Error fetching volunteers');
//             expect(VolunteerHistory.find).toHaveBeenCalledWith({ event: '12345' });
//         });
//     });
// });

// const Event = require('../models/eventModel');

// const createEvent = async (req, res) => {
//     try {
//         console.log('Received event data:', req.body); // Debugging log

//         const {
//             eventName,
//             eventDescription,
//             address1,
//             address2,
//             city,
//             state,
//             zipcode,
//             urgency,
//             skills,
//             dates,

//         } = req.body;

//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates ) {
//             return res.status(400).json({ message: 'Missing required fields.' });
//         }

//         const newEvent = new Event({
//             eventName,
//             description: eventDescription,
//             location: {
//                 address: address1,
//                 city,
//                 state,
//                 zipcode,
//             },
//             urgency,
//             requiredSkills: skills,
//             date: dates,

//         });

//         const savedEvent = await newEvent.save();
//         console.log('Event created successfully:', savedEvent); // Debugging log
//         res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
//     } catch (error) {
//         console.error('Error creating event:', error); // Debugging log
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// };

// module.exports = { createEvent };
// eventController.js


// Create a new event
//eventController.js

// const Event = require('../models/eventModel');
// const VolunteerHistory = require('../models/VolunteerHistoryModel');

// // Create a new event
// exports.createEvent = async (req, res) => {
//     try {
//         console.log('Event data received:', req.body);

//         const { name, description, location, requiredSkills, urgency, date, time } = req.body;

//         // Check for empty fields
//         if (!name || !description || !location || !requiredSkills || !urgency || !date) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const newEvent = new Event({
//             name,
//             description,
//             location,
//             requiredSkills,
//             urgency,
//             date,

//         });

//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Get all events (for Admin Dashboard)
// exports.getEvents = async (req, res) => {
//     try {
//         const events = await Event.find().populate('volunteers'); // This fetches volunteers as well
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching events', error });
//     }
// };

// // Get volunteers assigned to an event (for Admin Dashboard)
// exports.getVolunteersForEvent = async (req, res) => {
//     const { eventId } = req.params;
//     try {
//         const volunteerHistory = await VolunteerHistory.find({ event: eventId }).populate('volunteer');
//         res.json(volunteerHistory);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching volunteers for the event', error });
//     }
// };

// // Function to get all events from the database
// exports.getAllEvents = async (req, res) => {
//     try {
//         const events = await Event.find(); // Fetch all events
//         res.json(events); // Return events as JSON
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching events', error });
//     }
// };

// Get volunteers assigned to an event (for Admin Dashboard)
// exports.getVolunteersForEvent = async (req, res) => {
//     const { eventId } = req.params;
//     try {
//         const volunteerHistory = await VolunteerHistory.find({ event: eventId }).populate('volunteer');
//         res.json(volunteerHistory);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching volunteers for the event', error });
//     }
// };

//10/19
// eventController.js
// const Event = require('../models/eventModel');
// const VolunteerHistory = require('../models/VolunteerHistoryModel');

// // Create a new event
// exports.createEvent = async (req, res) => {
//     try {
//         console.log('Event data received:', req.body);

//         const { name, description, location, requiredSkills, urgency, date, time } = req.body;

//         // Check for empty fields
//         if (!name || !description || !location || !requiredSkills || !urgency || !date) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const newEvent = new Event({
//             name,
//             description,
//             location,
//             requiredSkills,
//             urgency,
//             date,
    
//         });

//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Get all events (for Admin Dashboard)
// exports.getEvents = async (req, res) => {
//     try {
//         const events = await Event.find().populate('volunteers'); // This fetches volunteers as well
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching events', error });
//     }
// };

// // Get volunteers assigned to an event (for Admin Dashboard)
// exports.getVolunteersForEvent = async (req, res) => {
//     const { eventId } = req.params;
//     try {
//         const volunteerHistory = await VolunteerHistory.find({ event: eventId }).populate('volunteer');
//         res.json(volunteerHistory);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching volunteers for the event', error });
//     }
// };








// import Event from '../models/eventModel.js';  // Use ES module import
// import { readJSON, writeJSON } from '../utils/fileHandler.js';
// import path from 'path';
// import { fileURLToPath } from 'url';


// // Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const EVENTS_FILE = path.join(__dirname, "../data/events.json");


// const createEvent = async (req, res, next) => {
//     try {
//         const {
//             eventName,
//             eventDescription,
//             address1,
//             address2,
//             city,
//             state,
//             zipcode,
//             urgency,
//             skills,
//             dates,
//             time,
//         } = req.body;


//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode) {
//             return res.status(400).json({
//                 message: "Required fields: eventName, eventDescription, address1, city, state, and zipcode."
//             });
//         }


//         const newEvent = new Event({
//             eventName,
//             eventDescription,
//             address1,
//             address2,
//             city,
//             state,
//             zipcode,
//             urgency,
//             skills,
//             dates,
//             time,
//         });


//         const events = await readJSON(EVENTS_FILE);
//         events.push(newEvent);


//         await writeJSON(EVENTS_FILE, events);


//         res
//             .status(201)
//             .json({ message: "Event created successfully.", event: newEvent });
//     } catch (error) {
//         next(error);
//     }
// };


// export { createEvent };




// const Event = require("../models/eventModel");
// const fileHandler = require("../utils/fileHandler");
// const path = require("path");

// const EVENTS_FILE = path.join(__dirname, "../data/events.json");

// const createEvent = async (req, res, next) => {
//   try {
//     const { name, date, location, description } = req.body;

//     if (!name || !date || !location) {
//       return res
//         .status(400)
//         .json({ message: "Name, date, and location are required." });
//     }

//     const newEvent = new Event({ name, date, location, description });

//     const events = await fileHandler.readJSON();

//     events.push(newEvent);
//     await fileHandler.writeJSON(events);

//     res
//       .status(201)
//       .json({ message: "Event created successfully.", event: newEvent });
//   } catch (error) {
//     next(error);
//   }
// };

// const getAllEvents = async (req, res, next) => {
//   try {
//     const events = await fileHandler.readJSON(EVENTS_FILE);
//     res.status(200).json({ events });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createEvent,
//   getAllEvents,
// };
