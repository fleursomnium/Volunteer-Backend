const { registerUser } = require('../controllers/userController'); // Adjust path as needed
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

// Mock the User and Admin models and bcrypt
jest.mock('../models/userModel');
jest.mock('../models/adminModel');
jest.mock('bcryptjs');

const mockReq = (data) => ({
    body: data,
});

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('registerUser', () => {
    let req;
    let res;

    beforeEach(() => {
        req = mockReq({
            email: 'test@example.com',
            password: 'password123',
            role: 'volunteer',
        });
        res = mockRes();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clears the mocks after each test
    });

    it('should return 400 if the user already exists', async () => {
        User.findOne.mockResolvedValue({ email: 'test@example.com' }); // Simulate existing user

        await registerUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'User already exists with this email' });
    });

    it('should return 403 if the role is admin and the email is not in the admin list', async () => {
        req.body.role = 'admin';
        User.findOne.mockResolvedValue(null); // Simulate user not found
        Admin.findOne.mockResolvedValue(null); // Simulate admin not found

        await registerUser(req, res);

        expect(Admin.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized: email not allowed for admin registration' });
    });

    it('should hash the password and create a new user', async () => {
        User.findOne.mockResolvedValue(null); // Simulate no existing user
        Admin.findOne.mockResolvedValue({ email: 'test@example.com' }); // Simulate valid admin (if role is admin)
        bcrypt.hash.mockResolvedValue('hashedPassword123'); // Mock password hashing

        // Mock the save method on the User instance
        const mockUserSave = jest.fn().mockResolvedValue(true);
        User.mockImplementation(() => ({
            save: mockUserSave,
        }));

        await registerUser(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(mockUserSave).toHaveBeenCalled(); // Ensure the save function was called
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User registered successfully',
            role: 'volunteer',
        });
    });

    it('should handle errors and return 500 status code', async () => {
        const error = new Error('Internal Server Error');
        User.findOne.mockRejectedValue(error); // Simulate an error

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal server error during registration',
            error,
        });
    });
});

// // createUser.test.js gab
// const { createUser } = require('./userController');
// const { readJSON, writeJSON } = require('../utils/fileHandler');
// const path = require('path');

// // Mock path and file handling
// jest.mock('path', () => ({
//     join: jest.fn().mockReturnValue('mocked-file-path'),
//     dirname: jest.fn().mockReturnValue('mocked-dirname'),
// }));
// jest.mock('../utils/fileHandler', () => ({
//     readJSON: jest.fn(),
//     writeJSON: jest.fn(),
// }));

// describe('createUser', () => {
//     let mockRequest, mockResponse, mockNext;

//     beforeEach(() => {
//         mockRequest = {
//             body: {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 address1: '123 Main St',
//                 address2: 'Apt 4',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 preferences: 'Any',
//                 skills: ['Communication', 'Programming'],
//                 dates: ['2023-10-10', '2023-10-11'],
//                 time: '10:00',
//             },
//         };

//         mockResponse = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         mockNext = jest.fn();
//     });

//     it('should create a new user and respond with 201 status', async () => {
//         readJSON.mockResolvedValue([]); // Mock empty user list
//         writeJSON.mockResolvedValue(); // Mock successful write

//         await createUser(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledWith(201);
//         expect(mockResponse.json).toHaveBeenCalledWith({
//             message: 'User created successfully.',
//             user: expect.any(Object),
//         });

//         expect(writeJSON).toHaveBeenCalledWith('mocked-file-path', expect.any(Array));
//     });

//     it('should return 400 if required fields are missing', async () => {
//         mockRequest.body.firstName = ''; // Simulate missing firstName

//         await createUser(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledWith(400);
//         expect(mockResponse.json).toHaveBeenCalledWith({
//             message: 'Required fields: firstName, lastName, address1, city, state, and zipcode.',
//         });
//     });

//     it('should call next with error if an exception occurs', async () => {
//         readJSON.mockRejectedValue(new Error('Error reading file'));

//         await createUser(mockRequest, mockResponse, mockNext);

//         expect(mockNext).toHaveBeenCalledWith(new Error('Error reading file'));
//     });
// });

//10/17

// import { createUser } from "../controllers/userController.js";

// test("createUser function should be defined and is a function", () => {
//     expect(createUser).toBeDefined();
//     expect(typeof createUser).toBe("function");
// });

// test("Test user validation", () => {
//     const mockUser = {
//         firstName: "John",
//         lastName: "Doe",
//         address1: "123 Main St",
//         city: "Cityville",
//         state: "CA",
//         zipcode: "12345",
//         preferences: "none",
//         skills: ["JavaScript"],
//         dates: ["2024-10-07T20:27:41.275Z"],
//         time: "15:00",
//     };

//     const hasFullName = mockUser.firstName !== "" && mockUser.lastName !== "";

//     const isZipcodeValid = mockUser.zipcode.length === 5;

//     expect(hasFullName).toBe(true);
//     expect(isZipcodeValid).toBe(true);
// });



// import { createUser } from './userController';
// import { readJSON, writeJSON } from '../utils/fileHandler';
// import User from '../models/userModel';

// jest.mock('../utils/fileHandler');
// jest.mock('../models/userModel');

// describe('createUser', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = {
//             body: {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 address1: '123 Main St',
//                 address2: 'Apt 4',
//                 city: 'Cityville',
//                 state: 'CA',
//                 zipcode: '12345',
//                 preferences: 'none',
//                 skills: ['JavaScript'],
//                 dates: ['2024-10-07T20:27:41.275Z'],
//                 time: '15:00',
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         next = jest.fn();
//     });

//     afterEach(() => {
//         jest.clearAllMocks(); // Clear mocks between tests
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body.firstName = '';  // Simulate missing firstName

//         await createUser(req, res, next);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: "Required fields: firstName, lastName, address1, city, state, and zipcode.",
//         });
//     });

//     it('should create a new user and save it', async () => {
//         const mockUser = { ...req.body, id: 'unique-id', createdAt: new Date() };
//         User.mockImplementation(() => mockUser);
//         readJSON.mockResolvedValue([]); // Mock empty users array
//         writeJSON.mockResolvedValue();  // Mock write function

//         await createUser(req, res, next);

//         expect(User).toHaveBeenCalledWith(req.body);  // Check that User constructor was called with req.body
//         expect(readJSON).toHaveBeenCalledWith(expect.any(String));  // Check if readJSON was called
//         expect(writeJSON).toHaveBeenCalledWith(expect.any(String), expect.arrayContaining([mockUser])); // Check if user is written
//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User created successfully.',
//             user: mockUser,
//         });
//     });

//     it('should handle errors and call next with the error', async () => {
//         const mockError = new Error('File read error');
//         readJSON.mockRejectedValue(mockError); // Simulate error in reading the file

//         await createUser(req, res, next);

//         expect(next).toHaveBeenCalledWith(mockError);  // Check that next was called with the error
//     });
// });
