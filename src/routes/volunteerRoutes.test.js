const express = require('express');
const request = require('supertest');
const volunteerRoutes = require('../routes/volunteerRoutes');
const verifyToken = require('../middleware/authMiddleware');

// Mock the controllers
jest.mock('../controllers/volunteerController', () => ({
    getVolunteerProfile: jest.fn((req, res) => res.status(200).json({ msg: 'Profile fetched' })),
    updateVolunteerProfile: jest.fn((req, res) => res.status(200).json({ msg: 'Profile updated' })),
    getVolunteerHistory: jest.fn((req, res) => res.status(200).json({ msg: 'History fetched' })),
    updateGeneralAvailability: jest.fn((req, res) =>
        res.status(200).json({ msg: 'General availability updated' })
    ),
    updateBlockedDates: jest.fn((req, res) =>
        res.status(200).json({ msg: 'Blocked dates updated' })
    ),
    updateSpecificAvailability: jest.fn((req, res) =>
        res.status(200).json({ msg: 'Specific availability updated' })
    ),
    updateAvailability: jest.fn((req, res) =>
        res.status(200).json({ msg: 'Availability updated' })
    ),
    getAvailability: jest.fn((req, res) => res.status(200).json({ msg: 'Availability fetched' })),
}));

// Mock the middleware
jest.mock('../middleware/authMiddleware', () =>
    jest.fn((req, res, next) => {
        req.user = { userId: 'mockUserId' }; // Mock user payload
        next();
    })
);

// Create a test app
const app = express();
app.use(express.json());
app.use('/api/volunteers', volunteerRoutes);

describe('Volunteer Routes', () => {
    test('GET /profile calls getVolunteerProfile', async () => {
        const response = await request(app).get('/api/volunteers/profile');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Profile fetched');
    });

    test('PUT /profile calls updateVolunteerProfile', async () => {
        const response = await request(app)
            .put('/api/volunteers/profile')
            .send({ firstName: 'John' });
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Profile updated');
    });

    test('GET /history calls getVolunteerHistory', async () => {
        const response = await request(app).get('/api/volunteers/history');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('History fetched');
    });

    test('POST /availability/general calls updateGeneralAvailability', async () => {
        const response = await request(app)
            .post('/api/volunteers/availability/general')
            .send({ Monday: { start: '09:00', end: '17:00' } });
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('General availability updated');
    });

    test('POST /availability/blocked calls updateBlockedDates', async () => {
        const response = await request(app)
            .post('/api/volunteers/availability/blocked')
            .send([{ date: '2024-11-21', start: '09:00', end: '11:00' }]);
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Blocked dates updated');
    });

    test('POST /availability/specific calls updateSpecificAvailability', async () => {
        const response = await request(app)
            .post('/api/volunteers/availability/specific')
            .send([{ date: '2024-11-21', start: '12:00', end: '14:00' }]);
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Specific availability updated');
    });

    test('PATCH /availability calls updateAvailability', async () => {
        const response = await request(app)
            .patch('/api/volunteers/availability')
            .send({ generalAvailability: { Monday: { start: '09:00', end: '17:00' } } });
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Availability updated');
    });

    test('GET /availability calls getAvailability', async () => {
        const response = await request(app).get('/api/volunteers/availability');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Availability fetched');
    });
});
