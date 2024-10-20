// src/models/eventModels.test.js
const { updateUserProfile } = require('../controllers/userController');
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('UserController - updateUserProfile', () => {

    // Test case for a successful update
    test('should update the user profile successfully', async () => {
        const req = {
            params: { userId: 'validUserId' },
            body: {
                firstName: 'John',
                lastName: 'Doe',
                preferences: ['preference1'],
                skills: ['skill1', 'skill2'],
                dates: ['2024-10-19'],
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Simulate a successful update
        User.findByIdAndUpdate.mockResolvedValue({
            firstName: 'John',
            lastName: 'Doe',
            preferences: ['preference1'],
            skills: ['skill1', 'skill2'],
            dates: ['2024-10-19'],
        });

        await updateUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User profile updated successfully.',
            user: expect.any(Object),
        });
    });

    // Test case for user not found (404)
    test('should return 404 if the user is not found', async () => {
        const req = {
            params: { userId: 'invalidUserId' },
            body: {
                firstName: 'John',
                lastName: 'Doe',
                preferences: ['preference1'],
                skills: ['skill1', 'skill2'],
                dates: ['2024-10-19'],
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Simulate user not found
        User.findByIdAndUpdate.mockResolvedValue(null);

        await updateUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User not found.',
        });
    });

    // Test case for missing required fields (400)
    test('should return 400 if required fields are missing', async () => {
        const req = {
            params: { userId: 'validUserId' },
            body: {
                firstName: '', // Missing required field
                lastName: 'Doe',
                preferences: ['preference1'],
                skills: ['skill1', 'skill2'],
                dates: ['2024-10-19'],
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required.',
        });
    });

    // Test case for server error (500)
    test('should return 500 if there is a server error', async () => {
        const req = {
            params: { userId: 'validUserId' },
            body: {
                firstName: 'John',
                lastName: 'Doe',
                preferences: ['preference1'],
                skills: ['skill1', 'skill2'],
                dates: ['2024-10-19'],
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Simulate a database error
        User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

        await updateUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error updating profile',
            error: 'Database error',
        });
    });

});

// // src/models/eventModels.test.js 7:53
// const { updateUserProfile } = require('../controllers/userController');
// const User = require('../models/userModel');

// // Mock the User model
// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             params: { id: '12345' },
//             body: { name: 'John Doe', email: 'john.doe@example.com' }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Incomplete data
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'All fields are required.'
//         });
//     });

//     it('should update the user profile successfully', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(req.body); // Mock successful update
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 404 if the user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null); // Simulate user not found
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found.'
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Internal server error')); // Simulate a server error
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error)
//         });
//     });
// });

// eventModels.test.js 6:15pm
// const Event = require('../models/eventModel');

// describe('Event Model', () => {
//     it('should create a new Event instance with valid properties', () => {
//         const eventData = {
//             name: 'Community Cleaning',
//             description: 'Help clean the park.',
//             location: 'Spring, TX',
//             date: [new Date('2024-10-17')],
//             urgency: 'high',
//             requiredSkills: ['cleaning', 'organization'],
//         };

//         const event = new Event(eventData);

//         expect(event.eventName).toBe(eventData.eventName);

//         expect(event.description).toBe(eventData.description);
//         expect(event.location).toBe(eventData.location);
//         expect(event.date[0]).toEqual(eventData.date[0]);
//         expect(event.urgency).toBe(eventData.urgency);
//         expect(event.requiredSkills).toEqual(eventData.requiredSkills);
//     });
// });

//best score
// const Event = require('../models/eventModel');

// describe('Event Model', () => {
//     it('should create a new Event instance with valid properties', () => {
//         const eventData = {
//             eventName: 'Community Cleaning',
//             description: 'Clean the parks and streets.',
//             location: {
//                 address: '12345',
//                 city: 'Spring',
//                 state: 'TX',
//                 zipcode: '77777',
//             },
//             urgency: 'low',
//             requiredSkills: ['cleaning', 'organizing'],
//             date: [new Date('2024-10-17')],
//             time: '14:00',
//         };

//         const event = new Event(eventData);

//         expect(event.eventName).toBe(eventData.eventName);
//         expect(event.description).toBe(eventData.description);
//         expect(event.location.city).toBe(eventData.location.city);
//         expect(event.urgency).toBe(eventData.urgency);
//         expect(event.requiredSkills).toEqual(eventData.requiredSkills);
//         expect(event.date).toEqual(eventData.date);
//         expect(event.time).toBe(eventData.time);
//     });
// });



// const Event = require("./eventModel");

// describe("Event Model", () => {
//     test("should create an event instance with correct properties", () => {
//         const data = {
//             name: "Test Event",
//             date: "2024-11-15",
//             location: "San Francisco",
//             description: "Test Description",
//         };
//         const event = new Event(data);

//         expect(event).toHaveProperty("id");
//         expect(event.name).toBe(data.name);
//         expect(event.date).toBe(data.date);
//         expect(event.location).toBe(data.location);
//         expect(event.description).toBe(data.description);
//         expect(event).toHaveProperty("createdAt");
//     });
// });
