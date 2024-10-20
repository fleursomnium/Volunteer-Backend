const request = require('supertest');
const { app } = require('../../server'); // Import your Express app
const VolunteerHistory = require('../models/VolunteerHistoryModel'); // Correct file name

 // Mock the VolunteerHistory model
const User = require('../models/userModel'); // Mock the User model

// Mocking the VolunteerHistory and User models
jest.mock('../models/volunteerHistoryModel', () => ({
    find: jest.fn(),
    findOneAndDelete: jest.fn(),
    save: jest.fn().mockImplementation(function () { return this; }),
    create: jest.fn(),
}));

jest.mock('../models/userModel', () => ({
    find: jest.fn(),
}));

describe('VolunteerHistory Controller', () => {
    let server;

    beforeAll(() => {
        server = app.listen(5000); // Start the server on a test port
    });

    afterAll(async () => {
        await server.close(); // Close the server after all tests are done
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock data after each test
    });

    it('should get all volunteers for an event', async () => {
        const mockVolunteers = [
            { _id: 'volunteer1', name: 'John Doe' },
            { _id: 'volunteer2', name: 'Jane Doe' },
        ];
        const mockHistory = [
            { volunteer: mockVolunteers[0], event: 'event1' },
            { volunteer: mockVolunteers[1], event: 'event1' },
        ];

        VolunteerHistory.find.mockResolvedValue(mockHistory);

        const response = await request(app).get('/api/volunteer-history/event/event1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockVolunteers); // We expect to receive volunteers
    });

    it('should get all volunteers (registered and unregistered)', async () => {
        const mockVolunteers = [
            { _id: 'volunteer1', name: 'John Doe' },
            { _id: 'volunteer2', name: 'Jane Doe' },
        ];

        User.find.mockResolvedValue(mockVolunteers);

        const response = await request(app).get('/api/volunteer-history/all');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockVolunteers); // We expect to receive all volunteers
    });

    it('should add a volunteer to an event', async () => {
        const mockVolunteer = { volunteer: 'volunteer1', event: 'event1', dateJoined: new Date(), status: 'confirmed' };

        VolunteerHistory.create.mockResolvedValue(mockVolunteer);

        const response = await request(app)
            .post('/api/volunteer-history/add')
            .send({ volunteerId: 'volunteer1', eventId: 'event1' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Volunteer added to event successfully');
        expect(response.body.history).toMatchObject(mockVolunteer); // Check if the returned data matches
    });

    it('should remove a volunteer from an event', async () => {
        VolunteerHistory.findOneAndDelete.mockResolvedValue(true);

        const response = await request(app)
            .post('/api/volunteer-history/remove')
            .send({ volunteerId: 'volunteer1', eventId: 'event1' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Volunteer removed from event successfully');
    });

    it('should return 404 if the volunteer is not found for removal', async () => {
        VolunteerHistory.findOneAndDelete.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/volunteer-history/remove')
            .send({ volunteerId: 'volunteer1', eventId: 'event1' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Volunteer not found in this event');
    });

    it('should return 500 on error fetching volunteers', async () => {
        VolunteerHistory.find.mockRejectedValue(new Error('Database Error'));

        const response = await request(app).get('/api/volunteer-history/event/event1');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error fetching registered volunteers');
    });
});
