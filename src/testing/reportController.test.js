const request = require('supertest');
const express = require('express');
const reportController = require('../controllers/reportController');
const VolunteerProfile = require('../models/volunteerProfileModel');
const Event = require('../models/eventModel');

const app = express();
app.use(express.json());

app.get('/volunteers-report', reportController.getVolunteersReport);
app.get('/events-report', reportController.getEventsReport);
app.get('/volunteers-csv', reportController.generateVolunteersCSV);
app.get('/volunteers-pdf', reportController.generateVolunteersPDF);
app.get('/events-csv', reportController.generateEventsCSV);
app.get('/events-pdf', reportController.generateEventsPDF);

jest.mock('../models/volunteerProfileModel');
jest.mock('../models/eventModel');

describe('Report Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getVolunteersReport', () => {
        it('should return a list of volunteers', async () => {
            const mockVolunteers = [
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    userId: { email: 'john@example.com' },
                    confirmedEvents: [{ name: 'Event A' }],
                    history: [{ name: 'Event B' }],
                },
            ];
            VolunteerProfile.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockResolvedValue(mockVolunteers),
                })),
            }));

            const response = await request(app).get('/volunteers-report');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockVolunteers);
        });

        it('should handle errors gracefully', async () => {
            VolunteerProfile.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockRejectedValue(new Error('Database error')),
                })),
            }));

            const response = await request(app).get('/volunteers-report');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to fetch volunteers report');
        });
    });

    describe('getEventsReport', () => {
        it('should return a list of events', async () => {
            const mockEvents = [
                {
                    name: 'Event A',
                    date: new Date(),
                    registeredVolunteers: [{ firstName: 'John', lastName: 'Doe', userId: { email: 'john@example.com' } }],
                },
            ];
            Event.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockResolvedValue(mockEvents),
                })),
            }));

            const response = await request(app).get('/events-report');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockEvents);
        });

        it('should handle errors gracefully', async () => {
            Event.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockRejectedValue(new Error('Database error')),
                })),
            }));

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
                    confirmedEvents: [{ name: 'Event A' }],
                    history: [{ name: 'Event B' }],
                },
            ];
            VolunteerProfile.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockResolvedValue(mockVolunteers),
                })),
            }));

            const response = await request(app).get('/volunteers-csv');
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('text/csv');
        });

        it('should handle errors gracefully', async () => {
            VolunteerProfile.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockRejectedValue(new Error('Database error')),
                })),
            }));

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
                    confirmedEvents: [{ name: 'Event A' }],
                    history: [{ name: 'Event B' }],
                },
            ];
            VolunteerProfile.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockResolvedValue(mockVolunteers),
                })),
            }));

            const response = await request(app).get('/volunteers-pdf');
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('application/pdf');
        });

        it('should handle errors gracefully', async () => {
            VolunteerProfile.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockRejectedValue(new Error('Database error')),
                })),
            }));

            const response = await request(app).get('/volunteers-pdf');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to generate PDF report');
        });
    });

    describe('generateEventsCSV', () => {
        it('should generate a CSV report for events', async () => {
            const mockEvents = [
                {
                    name: 'Event A',
                    date: new Date(),
                    registeredVolunteers: [{ firstName: 'John', lastName: 'Doe', userId: { email: 'john@example.com' } }],
                },
            ];
            Event.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockResolvedValue(mockEvents),
                })),
            }));

            const response = await request(app).get('/events-csv');
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('text/csv');
        });

        it('should handle errors gracefully', async () => {
            Event.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockRejectedValue(new Error('Database error')),
                })),
            }));

            const response = await request(app).get('/events-csv');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to generate CSV report');
        });
    });

    describe('generateEventsPDF', () => {
        it('should generate a PDF report for events', async () => {
            const mockEvents = [
                {
                    name: 'Event A',
                    date: new Date(),
                    registeredVolunteers: [{ firstName: 'John', lastName: 'Doe', userId: { email: 'john@example.com' } }],
                },
            ];
            Event.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockResolvedValue(mockEvents),
                })),
            }));

            const response = await request(app).get('/events-pdf');
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('application/pdf');
        });

        it('should handle errors gracefully', async () => {
            Event.find.mockImplementation(() => ({
                populate: jest.fn().mockImplementation(() => ({
                    populate: jest.fn().mockRejectedValue(new Error('Database error')),
                })),
            }));

            const response = await request(app).get('/events-pdf');
            expect(response.status).toBe(500);
            expect(response.body.msg).toBe('Failed to generate PDF report');
        });
    });
});









// //42%
// const request = require('supertest');
// const express = require('express');
// const mongoose = require('mongoose');
// const reportController = require('../controllers/reportController');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const Event = require('../models/eventModel');

// const app = express();
// app.use(express.json());

// app.get('/volunteers-report', reportController.getVolunteersReport);
// app.get('/events-report', reportController.getEventsReport);
// app.get('/volunteers-csv', reportController.generateVolunteersCSV);
// app.get('/volunteers-pdf', reportController.generateVolunteersPDF);
// app.get('/events-csv', reportController.generateEventsCSV);
// app.get('/events-pdf', reportController.generateEventsPDF);

// jest.mock('../models/volunteerProfileModel');
// jest.mock('../models/eventModel');

// describe('Report Controller Tests', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     describe('getVolunteersReport', () => {
//         it('should return a list of volunteers', async () => {
//             const mockVolunteers = [
//                 {
//                     firstName: 'John',
//                     lastName: 'Doe',
//                     userId: { email: 'john@example.com' },
//                     confirmedEvents: [{ name: 'Event A' }],
//                     history: [{ name: 'Event B' }],
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
//                     name: 'Event A',
//                     date: new Date(),
//                     registeredVolunteers: [{ firstName: 'John', lastName: 'Doe', userId: { email: 'john@example.com' } }],
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
//                     confirmedEvents: [{ name: 'Event A' }],
//                     history: [{ name: 'Event B' }],
//                 },
//             ];
//             VolunteerProfile.find.mockResolvedValue(mockVolunteers);

//             const response = await request(app).get('/volunteers-csv');
//             expect(response.status).toBe(200);
//             expect(response.header['content-type']).toContain('text/csv');
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
//                     confirmedEvents: [{ name: 'Event A' }],
//                     history: [{ name: 'Event B' }],
//                 },
//             ];
//             VolunteerProfile.find.mockResolvedValue(mockVolunteers);

//             const response = await request(app).get('/volunteers-pdf');
//             expect(response.status).toBe(200);
//             expect(response.header['content-type']).toContain('application/pdf');
//         });

//         it('should handle errors gracefully', async () => {
//             VolunteerProfile.find.mockRejectedValue(new Error('Database error'));

//             const response = await request(app).get('/volunteers-pdf');
//             expect(response.status).toBe(500);
//             expect(response.body.msg).toBe('Failed to generate PDF report');
//         });
//     });

//     describe('generateEventsCSV', () => {
//         it('should generate a CSV report for events', async () => {
//             const mockEvents = [
//                 {
//                     name: 'Event A',
//                     date: new Date(),
//                     registeredVolunteers: [{ firstName: 'John', lastName: 'Doe', userId: { email: 'john@example.com' } }],
//                 },
//             ];
//             Event.find.mockResolvedValue(mockEvents);

//             const response = await request(app).get('/events-csv');
//             expect(response.status).toBe(200);
//             expect(response.header['content-type']).toContain('text/csv');
//         });

//         it('should handle errors gracefully', async () => {
//             Event.find.mockRejectedValue(new Error('Database error'));

//             const response = await request(app).get('/events-csv');
//             expect(response.status).toBe(500);
//             expect(response.body.msg).toBe('Failed to generate CSV report');
//         });
//     });

//     describe('generateEventsPDF', () => {
//         it('should generate a PDF report for events', async () => {
//             const mockEvents = [
//                 {
//                     name: 'Event A',
//                     date: new Date(),
//                     registeredVolunteers: [{ firstName: 'John', lastName: 'Doe', userId: { email: 'john@example.com' } }],
//                 },
//             ];
//             Event.find.mockResolvedValue(mockEvents);

//             const response = await request(app).get('/events-pdf');
//             expect(response.status).toBe(200);
//             expect(response.header['content-type']).toContain('application/pdf');
//         });

//         it('should handle errors gracefully', async () => {
//             Event.find.mockRejectedValue(new Error('Database error'));

//             const response = await request(app).get('/events-pdf');
//             expect(response.status).toBe(500);
//             expect(response.body.msg).toBe('Failed to generate PDF report');
//         });
//     });
// });



