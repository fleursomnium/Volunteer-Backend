//
// statesController.test.js
const request = require('supertest');
const app = require('../../server'); // Adjust this path based on your app’s export
const mongoose = require('mongoose');
const States = require('../models/statesModel'); // Import States model to mock it

describe('GET /api/states', () => {
    afterAll(async () => {
        // Close the Mongoose connection after all tests
        await mongoose.connection.close();
    });

    it('should fetch all states', async () => {
        // Ensure test route is correct based on server setup
        const response = await request(app).get('/api/states');

        // Check response status
        expect(response.status).toBe(200);

        // Check if the response body is an array (assuming states are stored as an array)
        expect(Array.isArray(response.body)).toBe(true);

        // Check for expected fields in the states (if known)
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('name'); // Adjust based on actual model fields
        }
    });

    it('should handle errors properly', async () => {
        // Mock the `States.find` function to throw an error
        jest.spyOn(States, 'find').mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/api/states');

        // Check for a 500 status code when there's an error
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error fetching states');

        // Restore the mock
        States.find.mockRestore();
    });
});

// statesController.test.js
// const request = require('supertest');
// const app = require('../../server'); // Adjust this path based on your app’s export
// const mongoose = require('mongoose');

// describe('GET /states', () => {
//     afterAll(async () => {
//         // Close the Mongoose connection after all tests
//         await mongoose.connection.close();
//     });

//     it('should fetch all states', async () => {
//         const response = await request(app).get('/states'); // Adjust the route as needed

//         // Check response status
//         expect(response.status).toBe(200);

//         // Check if the response body is an array (assuming states are stored as an array)
//         expect(Array.isArray(response.body)).toBe(true);

//         // Check for expected fields in the states (if known)
//         if (response.body.length > 0) {
//             expect(response.body[0]).toHaveProperty('name'); // Adjust this field based on your model
//         }
//     });

//     it('should handle errors properly', async () => {
//         // Mock the `States.find` function to throw an error
//         jest.spyOn(require('../models/statesModel'), 'find').mockRejectedValue(new Error('Database error'));

//         const response = await request(app).get('/states');

//         // Check for a 500 status code when there's an error
//         expect(response.status).toBe(500);
//         expect(response.body).toHaveProperty('message', 'Error fetching states');

//         // Restore the mock
//         require('../models/statesModel').find.mockRestore();
//     });
// });
