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
