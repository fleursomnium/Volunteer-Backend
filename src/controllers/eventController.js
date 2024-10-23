const Event = require('../models/eventModel'); // Import the Event model

// Controller to create a new event
exports.createEvent = async (req, res) => {
    try {
        const { name, description, location, time, date, requiredSkills, urgency } = req.body;

        // Check if all required fields are provided
        if (!name || !description || !location || !time || !date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new Event object
        const event = new Event({
            eventName: name,
            eventDescription: description,
            eventLocation: location,
            eventTime: time,
            date: date,
            requiredSkills: requiredSkills || [], // Optional, default to empty array if not provided
            urgency: urgency || 'Normal' // Default to 'Normal' if urgency is not provided
        });

        // Save the event to the database
        await event.save();
        console.log('Event saved:', event);
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event', error });
    }
};

// Controller to retrieve all events
exports.getAllEvents = async (req, res) => {
    try {
        // Fetch all events from the database
        const events = await Event.find();
        res.status(200).json(events); // Return the events as JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Controller to retrieve a single event by its ID
exports.getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Fetch the event by ID from the database
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event); // Return the event as JSON
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Error fetching event', error });
    }
};

// Controller to update an event by its ID
exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updates = req.body;

        // Find the event by ID and update it
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Error updating event', error });
    }
};

// Controller to delete an event by its ID
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Find the event by ID and delete it
        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event', error });
    }
};


// // eventController.js
// //eventController.js
// const Event = require('../models/eventModel');

// // Create a new event
// exports.createEvent = async (req, res) => {
//     try {
//         const { name, description, location, requiredSkills, urgency, date } = req.body;

//         const event = new Event({
//             name,
//             description,
//             location,
//             requiredSkills,
//             urgency,
//             date,
//         });

//         await event.save();
//         console.log('Event saved:', event);
//         res.status(201).json({ message: 'Event created successfully', event });
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Error creating event', error });
//     }
// };

// // Get all events from the database
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


// const Event = require('../models/eventModel'); // Ensure this path is correct

// // Controller to create a new event
// const createEvent = async (req, res) => {
//     try {
//         // Your create event logic
//         res.status(201).json({ message: 'Event created successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Controller to register a volunteer to an event
// const registerVolunteerToEvent = async (req, res) => {
//     try {
//         // Your volunteer registration logic
//         res.status(200).json({ message: 'Volunteer registered successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// module.exports = {
//     createEvent,
//     registerVolunteerToEvent, // Ensure this function is correctly exported
// }; 10/23/2024 1:14am

//10/23/12:54// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/eventModel'); // Correct model path

// // Controller to create a new event
// const createEvent = async (req, res) => {
//     try {
//         const { eventName, eventDescription, address1, address2, city, state, zipcode, urgency, skills, dates } = req.body;
//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates || dates.length === 0) {
//             return res.status(400).json({ message: 'Missing required fields or invalid data.' });
//         }
//         const newEvent = new Event({
//             eventName,
//             description: eventDescription,
//             location: { address: address1, address2: address2 || '', city, state, zipcode },
//             urgency: urgency || 'Normal',
//             requiredSkills: skills || [],
//             date: dates,
//         });
//         const savedEvent = await newEvent.save();
//         res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Controller to get all events
// const getEvents = async (req, res) => {
//     try {
//         const events = await Event.find();
//         res.status(200).json(events);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Controller to get volunteers for a specific event
// const getVolunteersForEvent = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.eventId).populate('volunteers');
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(200).json(event.volunteers);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// module.exports = { createEvent, getEvents, getVolunteersForEvent };

// const Event = require('../models/eventModel'); 10/23/12:50
// const VolunteerProfile = require('../models/eventModel');

// // Controller to create a new event
// const createEvent = async (req, res) => {
//     try {
//         console.log('Received event data:', req.body);

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

//         // Validate required fields
//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates || dates.length === 0) {
//             return res.status(400).json({ message: 'Missing required fields or invalid data.' });
//         }

//         // Create a new event object
//         const newEvent = new Event({
//             eventName,
//             description: eventDescription,
//             location: {
//                 address: address1,
//                 address2: address2 || '', // Optional field
//                 city,
//                 state,
//                 zipcode,
//             },
//             urgency: urgency || 'Normal', // Set default urgency if not provided
//             requiredSkills: skills || [], // Default to empty array if not provided
//             date: dates,
//         });

//         // Save the event in the database
//         const savedEvent = await newEvent.save();
//         console.log('Event created successfully:', savedEvent);
//         res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Controller to get all events
// const getEvents = async (req, res) => {
//     try {
//         const events = await Event.find(); // Fetch all events from the database
//         res.status(200).json(events); // Return events in JSON format
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Controller to get volunteers for a specific event
// const getVolunteersForEvent = async (req, res) => {
//     try {
//         const eventId = req.params.eventId;

//         // Fetch the event by ID and populate the volunteers if it's referenced in the event model
//         const event = await Event.findById(eventId).populate('volunteers'); // Assuming 'volunteers' is a field in your Event schema

//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         res.status(200).json(event.volunteers); // Send volunteers as a response
//     } catch (error) {
//         console.error('Error fetching volunteers for event:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };
// module.exports = {
//     createEvent,
//     getEvents,
//     getVolunteersForEvent,
// };


// const Event = require('../models/eventModel'); last one for testing

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

//         // Validate required fields
//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates || dates.length === 0) {
//             return res.status(400).json({ message: 'Missing required fields or invalid data.' });
//         }

//         // Create new event object
//         const newEvent = new Event({
//             eventName,
//             description: eventDescription,
//             location: {
//                 address: address1,
//                 address2: address2 || '', // Optional field
//                 city,
//                 state,
//                 zipcode,
//             },
//             urgency: urgency || 'Normal', // Set default urgency if not provided
//             requiredSkills: skills || [], // Default to empty array if not provided
//             date: dates,
//         });

//         // Save the event in the database
//         const savedEvent = await newEvent.save();
//         console.log('Event created successfully:', savedEvent); // Debugging log
//         res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
//     } catch (error) {
//         console.error('Error creating event:', error); // Debugging log
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ message: 'Validation Error', error: error.message });
//         }
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// module.exports = { createEvent };
// const Event = require('../models/eventModel');

// // Create a new event
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

//         // Validate required fields
//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates || dates.length === 0) {
//             return res.status(400).json({ message: 'Missing required fields or invalid data.' });
//         }

//         // Create new event object
//         const newEvent = new Event({
//             eventName,
//             description: eventDescription,
//             location: {
//                 address: address1,
//                 address2: address2 || '', // Optional field
//                 city,
//                 state,
//                 zipcode,
//             },
//             urgency: urgency || 'Normal', // Set default urgency if not provided
//             requiredSkills: skills || [], // Default to empty array if not provided
//             date: dates,
//         });

//         // Save the event in the database
//         const savedEvent = await newEvent.save();
//         console.log('Event created successfully:', savedEvent); // Debugging log
//         res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
//     } catch (error) {
//         console.error('Error creating event:', error); // Debugging log
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ message: 'Validation Error', error: error.message });
//         }
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Get all events
// const getAllEvents = async (req, res) => {
//     try {
//         const events = await Event.find(); // Fetch all events
//         res.status(200).json(events);
//     } catch (error) {
//         console.error('Error fetching events:', error); // Debugging log
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Get an event by ID
// const getEventById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const event = await Event.findById(id);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(200).json(event);
//     } catch (error) {
//         console.error('Error fetching event:', error); // Debugging log
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Update an event
// const updateEvent = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedEvent) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(200).json(updatedEvent);
//     } catch (error) {
//         console.error('Error updating event:', error); // Debugging log
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// // Delete an event
// const deleteEvent = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedEvent = await Event.findByIdAndDelete(id);
//         if (!deletedEvent) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(200).json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting event:', error); // Debugging log
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// module.exports = {
//     createEvent,
//     getAllEvents,
//     getEventById,
//     updateEvent,
//     deleteEvent,
// };latest 11:23


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
