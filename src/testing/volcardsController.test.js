const { getVolunteersForEvent } = require('../controllers/volcardsController');
const Event = require('../models/eventModel');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');

// Mock the Event model
jest.mock('../models/eventModel');

describe('getVolunteersForEvent Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 and the registered volunteers for a valid event', async () => {
        const eventId = new mongoose.Types.ObjectId().toString();
        req.params.eventId = eventId;

        const mockEvent = {
            name: 'Community Cleanup',
            registeredVolunteers: [
                { firstName: 'John', lastName: 'Doe', skills: ['Planning'], preferences: ['Outdoor'] },
                { firstName: 'Jane', lastName: 'Smith', skills: ['Teaching'], preferences: ['Remote'] },
            ],
        };

        // Mock `findById` to return a chainable `populate`
        const populateMock = jest.fn().mockResolvedValue(mockEvent);
        Event.findById.mockReturnValue({ populate: populateMock });

        await getVolunteersForEvent(req, res, next);

        expect(Event.findById).toHaveBeenCalledWith(eventId);
        expect(populateMock).toHaveBeenCalledWith({
            path: 'registeredVolunteers',
            select: 'firstName lastName skills preferences',
        });
        expect(res.statusCode).toBe(200);
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual({
            eventName: 'Community Cleanup',
            registeredVolunteers: mockEvent.registeredVolunteers,
        });
    });

    it('should return 404 if the event is not found', async () => {
        req.params.eventId = new mongoose.Types.ObjectId().toString();
        Event.findById.mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });

        await getVolunteersForEvent(req, res, next);

        expect(Event.findById).toHaveBeenCalled();
        expect(res.statusCode).toBe(404);
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual({ msg: 'Event not found' });
    });

    it('should return 500 if there is a server error', async () => {
        req.params.eventId = new mongoose.Types.ObjectId().toString();
        Event.findById.mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('Database error')),
        });

        await getVolunteersForEvent(req, res, next);

        expect(Event.findById).toHaveBeenCalled();
        expect(res.statusCode).toBe(500);
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual({ msg: 'Failed to fetch volunteers for event' });
    });
});
