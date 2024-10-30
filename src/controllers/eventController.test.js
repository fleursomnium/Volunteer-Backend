// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');

// const req = {
//     body: {
//         eventName: 'Community Cleanup',
//         eventDescription: 'Help clean up the community park.',
//         address1: '123 Park St',
//         city: 'Houston',
//         state: 'TX',
//         zipcode: '77001',
//         urgency: 'High',
//         skills: ['Cleaning', 'Organizing'],
//         dates: ['2024-11-01']
//     }
// };

// const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
// };

// afterEach(() => {
//     jest.clearAllMocks();
// });

// describe('EventController - createEvent', () => {
//     it('should create a new event successfully', async () => {
//         const mockEvent = req.body;

//         Event.create.mockResolvedValue(mockEvent); // Mock the created event
//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Event created successfully.',
//             event: mockEvent
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         Event.create.mockRejectedValue(new Error('Database error')); // Force an error
//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error)
//         });
//     });
// });
// eventController.test.js
const { createEvent } = require('../controllers/eventController');
const Event = require('../models/eventModel');

jest.mock('../models/eventModel');

describe('EventController - createEvent', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                eventName: 'Community Cleanup',
                eventDescription: 'A cleanup event for the local park',
                address1: '456 Park Lane',
                address2: '',
                city: 'Houston',
                state: 'TX',
                zipcode: '77002',
                urgency: 'High',
                skills: ['Teamwork', 'Organization'],
                dates: ['2024-10-21'],
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it('should create an event successfully', async () => {
        // Mock successful event creation
        Event.prototype.save = jest.fn().mockResolvedValue({
            _id: '123',
            ...req.body,
        });

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Event created successfully.',
            event: {
                _id: '123',
                ...req.body,
            },
        });
    });

    it('should return 400 if required fields are missing', async () => {
        // Remove required field to simulate missing data
        req.body.eventName = '';

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Missing required fields or invalid data.',
        });
    });

    it('should return 500 if there is a server error', async () => {
        // Mock server error
        Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal server error',
            error: 'Database error',
        });
    });
});


//10/25 11:35
// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 eventName: 'Community Cleanup',
//                 eventDescription: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 urgency: 'High',
//                 skills: ['Teamwork', 'Organization'],
//                 dates: ['2024-10-21'],
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should create an event successfully', async () => {
//         // Mock successful event creation
//         Event.prototype.save = jest.fn().mockResolvedValue({
//             _id: '123',
//             ...req.body,
//         });

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Event created successfully.',
//             event: {
//                 _id: '123',
//                 ...req.body,
//             },
//         });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         // Remove required field to simulate missing data
//         req.body.eventName = '';

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Missing required fields or invalid data.',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mock server error
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: 'Database error',
//         });
//     });
// });

// const { createEvent } = require('../controllers/eventController');give 9 out of 10
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 eventName: 'Community Cleanup',
//                 eventDescription: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 urgency: 'High',
//                 skills: ['Teamwork', 'Organization'],
//                 dates: ['2024-10-21'],
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should create an event successfully', async () => {
//         // Mock successful event creation
//         Event.prototype.save = jest.fn().mockResolvedValue({
//             _id: '123',
//             ...req.body,
//         });

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Event created successfully.',
//             event: {
//                 _id: '123',
//                 ...req.body,
//             },
//         });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         // Remove required field to simulate missing data
//         req.body.eventName = '';

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Missing required fields.',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mock server error
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: 'Database error',
//         });
//     });
// });

// const { updateUserProfile } = require('../controllers/userController'); 9 test pass
// const User = require('../models/userModel');

// jest.mock('../models/userModel');

// const req = {
//     params: { userId: '123' },
//     body: {
//         firstName: 'John',
//         lastName: 'Doe',
//         address1: '123 Main St',
//         address2: 'Apt 4B',
//         city: 'Houston',
//         state: 'TX',
//         zipcode: '77001',
//         preferences: ['preference1'],
//         skills: ['skill1', 'skill2'],
//         dates: ['2024-10-19']  // Ensure all required fields are present
//     }
// };

// const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
// };

// afterEach(() => {
//     jest.clearAllMocks();
// });

// describe('UserController - updateUserProfile', () => {
//     it('should update the user profile successfully', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(req.body);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 404 if the user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found.'
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: expect.any(Error)
//         });
//     });
// });
//7:40
// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');  // Mocking the Event model

// describe('Event Controller - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 eventName: 'Community Cleanup',
//                 eventDescription: 'Help clean up the community park.',
//                 address1: '123 Park St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 urgency: 'High',
//                 skills: ['Cleaning', 'Organizing'],
//                 dates: ['2024-11-01'],
//             },
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('should create a new event with valid data', async () => {
//         // Mocking the save function to simulate a successful save
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockResolvedValue({
//                 eventName: 'Community Cleanup',
//                 description: 'Help clean up the community park.',
//                 location: {
//                     address: '123 Park St',
//                     city: 'Houston',
//                     state: 'TX',
//                     zipcode: '77001',
//                 },
//                 urgency: 'High',
//                 requiredSkills: ['Cleaning', 'Organizing'],
//                 date: ['2024-11-01'],
//             }),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Event created successfully.',
//             event: expect.objectContaining({
//                 eventName: 'Community Cleanup',
//                 description: 'Help clean up the community park.',
//             }),
//         });
//     });

//     test('should return 400 if required fields are missing', async () => {
//         // Simulate missing fields in the request body
//         req.body.eventName = ''; // Missing event name

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Missing required fields.',
//         });
//     });

//     test('should return 500 if there is a server error', async () => {
//         // Simulate a server error during event creation
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockRejectedValue(new Error('Database error')),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error),
//         });
//     });
// });

// const { createEvent } = require('../controllers/eventController'); 7:36
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');  // Mocking the Event model to isolate from the database

// describe('Event Controller - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 eventName: 'Community Cleanup',
//                 eventDescription: 'Help clean up the community park.',
//                 address1: '123 Park St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 urgency: 'High',
//                 skills: ['Cleaning', 'Organizing'],
//                 dates: ['2024-11-01'],
//             },
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('should create a new event with valid data', async () => {
//         // Mocking the save function to simulate a successful save
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockResolvedValue({
//                 eventName: 'Community Cleanup',
//                 description: 'Help clean up the community park.',
//                 location: {
//                     address: '123 Park St',
//                     city: 'Houston',
//                     state: 'TX',
//                     zipcode: '77001',
//                 },
//                 urgency: 'High',
//                 requiredSkills: ['Cleaning', 'Organizing'],
//                 date: ['2024-11-01'],
//             }),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Event created successfully.',
//             event: expect.objectContaining({
//                 eventName: 'Community Cleanup',
//                 description: 'Help clean up the community park.',
//             }),
//         });
//     });

//     test('should return 400 if required fields are missing', async () => {
//         // Simulate missing fields in the request body
//         req.body.eventName = ''; // Missing event name

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Missing required fields.',
//         });
//     });

//     test('should return 500 if there is a server error', async () => {
//         // Simulate a server error during event creation
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockRejectedValue(new Error('Database error')),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error),
//         });
//     });
// });


// const { createEvent } = require('../controllers/eventController');7:33
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');  // Mocking the Event model to isolate from the database

// describe('Event Controller - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 eventName: 'Community Cleanup',
//                 eventDescription: 'Help clean up the community park.',
//                 address1: '123 Park St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 urgency: 'High',
//                 skills: ['Cleaning', 'Organizing'],
//                 dates: ['2024-11-01'],
//             },
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('should create a new event with valid data', async () => {
//         // Mocking the save function to simulate a successful save
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockResolvedValue({
//                 eventName: 'Community Cleanup',
//                 description: 'Help clean up the community park.',
//                 location: {
//                     address: '123 Park St',
//                     city: 'Houston',
//                     state: 'TX',
//                     zipcode: '77001',
//                 },
//                 urgency: 'High',
//                 requiredSkills: ['Cleaning', 'Organizing'],
//                 date: ['2024-11-01'],
//             }),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Event created successfully.',
//             event: expect.objectContaining({
//                 eventName: 'Community Cleanup',
//                 description: 'Help clean up the community park.',
//             }),
//         });
//     });

//     test('should return 400 if required fields are missing', async () => {
//         // Simulate missing fields in the request body
//         req.body.eventName = ''; // Missing event name

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Missing required fields.',
//         });
//     });

//     test('should return 500 if there is a server error', async () => {
//         // Simulate a server error during event creation
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockRejectedValue(new Error('Database error')),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error),
//         });
//     });
// }); 



// const { createEvent, getEvents } = require('../controllers/eventController');

// const Event = require('../models/eventModel');
// const VolunteerHistory = require('../models/volunteerHistoryModel');

// // Mock the Event and VolunteerHistory models
// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerHistoryModel');

// describe('Event Controller', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'Help clean the park.',
//                 location: 'Spring, TX',
//                 date: [new Date('2024-10-17')],
//                 urgency: 'high',
//                 requiredSkills: ['cleaning', 'organization']
//             }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('createEvent', () => {
//         it('should create an event successfully', async () => {
//             Event.create.mockResolvedValue(req.body);
//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 message: 'Event created successfully.',
//                 event: req.body
//             });
//         });

//         it('should return 500 if there is an internal server error', async () => {
//             Event.create.mockRejectedValue(new Error('Internal server error'));
//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({
//                 message: 'Internal server error',
//                 error: expect.any(Error)
//             });
//         });
//     });

//     describe('getEvents', () => {
//         it('should fetch all events', async () => {
//             const mockEvents = [req.body];
//             Event.find.mockResolvedValue(mockEvents);
//             await getEvents(req, res);  // Corrected to call the function

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith(mockEvents);
//         });

//         it('should return 500 if there is an error fetching events', async () => {
//             Event.find.mockRejectedValue(new Error('Internal server error'));
//             await getEvents(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({
//                 message: 'Internal server error',
//                 error: expect.any(Error)
//             });
//         });
//     });
// });
//another attempt
// const { createEvent, getEvents } = require('../controllers/eventController');
// const Event = require('../models/eventModel');
// const VolunteerHistory = require('../models/volunteerHistoryModel');

// // Mock the Event and VolunteerHistory models
// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerHistoryModel');

// describe('Event Controller', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'Help clean the park.',
//                 location: 'Spring, TX',
//                 date: [new Date('2024-10-17')],
//                 urgency: 'high',
//                 requiredSkills: ['cleaning', 'organization']
//             }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('createEvent', () => {
//         it('should create an event successfully', async () => {
//             Event.create.mockResolvedValue(req.body);
//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 message: 'Event created successfully.',
//                 event: req.body
//             });
//         });

//         it('should return 500 if there is an internal server error', async () => {
//             Event.create.mockRejectedValue(new Error('Internal server error'));
//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({
//                 message: 'Internal server error',
//                 error: expect.any(Error)
//             });
//         });
//     });

//     describe('getEvents', () => {
//         it('should fetch all events', async () => {
//             const mockEvents = [req.body];
//             Event.find.mockResolvedValue(mockEvents);
//             await getEvents(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith(mockEvents);
//         });

//         it('should return 500 if there is an error fetching events', async () => {
//             Event.find.mockRejectedValue(new Error('Internal server error'));
//             await getEvents(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({
//                 message: 'Internal server error',
//                 error: expect.any(Error)
//             });
//         });
//     });
// });


// const request = require('supertest');
// const { app } = require('../../server');
// const Event = require('../models/eventModel');
// const VolunteerHistory = require('../models/volunteerHistoryModel');

// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerHistoryModel');

// describe('Event Controller', () => {
//     const mockEvent = {
//         _id: '12345',
//         name: 'Community Cleanup',
//         description: 'Help clean the local park.',
//         location: 'Spring, TX',
//         requiredSkills: ['cleaning', 'organization'],
//         urgency: 'High',
//         date: '2024-10-17'
//     };

//     const mockVolunteerHistory = [
//         { _id: 'v1', volunteer: 'John Doe', event: '12345', status: 'confirmed' },
//         { _id: 'v2', volunteer: 'Jane Doe', event: '12345', status: 'pending' }
//     ];

//     beforeEach(() => {
//         jest.clearAllMocks();
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

// src/controllers/eventController.test.js



// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// // Mock the Event model
// jest.mock('../models/eventModel');

// describe('Event Controller - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 eventName: 'Community Cleanup',
//                 eventDescription: 'Help clean the local park.',
//                 address1: '123 Main St',
//                 city: 'Spring',
//                 state: 'TX',
//                 zipcode: '77777',
//                 urgency: 'High',
//                 skills: ['cleaning', 'organization'],
//                 dates: [new Date('2024-10-17')],
            
//             }
//         };
//         res = {
//             status: jest.fn(() => res),
//             json: jest.fn(),
//         };
//     });

//     it('should create an event successfully', async () => {
//         Event.prototype.save = jest.fn().mockResolvedValue(req.body); // Mock successful save

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Event created successfully.',
//             event: req.body,
//         });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body.eventName = ''; // Simulate missing eventName

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Missing required fields.',
//         });
//     });

//     it('should return 500 if there is an internal server error', async () => {
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error),
//         });
//     });
// });

//other attempt
// const eventController = require("./eventController");
// const fileHandler = require("../utils/fileHandler");
// const Event = require("../models/eventModel");

// // Mock the fileHandler and Event model
// jest.mock("../utils/fileHandler");
// jest.mock("../models/eventModel");
// //
// describe("Event Controller", () => {
//   let req, res, next;

//   beforeEach(() => {
//     req = { body: {} };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   describe("createEvent", () => {
//     test("should return 400 if name, date, or location is missing", async () => {
//       req.body = { name: "Test Event" }; // Missing date and location

//       await eventController.createEvent(req, res, next);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({
//         message: "Name, date, and location are required.",
//       });
//     });

//     test("should create a new event and return 201", async () => {
//       req.body = {
//         name: "Test Event",
//         date: "2024-11-15",
//         location: "San Francisco",
//         description: "Test Description",
//       };
//       const mockEvent = { id: "1", ...req.body };
//       Event.mockImplementation(() => mockEvent);

//       fileHandler.readJSON.mockResolvedValue([]);
//       fileHandler.writeJSON.mockResolvedValue();

//       await eventController.createEvent(req, res, next);

//       expect(fileHandler.readJSON).toHaveBeenCalled();
//       expect(fileHandler.writeJSON).toHaveBeenCalled();
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({
//         message: "Event created successfully.",
//         event: mockEvent,
//       });
//     });
//   });

//   describe("getAllEvents", () => {
//     test("should return all events with status 200", async () => {
//       const mockEvents = [{ id: "1", name: "Test Event" }];
//       fileHandler.readJSON.mockResolvedValue(mockEvents);

//       await eventController.getAllEvents(req, res, next);

//       expect(fileHandler.readJSON).toHaveBeenCalled();
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ events: mockEvents });
//     });
//   });
// });
