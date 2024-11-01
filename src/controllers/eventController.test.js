
// const mongoose = require('mongoose');
// const request = require('supertest');
// const express = require('express');
// const {
//     createEvent,
//     registerVolunteerToEvent,
//     getEvents,
//     getAvailableEvents,
//     getScheduledEvents,
//     unregisterVolunteerFromEvent
// } = require('../controllers/eventController');
// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Notification = require('../models/notificationModel');

// const app = express();
// app.use(express.json());
// app.post('/api/events', createEvent);
// app.post('/api/events/register', registerVolunteerToEvent);
// app.get('/api/events', getEvents);
// app.get('/api/events/available', getAvailableEvents);
// app.get('/api/events/scheduled', getScheduledEvents);
// app.post('/api/events/unregister', unregisterVolunteerFromEvent);

// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/notificationModel');

// describe('Event Controller', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     afterAll(async () => {
//         await new Promise(resolve => setTimeout(resolve, 500)); // Ensure async operations finish
//     });

//     describe('createEvent', () => {
//         it('should create a new event and return status 201', async () => {
//             const mockEvent = {
//                 name: 'Community Cleanup',
//                 description: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-10-21',
//                 timeStart: '10:00 AM',
//                 timeEnd: '2:00 PM'
//             };
//             Event.create.mockResolvedValue({ _id: 'event123', ...mockEvent });

//             const response = await request(app).post('/api/events').send(mockEvent);

//             expect(response.status).toBe(201);
//             expect(response.body).toEqual({ msg: 'Event created successfully', eventId: 'event123' });
//         });

//         it('should return status 400 if required fields are missing', async () => {
//             Event.create.mockImplementation(() => {
//                 throw { status: 400, message: 'Please fill all required fields' };
//             });

//             const response = await request(app).post('/api/events').send({ name: 'Community Cleanup' });

//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ msg: 'Please fill all required fields' });
//         });
//     });

//     describe('registerVolunteerToEvent', () => {
//         it('should register a volunteer to an event and return status 200', async () => {
//             const reqBody = { eventId: 'event123', volunteerId: 'volunteer123' };
//             Event.findById.mockResolvedValue({ registeredVolunteers: [], save: jest.fn() });
//             VolunteerProfile.findOne.mockResolvedValue({ confirmedEvents: [], save: jest.fn() });

//             const response = await request(app).post('/api/events/register').send(reqBody);

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual({ msg: 'Volunteer registered for event' });
//         });

//         it('should return status 404 if event not found', async () => {
//             Event.findById.mockResolvedValue(null);

//             const response = await request(app).post('/api/events/register').send({ eventId: 'invalidEvent', volunteerId: 'volunteer123' });

//             expect(response.status).toBe(404);
//             expect(response.body).toEqual({ msg: 'Event not found' });
//         });
//     });

//     describe('getEvents', () => {
//         it('should return all events with status 200', async () => {
//             const mockEvents = [{ name: 'Event1' }, { name: 'Event2' }];
//             Event.find.mockResolvedValue(mockEvents);

//             const response = await request(app).get('/api/events');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(mockEvents);
//         });
//     });

//     describe('getAvailableEvents', () => {
//         it('should return available events for a volunteer', async () => {
//             VolunteerProfile.findOne.mockResolvedValue({ confirmedEvents: [{ _id: 'event1' }] });
//             Event.find.mockResolvedValue([{ _id: 'event2', name: 'Available Event' }]);

//             const response = await request(app).get('/api/events/available');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual([{ _id: 'event2', name: 'Available Event' }]);
//         });

//         it('should return status 404 if volunteer not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             const response = await request(app).get('/api/events/available');

//             expect(response.status).toBe(404);
//             expect(response.body).toEqual({ msg: 'Volunteer not found' });
//         });
//     });

//     describe('getScheduledEvents', () => {
//         it('should return scheduled events for a volunteer', async () => {
//             VolunteerProfile.findOne.mockResolvedValue({
//                 confirmedEvents: [{ _id: 'event123', name: 'Scheduled Event' }]
//             });

//             const response = await request(app).get('/api/events/scheduled');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual([{ _id: 'event123', name: 'Scheduled Event' }]);
//         });
//     });

//     describe('unregisterVolunteerFromEvent', () => {
//         it('should unregister a volunteer from an event and return status 200', async () => {
//             VolunteerProfile.findOne.mockResolvedValue({
//                 confirmedEvents: [{ toString: () => 'event123' }],
//                 save: jest.fn()
//             });

//             const response = await request(app).post('/api/events/unregister').send({ eventId: 'event123', volunteerId: 'volunteer123' });

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual({ msg: 'Volunteer unregistered from event successfully' });
//         });

//         it('should handle error if volunteer not registered for event', async () => {
//             VolunteerProfile.findOne.mockResolvedValue({
//                 confirmedEvents: [{ toString: () => 'event124' }],
//                 save: jest.fn()
//             });

//             const response = await request(app).post('/api/events/unregister').send({ eventId: 'event123', volunteerId: 'volunteer123' });

//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ msg: 'Volunteer not registered for this event' });
//         });
//     });
// });








const mongoose = require('mongoose');
const {
    createEvent,
    registerVolunteerToEvent,
    getEvents,
    getAvailableEvents,
    getScheduledEvents,
    unregisterVolunteerFromEvent
} = require('./eventController');
const Event = require('../models/eventModel');
const VolunteerProfile = require('../models/volunteerProfileModel');
const Notification = require('../models/notificationModel');

jest.mock('../models/eventModel');
jest.mock('../models/volunteerProfileModel');
jest.mock('../models/notificationModel');

describe('Event Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createEvent', () => {
        it('should create a new event and return status 201', async () => {
            const req = {
                body: {
                    name: 'Community Cleanup',
                    description: 'A cleanup event for the local park',
                    address1: '456 Park Lane',
                    address2: '',
                    city: 'Houston',
                    state: 'TX',
                    zipcode: '77002',
                    skillsRequired: ['Teamwork'],
                    urgency: 'High',
                    date: '2024-10-21',
                    timeStart: '10:00 AM',
                    timeEnd: '2:00 PM',
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Event.prototype.save = jest.fn().mockResolvedValue({ _id: 'event123' });
            Notification.prototype.save = jest.fn().mockResolvedValue({});

            await createEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Event created successfully', eventId: 'event123' });
        });

        it('should return status 400 if required fields are missing', async () => {
            const req = { body: { name: 'Community Cleanup' } }; // Missing required fields
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await createEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
        });

        it('should return status 400 for invalid date format', async () => {
            const req = {
                body: {
                    name: 'Community Cleanup',
                    description: 'A cleanup event for the local park',
                    date: 'invalid-date' // Invalid date format
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await createEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid date format' });
        });
    });

    describe('registerVolunteerToEvent', () => {
        it('should register a volunteer to an event and return status 200', async () => {
            const req = { body: { eventId: '607f1f77bcf86cd799439011', volunteerId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Event.findById = jest.fn().mockResolvedValue({ registeredVolunteers: [], save: jest.fn() });
            VolunteerProfile.findOne = jest.fn().mockResolvedValue({ confirmedEvents: [], save: jest.fn() });

            await registerVolunteerToEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer registered for event' });
        });

        it('should return status 404 if event not found', async () => {
            const req = { body: { eventId: '607f1f77bcf86cd799439011', volunteerId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Event.findById = jest.fn().mockResolvedValue(null);

            await registerVolunteerToEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Event not found' });
        });

        it('should return status 404 if volunteer not found', async () => {
            const req = { body: { eventId: '607f1f77bcf86cd799439011', volunteerId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Event.findById = jest.fn().mockResolvedValue({});
            VolunteerProfile.findOne = jest.fn().mockResolvedValue(null);

            await registerVolunteerToEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer not found' });
        });
    });

    describe('getEvents', () => {
        it('should return all events with status 200', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Event.find = jest.fn().mockResolvedValue([{ name: 'Event1' }, { name: 'Event2' }]);

            await getEvents(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ name: 'Event1' }, { name: 'Event2' }]);
        });
    });

    describe('getAvailableEvents', () => {
        it('should return available events for a volunteer', async () => {
            const req = { user: { userId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            VolunteerProfile.findOne = jest.fn().mockResolvedValue({ confirmedEvents: [{ _id: '507f1f77bcf86cd799439012' }] });
            Event.find = jest.fn().mockResolvedValue([{ _id: '507f1f77bcf86cd799439013' }]);

            await getAvailableEvents(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ _id: '507f1f77bcf86cd799439013' }]);
        });

        it('should return status 404 if volunteer not found', async () => {
            const req = { user: { userId: 'nonexistent' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            VolunteerProfile.findOne = jest.fn().mockResolvedValue(null);

            await getAvailableEvents(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer not found' });
        });
    });

    describe('getScheduledEvents', () => {
        it('should return scheduled events for a volunteer', async () => {
            const req = { user: { userId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            VolunteerProfile.findOne = jest.fn().mockResolvedValue({ confirmedEvents: [{ _id: '507f1f77bcf86cd799439012' }] });

            await getScheduledEvents(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ _id: '507f1f77bcf86cd799439012' }]);
        });
    });

    describe('unregisterVolunteerFromEvent', () => {
        it('should unregister a volunteer from an event and return status 200', async () => {
            const req = { body: { eventId: '507f1f77bcf86cd799439012' }, user: { userId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            VolunteerProfile.findOne = jest.fn().mockResolvedValue({
                confirmedEvents: [{ toString: () => '507f1f77bcf86cd799439012' }],
                save: jest.fn(),
            });

            await unregisterVolunteerFromEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer unregistered from event successfully' });
        });

        it('should return status 404 if volunteer is not found', async () => {
            const req = { body: { eventId: '507f1f77bcf86cd799439012' }, user: { userId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            VolunteerProfile.findOne = jest.fn().mockResolvedValue(null);

            await unregisterVolunteerFromEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer not found' });
        });

        it('should handle error if volunteer not registered for event', async () => {
            const req = { body: { eventId: '507f1f77bcf86cd799439012' }, user: { userId: '507f1f77bcf86cd799439011' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            
            VolunteerProfile.findOne = jest.fn().mockResolvedValue({
                confirmedEvents: [{ toString: () => '507f1f77bcf86cd799439013' }],
                save: jest.fn(),
            });

            await unregisterVolunteerFromEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(400); // Adjust based on your actual logic
            expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer not registered for this event' }); // Adjust based on your actual logic
        });
    });
});









//new 
// const mongoose = require('mongoose');
// const { createEvent, registerVolunteerToEvent, getEvents, getAvailableEvents, getScheduledEvents, unregisterVolunteerFromEvent } = require('./eventController');
// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Notification = require('../models/notificationModel');

// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/notificationModel');

// describe('Event Controller', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     describe('createEvent', () => {
//         it('should create a new event and return status 201', async () => {
//             const req = {
//                 body: {
//                     name: 'Community Cleanup',
//                     description: 'A cleanup event for the local park',
//                     address1: '456 Park Lane',
//                     address2: '',
//                     city: 'Houston',
//                     state: 'TX',
//                     zipcode: '77002',
//                     skillsRequired: ['Teamwork'],
//                     urgency: 'High',
//                     date: '2024-10-21',
//                     timeStart: '10:00 AM',
//                     timeEnd: '2:00 PM',
//                 }
//             };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             Event.prototype.save = jest.fn().mockResolvedValue({});
//             Notification.prototype.save = jest.fn().mockResolvedValue({});

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Event created successfully', eventId: expect.anything() });
//         });

//         it('should return status 400 if required fields are missing', async () => {
//             const req = { body: { name: 'Community Cleanup' } }; // Missing required fields
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//         });
//     });

//     describe('registerVolunteerToEvent', () => {
//         it('should register a volunteer to an event and return status 200', async () => {
//             const req = { body: { eventId: '607f1f77bcf86cd799439011', volunteerId: '507f1f77bcf86cd799439011' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             Event.findById = jest.fn().mockResolvedValue({ registeredVolunteers: [], save: jest.fn() });
//             VolunteerProfile.findOne = jest.fn().mockResolvedValue({ confirmedEvents: [], save: jest.fn() });

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer registered for event' });
//         });

//         it('should return status 404 if event or volunteer is not found', async () => {
//             const req = { body: { eventId: '607f1f77bcf86cd799439011', volunteerId: '507f1f77bcf86cd799439011' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             Event.findById = jest.fn().mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Event not found' });
//         });
//     });

//     describe('getEvents', () => {
//         it('should return all events with status 200', async () => {
//             const req = {};
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             Event.find = jest.fn().mockResolvedValue([{ name: 'Event1' }, { name: 'Event2' }]);

//             await getEvents(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith([{ name: 'Event1' }, { name: 'Event2' }]);
//         });
//     });

//     describe('getAvailableEvents', () => {
//         it('should return available events for a volunteer', async () => {
//             const req = { user: { userId: '507f1f77bcf86cd799439011' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             VolunteerProfile.findOne = jest.fn().mockResolvedValue({ confirmedEvents: [{ _id: '507f1f77bcf86cd799439012' }] });
//             Event.find = jest.fn().mockResolvedValue([{ _id: '507f1f77bcf86cd799439013' }]);

//             await getAvailableEvents(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith([{ _id: '507f1f77bcf86cd799439013' }]);
//         });
//     });

//     describe('getScheduledEvents', () => {
//         it('should return scheduled events for a volunteer', async () => {
//             const req = { user: { userId: '507f1f77bcf86cd799439011' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             VolunteerProfile.findOne = jest.fn().mockResolvedValue({ confirmedEvents: [{ _id: '507f1f77bcf86cd799439012' }] });

//             await getScheduledEvents(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith([{ _id: '507f1f77bcf86cd799439012' }]);
//         });
//     });

//     describe('unregisterVolunteerFromEvent', () => {
//         it('should unregister a volunteer from an event and return status 200', async () => {
//             const req = { body: { eventId: '507f1f77bcf86cd799439012' }, user: { userId: '507f1f77bcf86cd799439011' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             VolunteerProfile.findOne = jest.fn().mockResolvedValue({
//                 confirmedEvents: [{ toString: () => '507f1f77bcf86cd799439012' }],
//                 save: jest.fn(),
//             });

//             await unregisterVolunteerFromEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer unregistered from event successfully' });
//         });

//         it('should return status 404 if volunteer is not found', async () => {
//             const req = { body: { eventId: '507f1f77bcf86cd799439012' }, user: { userId: '507f1f77bcf86cd799439011' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             VolunteerProfile.findOne = jest.fn().mockResolvedValue(null);

//             await unregisterVolunteerFromEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer not found' });
//         });
//     });
// });









//11/01
// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel'); // Mock the Event model

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-10-21',
//                 time: '10:00 AM',
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should create an event successfully', async () => {
//         // Mock save method of the Event model to return an event with _id
//         Event.prototype.save = jest.fn().mockResolvedValue({ _id: '123' });

//         await createEvent(req, res);

//         // Expect status to be 201 and json response with the mocked eventId
//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Event created successfully',
//             eventId: '123',
//         });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Empty request body to simulate missing fields

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//     });

//     it('should return 500 if event creation fails', async () => {
//         // Mock save to simulate a database error
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to create event' });
//     });
// });




// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-10-21',
//                 time: '10:00 AM',
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should create an event successfully', async () => {
//         // Mock Event.save to return an object with _id '123'
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockResolvedValue({ _id: '123' }),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Event created successfully',
//             eventId: '123',
//         });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Empty request body to simulate missing fields

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//     });

//     it('should return 500 if event creation fails', async () => {
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockRejectedValue(new Error('Database error')),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to create event' });
//     });
// });




// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-10-21',
//                 time: '10:00 AM',
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should create an event successfully', async () => {
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockResolvedValue({ _id: '123' }),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Event created successfully',
//             eventId: '123',
//         });
//     });

//     it('should return 500 if event creation fails', async () => {
//         Event.mockImplementation(() => ({
//             save: jest.fn().mockRejectedValue(new Error('Database error')),
//         }));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to create event' });
//     });
// });

// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel'); // Mock the Event model

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-10-21',
//                 time: '10:00 AM',
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should create an event successfully', async () => {
//         Event.prototype.save = jest.fn().mockResolvedValue({ _id: '123', ...req.body });

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Event created successfully',
//             eventId: '123',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to create event' });
//     });
// });

// 10/31//
//eventController.test.js
// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel'); // Mock the Event model

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-10-21',
//                 time: '10:00 AM',
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
//             msg: 'Event created successfully',
//             eventId: '123',
//         });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         // Remove required field to simulate missing data
//         req.body.name = '';

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Please fill all required fields',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mock server error
//         Event.prototype.save = jest.fn().mockImplementation(() => {
//             return Promise.resolve({ _id: '123', ...req.body });
//         });

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Failed to create event',
//         });
//     });
// });

// // Suppress console logs
// beforeAll(() => {
//     jest.spyOn(console, 'log').mockImplementation(() => { });
// });

// afterAll(() => {
//     console.log.mockRestore();
// });

// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel');

// describe('EventController - createEvent', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 name: 'Community Cleanup',
//                 description: 'A cleanup event for the local park',
//                 address1: '456 Park Lane',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77002',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-10-21',
//                 time: '10:00 AM',
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should create an event successfully', async () => {
//         Event.prototype.save = jest.fn().mockResolvedValue({
//             _id: '123',
//             ...req.body,
//         });

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Event created successfully',
//             eventId: '123',
//         });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body.name = ''; // Remove a required field

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Please fill all required fields',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Failed to create event',
//         });
//     });
// });

//10/31
// 10/31// eventController.test.js
// // eventController.test.js
// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel'); // Mock the Event model

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
//             msg: 'Event created successfully.',
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
//             msg: 'Please fill all required fields', // Match your controller’s actual message
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mock server error
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Internal server error',
//             error: 'Database error',
//         });
//     });
// });
// beforeAll(() => {
//     jest.spyOn(console, 'log').mockImplementation(() => { });
// });

// afterAll(() => {
//     console.log.mockRestore();
// });

// const { createEvent } = require('../controllers/eventController');
// const Event = require('../models/eventModel');

// jest.mock('../models/eventModel'); // Mock the Event model

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
//             msg: 'Event created successfully.', // Match with your controller response
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
//             msg: 'Please fill all required fields', // Adjust to match your controller’s response
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mock server error
//         Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

//         await createEvent(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Internal server error', // Match with your controller response
//             error: 'Database error',
//         });
//     });
// });
//10/31

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
