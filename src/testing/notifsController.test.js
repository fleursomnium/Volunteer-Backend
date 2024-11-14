const request = require('supertest'); // Import supertest for HTTP assertions
const { app } = require('../../server');  // Import the app from your server setup
const Notif = require('../models/notifsModel'); // Import the Notif model

// Mock the Notif model to simulate database behavior
jest.mock('../models/notifsModel', () => ({
    find: jest.fn(),
    create: jest.fn(),
}));

describe('Notification Controller', () => {
    // Test case for retrieving all notifications
    it('should retrieve all notifications successfully', async () => {
        // Mock notification data
        const mockNotifs = [
            { title: 'Notification 1', message: 'Message 1', date: new Date() },
            { title: 'Notification 2', message: 'Message 2', date: new Date() },
        ];

        // Mock the .find() method to return the mocked data
        Notif.find.mockResolvedValue(mockNotifs);

        // Make a GET request to fetch notifications
        const response = await request(app).get('/api/notifs');

        // Assertions for response status and body
        expect(response.status).toBe(200);  // Expect a 200 status code
        expect(response.body).toEqual(mockNotifs);  // Verify that the response matches the mock data
    });

    // Test case for creating a new notification
    it('should create a new notification successfully', async () => {
        // Define the new notification to be created
        const newNotif = { title: 'New Notification', message: 'New Message', date: new Date() };

        // Mock the .create() method to return the newly created notification
        Notif.create.mockResolvedValue(newNotif);

        // Make a POST request to create the notification
        const response = await request(app).post('/api/notifs').send(newNotif);

        // Assertions for response status and body
        expect(response.status).toBe(201);  // Expect a 201 status code
        expect(response.body).toEqual(newNotif);  // Verify that the response matches the new notification
    });
});