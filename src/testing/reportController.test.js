






const request = require('supertest');
const express = require('express');
const reportController = require('../controllers/reportController');
const VolunteerProfile = require('../models/volunteerProfileModel');
const Event = require('../models/eventModel');

// Mock the Mongoose models
jest.mock('../models/volunteerProfileModel');
jest.mock('../models/eventModel');

const app = express();
app.use(express.json());

// Define routes for testing
app.get('/volunteers-report', reportController.getVolunteersReport);
app.get('/events-report', reportController.getEventsReport);
app.get('/volunteers-csv', reportController.generateVolunteersCSV);
app.get('/volunteers-pdf', reportController.generateVolunteersPDF);
app.get('/events-csv', reportController.generateEventsCSV);
app.get('/events-pdf', reportController.generateEventsPDF);

describe('Report Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('getVolunteersReport', () => {
        it('should return a list of volunteers', async () => {
            const mockVolunteers = [
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    userId: { email: 'john@example.com' },
                    confirmedEvents: [{ name: 'Event 1', date: '2024-01-01' }],
                    history: [{ name: 'Event 2', date: '2024-02-01' }],
                },
            ];

            VolunteerProfile.find.mockResolvedValue(mockVolunteers);

            const response = await request(app).get('/volunteers-report');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockVolunteers);
        });

        it('should handle errors gracefully', async () => {
            VolunteerProfile.find.mockImplementation(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get('/volunteers-report');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to fetch volunteers report');
        });
    });

    describe('getEventsReport', () => {
        it('should return a list of events', async () => {
            const mockEvents = [
                {
                    name: 'Event 1',
                    date: new Date('2024-01-01'),
                    registeredVolunteers: [
                        { firstName: 'Jane', lastName: 'Smith', userId: { email: 'jane@example.com' } },
                    ],
                },
            ];

            Event.find.mockResolvedValue(mockEvents);

            const response = await request(app).get('/events-report');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockEvents);
        });

        it('should handle errors gracefully', async () => {
            Event.find.mockImplementation(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get('/events-report');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to fetch events report');
        });
    });

    describe('generateVolunteersCSV', () => {
        it('should generate a CSV report for volunteers', async () => {
            const mockVolunteers = [
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    userId: { email: 'john@example.com' },
                    confirmedEvents: [{ name: 'Event 1', date: '2024-01-01' }],
                    history: [{ name: 'Event 2', date: '2024-02-01' }],
                },
            ];

            VolunteerProfile.find.mockResolvedValue(mockVolunteers);

            const response = await request(app).get('/volunteers-csv');
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('text/csv');
        });

        it('should handle errors gracefully', async () => {
            VolunteerProfile.find.mockImplementation(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get('/volunteers-csv');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to generate CSV report');
        });
    });

    describe('generateVolunteersPDF', () => {
        it('should generate a PDF report for volunteers', async () => {
            const mockVolunteers = [
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    userId: { email: 'john@example.com' },
                    confirmedEvents: [{ name: 'Event 1', date: '2024-01-01' }],
                    history: [{ name: 'Event 2', date: '2024-02-01' }],
                },
            ];

            VolunteerProfile.find.mockResolvedValue(mockVolunteers);

            const response = await request(app).get('/volunteers-pdf');
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('application/pdf');
        });

        it('should handle errors gracefully', async () => {
            VolunteerProfile.find.mockImplementation(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get('/volunteers-pdf');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to generate PDF report');
        });
    });

    // Similar tests for generateEventsCSV and generateEventsPDF...
});





// //11/17
// const request = require('supertest');
// const express = require('express');
// const mongoose = require('mongoose');
// const { Parser } = require('json2csv');
// const PDFDocument = require('pdfkit');
// const reportController = require('../controllers/reportController');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Event = require('../models/eventModel');

// // Mocking the models
// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/eventModel');

// const app = express();
// app.use(express.json());

// // Mock routes for testing
// app.get('/volunteers-report', reportController.getVolunteersReport);
// app.get('/events-report', reportController.getEventsReport);
// app.get('/volunteers-csv', reportController.generateVolunteersCSV);
// app.get('/volunteers-pdf', reportController.generateVolunteersPDF);
// app.get('/events-csv', reportController.generateEventsCSV);
// app.get('/events-pdf', reportController.generateEventsPDF);

// describe('Report Controller', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     describe('getVolunteersReport', () => {
//         it('should return a list of volunteers', async () => {
//             const mockVolunteers = [
//                 {
//                     firstName: 'John',
//                     lastName: 'Doe',
//                     userId: { email: 'john@example.com' },
//                     confirmedEvents: [{ name: 'Event 1', date: '2024-01-01' }],
//                     history: [{ name: 'Event 2', date: '2024-02-01' }],
//                 },
//             ];
//             VolunteerProfile.find.mockResolvedValue(mockVolunteers);

//             const response = await request(app).get('/volunteers-report');
//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(mockVolunteers);
//         });

//         it('should handle errors gracefully', async () => {
//             VolunteerProfile.find.mockRejectedValue(new Error('Database error'));

//             const response = await request(app).get('/volunteers-report');
//             expect(response.status).toBe(500);
//             expect(response.body.msg).toBe('Failed to fetch volunteers report');
//         });
//     });

//     describe('getEventsReport', () => {
//         it('should return a list of events', async () => {
//             const mockEvents = [
//                 {
//                     name: 'Event 1',
//                     date: new Date('2024-01-01'),
//                     registeredVolunteers: [
//                         { firstName: 'Jane', lastName: 'Smith', userId: { email: 'jane@example.com' } },
//                     ],
//                 },
//             ];
//             Event.find.mockResolvedValue(mockEvents);

//             const response = await request(app).get('/events-report');
//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(mockEvents);
//         });

//         it('should handle errors gracefully', async () => {
//             Event.find.mockRejectedValue(new Error('Database error'));

//             const response = await request(app).get('/events-report');
//             expect(response.status).toBe(500);
//             expect(response.body.msg).toBe('Failed to fetch events report');
//         });
//     });

//     describe('generateVolunteersCSV', () => {
//         it('should generate a CSV report for volunteers', async () => {
//             const mockVolunteers = [
//                 {
//                     firstName: 'John',
//                     lastName: 'Doe',
//                     userId: { email: 'john@example.com' },
//                     confirmedEvents: [{ name: 'Event 1', date: '2024-01-01' }],
//                     history: [{ name: 'Event 2', date: '2024-02-01' }],
//                 },
//             ];
//             VolunteerProfile.find.mockResolvedValue(mockVolunteers);

//             const response = await request(app).get('/volunteers-csv');
//             expect(response.status).toBe(200);
//             expect(response.header['content-type']).toBe('text/csv; charset=utf-8');
//         });

//         it('should handle errors gracefully', async () => {
//             VolunteerProfile.find.mockRejectedValue(new Error('Database error'));

//             const response = await request(app).get('/volunteers-csv');
//             expect(response.status).toBe(500);
//             expect(response.body.msg).toBe('Failed to generate CSV report');
//         });
//     });

//     describe('generateVolunteersPDF', () => {
//         it('should generate a PDF report for volunteers', async () => {
//             const mockVolunteers = [
//                 {
//                     firstName: 'John',
//                     lastName: 'Doe',
//                     userId: { email: 'john@example.com' },
//                     confirmedEvents: [{ name: 'Event 1', date: '2024-01-01' }],
//                     history: [{ name: 'Event 2', date: '2024-02-01' }],
//                 },
//             ];
//             VolunteerProfile.find.mockResolvedValue(mockVolunteers);

//             const response = await request(app).get('/volunteers-pdf');
//             expect(response.status).toBe(200);
//             expect(response.header['content-type']).toBe('application/pdf');
//         });

//         it('should handle errors gracefully', async () => {
//             VolunteerProfile.find.mockRejectedValue(new Error('Database error'));

//             const response = await request(app).get('/volunteers-pdf');
//             expect(response.status).toBe(500);
//             expect(response.body.msg).toBe('Failed to generate PDF report');
//         });
//     });

//     // Similar tests can be written for `generateEventsCSV` and `generateEventsPDF`
// });
