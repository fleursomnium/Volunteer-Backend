











const mongoose = require('mongoose');
const {
    createEvent,
    getAvailableEvents,
    updateEvent,
    getEvent,
    getUpcomingEvents,
    getPastEvents,
    unregisterVolunteer,
    matchVolunteersToEvent
} = require('../controllers/eventController');
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
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        VolunteerProfile.findOne.mockReturnValue({
            populate: jest.fn().mockResolvedValue({
                confirmedEvents: [{ _id: new mongoose.Types.ObjectId('64f987ecf9f9f9f9f9f9f9f9') }],
            }),
        });

        Event.find.mockResolvedValue([
            { _id: new mongoose.Types.ObjectId('64f987ecf9f9f9f9f9f9f9f9'), name: 'Community Cleanup' },
            { _id: new mongoose.Types.ObjectId('64f123ecf9f9f9f9f9f9f9f1'), name: 'Beach Cleanup' },
        ]);

        await getAvailableEvents(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { _id: '64f123ecf9f9f9f9f9f9f9f1', name: 'Beach Cleanup' },
        ]);
    });

    it('should update an event successfully', async () => {
        const req = {
            params: { id: 'event123' },
            body: {
                name: 'Updated Event',
                description: 'An updated description',
                address1: '456 Elm St',
                city: 'Austin',
                state: 'TX',
                zipcode: '73301',
                skillsRequired: ['Leadership'],
                urgency: 'Medium',
                date: '2024-12-15',
                timeStart: '12:00',
                timeEnd: '14:00',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Event.findByIdAndUpdate.mockResolvedValue({
            _id: 'event123',
            ...req.body,
        });

        await updateEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'Event updated successfully',
            event: {
                _id: 'event123',
                ...req.body,
            },
        });
    });

    it('should fetch a single event successfully', async () => {
        const req = {
            params: { id: 'event123' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Event.findById.mockResolvedValue({
            _id: 'event123',
            name: 'Community Cleanup',
        });

        await getEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            _id: 'event123',
            name: 'Community Cleanup',
        });
    });

    it('should fetch upcoming events', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Event.find.mockResolvedValue([
            { _id: 'event123', name: 'Upcoming Event' },
        ]);

        await getUpcomingEvents({}, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { _id: 'event123', name: 'Upcoming Event' },
        ]);
    });

    it('should fetch past events', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Event.find.mockResolvedValue([
            { _id: 'event123', name: 'Past Event' },
        ]);

        await getPastEvents({}, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { _id: 'event123', name: 'Past Event' },
        ]);
    });

    it('should unregister a volunteer from an event', async () => {
        const req = {
            body: { eventId: 'event123', volunteerId: 'vol123' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Event.findById.mockResolvedValue({
            _id: 'event123',
            registeredVolunteers: ['vol123'],
            matchedVolunteers: [],
            save: jest.fn(),
        });

        VolunteerProfile.findById.mockResolvedValue({
            _id: 'vol123',
            confirmedEvents: ['event123'],
            save: jest.fn(),
        });

        await unregisterVolunteer(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'Successfully unregistered from the event.',
        });
    });

    it('should match volunteers to an event', async () => {
        const req = {
            params: { eventId: 'event123' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Event.findById.mockResolvedValue({
            _id: 'event123',
            skillsRequired: ['Teamwork'],
            address: { zipcode: '77001' },
            registeredVolunteers: [],
            matchedVolunteers: [],
            save: jest.fn(),
        });

        VolunteerProfile.find.mockResolvedValue([
            {
                _id: 'vol123',
                address: { zipcode: '77001' },
                skills: ['Teamwork'],
                availability: {},
            },
        ]);

        await matchVolunteersToEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: '1 new volunteers matched for the event.',
            matchedVolunteers: ['vol123'],
        });
    });
});




























