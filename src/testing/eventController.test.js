const mongoose = require('mongoose');
const { createEvent, getAvailableEvents } = require('../controllers/eventController');
const VolunteerProfile = require('../models/volunteerProfileModel');
const Event = require('../models/eventModel');
const Notification = require('../models/notificationModel');

jest.mock('../models/volunteerProfileModel');
jest.mock('../models/eventModel');
jest.mock('../models/notificationModel');

describe('Event Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create an event successfully', async () => {
        const req = {
            body: {
                name: 'Community Cleanup',
                description: 'A park cleanup event',
                address1: '123 Main St',
                city: 'Houston',
                state: 'TX',
                zipcode: '77001',
                skillsRequired: ['Teamwork'],
                urgency: 'High',
                date: '2024-12-10',
                timeStart: '10:00',
                timeEnd: '15:00',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the save method for Event and Notification models
        Event.prototype.save = jest.fn().mockResolvedValue({
            _id: 'event123',
            ...req.body,
        });
        Notification.prototype.save = jest.fn().mockResolvedValue({});

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'Event created successfully',
            eventId: 'event123',
        });
    });

    it('should return available events', async () => {
        const req = {
            user: { userId: 'user123' },
            params: {},
            body: {},
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock VolunteerProfile.findOne().populate()
        VolunteerProfile.findOne.mockReturnValue({
            populate: jest.fn().mockResolvedValue({
                confirmedEvents: [{ _id: new mongoose.Types.ObjectId('64f987ecf9f9f9f9f9f9f9f9') }],
            }),
        });

        // Mock Event.find().populate()
        Event.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue([
                { _id: new mongoose.Types.ObjectId('64f987ecf9f9f9f9f9f9f9f9'), name: 'Community Cleanup' },
                { _id: new mongoose.Types.ObjectId('64f123ecf9f9f9f9f9f9f9f1'), name: 'Beach Cleanup' },
            ]),
        });

        await getAvailableEvents(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { _id: '64f123ecf9f9f9f9f9f9f9f1', name: 'Beach Cleanup' },
        ]);
    });
});









// const {
//     createEvent,
//     registerVolunteerToEvent,
// } = require('../controllers/eventController');
// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Notification = require('../models/notificationModel');

// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/notificationModel');

// describe('EventController', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {},
//             params: {},
//             user: { userId: '60d5ec49b9d6c70f243d33f2' },
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();

//         // Mock save methods for Event and Notification
//         Event.prototype.save = jest.fn();
//         Notification.prototype.save = jest.fn();
//     });

//     describe('createEvent', () => {
//         it('should create an event successfully', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             Event.prototype.save.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 ...req.body,
//             });
//             Notification.prototype.save.mockResolvedValue({});

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 msg: 'Event created successfully',
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//             });
//         });

//         it('should return 400 if required fields are missing', async () => {
//             req.body = { name: 'Cleanup' };

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//         });

//         it('should return 500 if there is a server error', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             Event.prototype.save.mockRejectedValue(new Error('Database error'));

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to create event' });
//         });
//     });

//     describe('registerVolunteerToEvent', () => {
//         it('should register a volunteer to an event', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             const mockEvent = {
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };
//             const mockVolunteer = {
//                 _id: '60d5ec49b9d6c70f243d33f1',
//                 confirmedEvents: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };

//             Event.findById.mockResolvedValue(mockEvent);
//             VolunteerProfile.findOne.mockResolvedValue(mockVolunteer);

//             await registerVolunteerToEvent(req, res);

//             expect(mockEvent.registeredVolunteers).toContain('60d5ec49b9d6c70f243d33f1');
//             expect(mockEvent.save).toHaveBeenCalled();
//             expect(mockVolunteer.save).toHaveBeenCalled();
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer registered for event' });
//         });

//         it('should return 404 if the event is not found', async () => {
//             req.body = { eventId: '60d5ec49b9d6c70f243d33f0' };

//             Event.findById.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Event not found' });
//         });

//         it('should return 404 if the volunteer profile is not found', async () => {
//             req.body = { eventId: '60d5ec49b9d6c70f243d33f0', volunteerId: '60d5ec49b9d6c70f243d33f1' };

//             const mockEvent = {
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };

//             Event.findById.mockResolvedValue(mockEvent);
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer not found' });
//         });

//         it('should return 500 if there is a server error', async () => {
//             req.body = { eventId: '60d5ec49b9d6c70f243d33f0', volunteerId: '60d5ec49b9d6c70f243d33f1' };

//             Event.findById.mockRejectedValue(new Error('Database error'));

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
//         });
//     });
// });












// const {
//     createEvent,
//     registerVolunteerToEvent,
// } = require('../controllers/eventController');
// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Notification = require('../models/notificationModel');

// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/notificationModel');

// describe('EventController', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {},
//             params: {},
//             user: { userId: '60d5ec49b9d6c70f243d33f2' },
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('createEvent', () => {
//         it('should create an event successfully', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             Event.prototype.save.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 ...req.body,
//             });
//             Notification.prototype.save.mockResolvedValue({});

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 msg: 'Event created successfully',
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//             });
//         });

//         it('should return 400 if required fields are missing', async () => {
//             req.body = { name: 'Cleanup' };

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//         });

//         it('should return 500 if there is a server error', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             Event.prototype.save.mockRejectedValue(new Error('Database error'));

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to create event' });
//         });
//     });

//     describe('registerVolunteerToEvent', () => {
//         it('should register a volunteer to an event', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             const mockEvent = {
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };
//             const mockVolunteer = {
//                 _id: '60d5ec49b9d6c70f243d33f1',
//                 confirmedEvents: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };

//             Event.findById.mockResolvedValue(mockEvent);
//             VolunteerProfile.findOne.mockResolvedValue(mockVolunteer);

//             await registerVolunteerToEvent(req, res);

//             expect(mockEvent.registeredVolunteers).toContain('60d5ec49b9d6c70f243d33f1');
//             expect(mockEvent.save).toHaveBeenCalled();
//             expect(mockVolunteer.save).toHaveBeenCalled();
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer registered for event' });
//         });

//         it('should return 404 if the event is not found', async () => {
//             req.body = { eventId: '60d5ec49b9d6c70f243d33f0' };

//             Event.findById.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Event not found' });
//         });

//         it('should return 404 if the volunteer profile is not found', async () => {
//             req.body = { eventId: '60d5ec49b9d6c70f243d33f0', volunteerId: '60d5ec49b9d6c70f243d33f1' };

//             const mockEvent = {
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };

//             Event.findById.mockResolvedValue(mockEvent);
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer not found' });
//         });

//         it('should return 500 if there is a server error', async () => {
//             req.body = { eventId: '60d5ec49b9d6c70f243d33f0', volunteerId: '60d5ec49b9d6c70f243d33f1' };

//             Event.findById.mockRejectedValue(new Error('Database error'));

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to create event' });
//         });
//     });
// });







// const {
//     createEvent,
//     registerVolunteerToEvent,
// } = require('../controllers/eventController');
// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Notification = require('../models/notificationModel');

// // Mock the required models
// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/notificationModel');

// describe('EventController', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {},
//             params: {},
//             user: { userId: '60d5ec49b9d6c70f243d33f2' }, // Mock valid ObjectId
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('createEvent', () => {
//         it('should create an event successfully', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             // Mock the save methods for Event and Notification
//             Event.prototype.save.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 ...req.body,
//             });
//             Notification.prototype.save.mockResolvedValue({});

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 msg: 'Event created successfully',
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//             });
//         });

//         it('should return 400 if required fields are missing', async () => {
//             req.body = { name: 'Cleanup' }; // Missing required fields

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//         });

//         it('should return 500 if there is a server error', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             Event.prototype.save.mockRejectedValue(new Error('Database error'));

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
//         });
//     });

//     describe('registerVolunteerToEvent', () => {
//         it('should register a volunteer to an event', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             // Mock Event and VolunteerProfile responses
//             const mockEvent = {
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };
//             const mockVolunteer = {
//                 _id: '60d5ec49b9d6c70f243d33f1',
//                 confirmedEvents: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };

//             Event.findById.mockResolvedValue(mockEvent);
//             VolunteerProfile.findOne.mockResolvedValue(mockVolunteer);

//             await registerVolunteerToEvent(req, res);

//             expect(mockEvent.registeredVolunteers).toContain('60d5ec49b9d6c70f243d33f1');
//             expect(mockEvent.save).toHaveBeenCalled();
//             expect(mockVolunteer.save).toHaveBeenCalled();
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer registered for event' });
//         });

//         it('should return 404 if the event is not found', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             Event.findById.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Event not found' });
//         });

//         it('should return 404 if the volunteer profile is not found', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             const mockEvent = {
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             };

//             Event.findById.mockResolvedValue(mockEvent);
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });

//         it('should return 500 if there is a server error', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             Event.findById.mockRejectedValue(new Error('Database error'));

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
//         });
//     });
// });








// const {
//     createEvent,
//     registerVolunteerToEvent,
// } = require('../controllers/eventController');
// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Notification = require('../models/notificationModel');

// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/notificationModel');

// describe('EventController', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {},
//             params: {},
//             user: { userId: '60d5ec49b9d6c70f243d33f2' }, // Valid ObjectId
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('createEvent', () => {
//         it('should create an event successfully', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             Event.prototype.save.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 ...req.body,
//             });
//             Notification.prototype.save.mockResolvedValue({});

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 msg: 'Event created successfully',
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//             });
//         });

//         it('should return 400 if required fields are missing', async () => {
//             req.body = { name: 'Cleanup' }; // Missing required fields

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//         });
//     });

//     describe('registerVolunteerToEvent', () => {
//         it('should register a volunteer to an event', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             Event.findById.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             });

//             VolunteerProfile.findOne.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f1',
//                 confirmedEvents: [],
//                 save: jest.fn().mockResolvedValue({}),
//             });

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer registered for event' });
//         });

//         it('should return 404 if event is not found', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             Event.findById.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Event not found' });
//         });
//     });
// });




// const {
//     createEvent,
//     registerVolunteerToEvent,
// } = require('../controllers/eventController');
// const Event = require('../models/eventModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Notification = require('../models/notificationModel');

// jest.mock('../models/eventModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/notificationModel');

// describe('EventController', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {},
//             params: {},
//             user: { userId: '60d5ec49b9d6c70f243d33f2' }, // Valid ObjectId
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('createEvent', () => {
//         it('should create an event successfully', async () => {
//             req.body = {
//                 name: 'Community Cleanup',
//                 description: 'A park cleanup event',
//                 address1: '123 Main St',
//                 address2: '',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 skillsRequired: ['Teamwork'],
//                 urgency: 'High',
//                 date: '2024-12-10',
//                 timeStart: '10:00',
//                 timeEnd: '15:00',
//             };

//             Event.prototype.save.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f0', // Mocked eventId
//                 ...req.body,
//             });
//             Notification.prototype.save.mockResolvedValue({});

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 msg: 'Event created successfully',
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//             });
//         });

//         it('should return 400 if required fields are missing', async () => {
//             req.body = { name: 'Cleanup' }; // Missing required fields

//             await createEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Please fill all required fields' });
//         });
//     });

//     describe('registerVolunteerToEvent', () => {
//         it('should register a volunteer to an event', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             Event.findById.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f0',
//                 registeredVolunteers: [],
//                 save: jest.fn().mockResolvedValue({}),
//             });

//             VolunteerProfile.findOne.mockResolvedValue({
//                 _id: '60d5ec49b9d6c70f243d33f1',
//                 confirmedEvents: [],
//                 save: jest.fn().mockResolvedValue({}),
//             });

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Volunteer registered for event' });
//         });

//         it('should return 404 if event is not found', async () => {
//             req.body = {
//                 eventId: '60d5ec49b9d6c70f243d33f0',
//                 volunteerId: '60d5ec49b9d6c70f243d33f1',
//             };

//             Event.findById.mockResolvedValue(null);

//             await registerVolunteerToEvent(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Event not found' });
//         });
//     });
// });





