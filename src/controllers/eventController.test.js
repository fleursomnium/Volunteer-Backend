

const { createEvent } = require('../controllers/eventController');
const Event = require('../models/eventModel');

// Mock the Event model
jest.mock('../models/eventModel');

describe('Event Controller - createEvent', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                eventName: 'Community Cleanup',
                eventDescription: 'Help clean the local park.',
                address1: '123 Main St',
                city: 'Spring',
                state: 'TX',
                zipcode: '77777',
                urgency: 'High',
                skills: ['cleaning', 'organization'],
                dates: [new Date('2024-10-17')],
                time: '14:00'
            }
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
    });

    it('should create an event successfully', async () => {
        Event.prototype.save = jest.fn().mockResolvedValue(req.body); // Mock successful save

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Event created successfully.',
            event: req.body,
        });
    });

    it('should return 400 if required fields are missing', async () => {
        req.body.eventName = ''; // Simulate missing eventName

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Missing required fields.',
        });
    });

    it('should return 500 if there is an internal server error', async () => {
        Event.prototype.save = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal server error',
            error: expect.any(Error),
        });
    });
});


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
