// const { updateUserProfile } = require('../controllers/userController');
// const User = require('../models/userModel');

// jest.mock('../models/userModel');

// const req = {
//     params: { userId: '123' },
//     body: {
//         firstName: 'John',
//         lastName: 'Doe',
//         address1: '123 Main St',
//         address2: 'Apt 4B',
//         city: 'Houston',
//         state: 'TX',
//         zipcode: '77001',
//         preferences: ['preference1'],
//         skills: ['skill1', 'skill2'],
//         dates: ['2024-10-19']
//     }
// };

// const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
// };

// afterEach(() => {
//     jest.clearAllMocks();
// });

// describe('UserController - updateUserProfile', () => {
//     it('should update the user profile successfully', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(req.body); // Mocking successful update
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 404 if user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null); // No user found
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found' // Match the exact format
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error)
//         });
//     });
// });


// const { updateUserProfile } = require('../controllers/userController');
// const User = require('../models/userModel');

// jest.mock('../models/userModel');

// const req = {
//     params: { userId: '123' },
//     body: {
//         firstName: 'John',
//         lastName: 'Doe',
//         address1: '123 Main St',
//         address2: 'Apt 4B',
//         city: 'Houston',
//         state: 'TX',
//         zipcode: '77001',
//         preferences: ['preference1'],
//         skills: ['skill1', 'skill2'],
//         dates: ['2024-10-19']
//     }
// };

// const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
// };

// afterEach(() => {
//     jest.clearAllMocks();
// });

// describe('UserController - updateUserProfile', () => {
//     it('should update the user profile successfully', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(req.body); // Mocking successful update
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 404 if user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null); // No user found
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found'
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: expect.any(Error)
//         });
//     });
// });  7:34
// userController.test.js

// const { updateUserProfile } = require('../controllers/userController');
// const User = require('../models/userModel');

// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             params: { userId: '123' },
//             body: {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 address1: '123 Main St',
//                 address2: 'Apt 4B',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 preferences: ['preference1'],
//                 skills: ['skill1', 'skill2'],
//                 dates: ['2024-10-19'],
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should update the user profile successfully', async () => {
//         // Mock successful update
//         User.findByIdAndUpdate.mockResolvedValue({
//             _id: '123',
//             ...req.body,
//         });

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: {
//                 _id: '123',
//                 ...req.body,
//             },
//         });
//     });

//     it('should return 404 if the user is not found', async () => {
//         // Mock user not found
//         User.findByIdAndUpdate.mockResolvedValue(null);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found.',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mock server error
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: 'Database error',
//         });
//     });
// }); 8:00
const { updateUserProfile } = require('../controllers/userController');
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('UserController - updateUserProfile', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { userId: '123' },
            body: {
                firstName: 'John',
                lastName: 'Doe',
                address1: '123 Main St',
                address2: 'Apt 4B',
                city: 'Houston',
                state: 'TX',
                zipcode: '77001',
                preferences: ['preference1'],
                skills: ['skill1', 'skill2'],
                dates: ['2024-10-19'],
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it('should update the user profile successfully', async () => {
        // Mock successful update
        User.findByIdAndUpdate.mockResolvedValue({
            _id: '123',
            ...req.body,
        });

        await updateUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User profile updated successfully.',
            user: {
                _id: '123',
                ...req.body,
            },
        });
    });

    it('should return 404 if the user is not found', async () => {
        // Mock user not found
        User.findByIdAndUpdate.mockResolvedValue(null);

        await updateUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User not found.',  // Make sure to match punctuation
        });
    });

    it('should return 500 if there is a server error', async () => {
        // Mock server error
        User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

        await updateUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error updating profile',
            error: 'Database error',  // If you want to match the string error, leave this
        });
    });
});


// const { updateUserProfile } = require('../controllers/userController');7:42
// const User = require('../models/userModel');

// jest.mock('../models/userModel');

// const req = {
//   params: { userId: '123' },
//   body: {
//     firstName: 'John',
//     lastName: 'Doe',
//     address1: '123 Main St',
//     address2: 'Apt 4B',
//     city: 'Houston',
//     state: 'TX',
//     zipcode: '77001',
//     preferences: ['preference1'],
//     skills: ['skill1', 'skill2'],
//     dates: ['2024-10-19'] // Ensure all required fields are present
//   }
// };

// const res = {
//   status: jest.fn(() => res),
//   json: jest.fn(),
// };

// afterEach(() => {
//   jest.clearAllMocks();
// });

// describe('UserController - updateUserProfile', () => {
//   it('should update the user profile successfully', async () => {
//     // Ensure the mock returns the body as expected for a successful update
//     User.findByIdAndUpdate.mockResolvedValue(req.body); 

//     await updateUserProfile(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'User profile updated successfully.',
//       user: req.body
//     });
//   });

//   it('should return 404 if user is not found', async () => {
//     // Mock the response to return null, simulating a user not found scenario
//     User.findByIdAndUpdate.mockResolvedValue(null);

//     await updateUserProfile(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'User not found'
//     });
//   });

//   it('should return 500 if there is a server error', async () => {
//     // Mock a rejected promise to simulate a server error
//     User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

//     await updateUserProfile(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Error updating profile',
//       error: expect.any(Error)
//     });
//   });
// });


// const { updateUserProfile } = require('../controllers/userController'); 7:37
// const User = require('../models/userModel');

// jest.mock('../models/userModel');

// const req = {
//     params: { userId: '123' },
//     body: {
//         firstName: 'John',
//         lastName: 'Doe',
//         address1: '123 Main St',
//         address2: 'Apt 4B',
//         city: 'Houston',
//         state: 'TX',
//         zipcode: '77001',
//         preferences: ['preference1'],
//         skills: ['skill1', 'skill2'],
//         dates: ['2024-10-19']
//     }
// };

// const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
// };

// afterEach(() => {
//     jest.clearAllMocks();
// });

// describe('UserController - updateUserProfile', () => {
//     it('should update the user profile successfully', async () => {
//         // Mocking successful update
//         User.findByIdAndUpdate.mockResolvedValue(req.body);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 404 if user is not found', async () => {
//         // Mocking user not found
//         User.findByIdAndUpdate.mockResolvedValue(null);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found'
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mocking a rejected promise to simulate a server error
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: expect.any(Error)
//         });
//     });
// });

// const { updateUserProfile } = require('../controllers/userController'); 7:36
// const User = require('../models/userModel');

// jest.mock('../models/userModel');

// const req = {
//     params: { userId: '123' },
//     body: {
//         firstName: 'John',
//         lastName: 'Doe',
//         address1: '123 Main St',
//         address2: 'Apt 4B',
//         city: 'Houston',
//         state: 'TX',
//         zipcode: '77001',
//         preferences: ['preference1'],
//         skills: ['skill1', 'skill2'],
//         dates: ['2024-10-19']
//     }
// };

// const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
// };

// afterEach(() => {
//     jest.clearAllMocks();
// });

// describe('UserController - updateUserProfile', () => {
//     it('should update the user profile successfully', async () => {
//         // Mocking successful update to return the updated user object
//         User.findByIdAndUpdate.mockResolvedValue(req.body);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 404 if user is not found', async () => {
//         // Mocking user not found by returning null
//         User.findByIdAndUpdate.mockResolvedValue(null);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found'
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Mocking a rejected promise to simulate a server error
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: expect.any(Error)
//         });
//     });
// });




// const { updateUserProfile } = require('../controllers/userController'); 6:49
// const User = require('../models/userModel');

// // Mock the User model
// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             params: { userId: '12345' },
//             body: {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 address1: '123 Main St',
//                 address2: 'Apt 4B',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 preferences: ['preference1'],
//                 skills: ['skill1', 'skill2'],
//                 dates: ['2024-10-19'],
//             }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Simulate missing required fields
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'All fields are required.'
//         });
//     });

//     it('should update the user profile successfully', async () => {
//         // Mock successful update
//         User.findByIdAndUpdate.mockResolvedValue(req.body);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith(req.body);
//     });

//     it('should return 404 if the user is not found', async () => {
//         // Simulate user not found
//         User.findByIdAndUpdate.mockResolvedValue(null);

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Simulate a server error
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Internal server error'));

//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: expect.any(Error)
//         });
//     });
// });

// const { updateUserProfile } = require('../controllers/userController');
// const User = require('../models/userModel');

// // Mock the User model
// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             params: { userId: '12345' },
//             body: {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 address1: '123 Main St',
//                 address2: 'Apt 4B',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 preferences: ['preference1'],
//                 skills: ['skill1', 'skill2'],
//                 dates: ['2024-10-19'],
//             }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Simulate missing required fields
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'All fields are required.'
//         });
//     });

//     it('should update the user profile successfully', async () => {
//         // Mock the resolved value of findByIdAndUpdate
//         User.findByIdAndUpdate.mockResolvedValue(req.body); // Simulate successful update
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith(req.body);
//     });

//     it('should return 404 if the user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null); // Simulate user not found
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         // Simulate a server error by rejecting the promise
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Internal server error'));
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: expect.any(Error)
//         });
//     });
// });

//6:28// const { updateUserProfile } = require('../controllers/userController');
// const User = require('../models/userModel');

// // Mock the User model
// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             params: { userId: '12345' },
//             body: {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 address1: '123 Main St',
//                 address2: 'Apt 4B',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 preferences: ['preference1'],
//                 skills: ['skill1', 'skill2'],
//                 dates: ['2024-10-19'],
//             }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Simulate missing required fields
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'All fields are required.'
//         });
//     });

//     it('should update the user profile successfully', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(req.body); // Simulate successful update
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith(req.body);
//     });

//     it('should return 404 if the user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null); // Simulate user not found
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found',
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Internal server error')); // Simulate a server error
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Error updating profile',
//             error: expect.any(Error)
//         });
//     });
// });

// const { updateUserProfile } = require('../controllers/userController'); 6:26
// const User = require('../models/userModel');

// // Mock the User model
// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             params: { id: '12345' },
//             body: { name: 'John Doe', email: 'john.doe@example.com' }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Incomplete data
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'All fields are required.'
//         });
//     });

//     it('should update the user profile successfully', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(req.body); // Mock successful update
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 404 if the user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null); // Simulate user not found
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User not found.'
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Internal server error')); // Simulate a server error
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error)
//         });
//     });
// });

// const { updateUserProfile } = require('../controllers/userController'); best 
// const User = require('../models/userModel');

// // Mock the User model
// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             params: { id: '12345' },
//             body: { name: 'John Doe', email: 'john.doe@example.com' }
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = {}; // Incomplete data
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'All fields are required.'
//         });
//     });

//     it('should update the user profile successfully', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(req.body);
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'User profile updated successfully.',
//             user: req.body
//         });
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Internal server error'));
//         await updateUserProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//             error: expect.any(Error)
//         });
//     });
// });


// const request = require('supertest');
// const express = require('express');
// const userController = require('../controllers/userController');
// const User = require('../models/userModel');

// // Mock Express app
// const app = express();
// app.use(express.json());
// app.put('/api/users/:userId', userController.updateUserProfile);

// // Mock the User model
// jest.mock('../models/userModel');

// describe('UserController - updateUserProfile', () => {
//     const userId = '1234567890abcdef12345678'; // Sample user ID
//     const validUserData = {
//         firstName: 'John',
//         lastName: 'Doe',
//         address1: '123 Main St',
//         address2: 'Apt 4B',
//         city: 'Houston',
//         state: 'TX',
//         zipcode: '77001',
//         preferences: 'vegetarian',
//         skills: ['coding', 'teaching'],
//         dates: '2023-10-17',
       
//     };

//     afterEach(() => {
//         jest.clearAllMocks(); // Clear mocks between tests
//     });

//     test('should return 400 if required fields are missing', async () => {
//         const incompleteData = {
//             firstName: 'John',
//             lastName: 'Doe',
//             preferences: 'vegetarian',
//             skills: [],
//             dates: '2023-10-17',
           
//         };

//         const response = await request(app)
//             .put(`/api/users/${userId}`)
//             .send(incompleteData);

//         expect(response.status).toBe(400);
//         expect(response.body.message).toBe('All fields are required.');
//     });

//     test('should return 404 if user is not found', async () => {
//         User.findByIdAndUpdate.mockResolvedValue(null); // Simulate user not found

//         const response = await request(app)
//             .put(`/api/users/${userId}`)
//             .send(validUserData);

//         expect(response.status).toBe(404);
//         expect(response.body.message).toBe('User not found');
//     });

//     test('should return 500 if there is a server error', async () => {
//         User.findByIdAndUpdate.mockRejectedValue(new Error('Server error')); // Simulate server error

//         const response = await request(app)
//             .put(`/api/users/${userId}`)
//             .send(validUserData);

//         expect(response.status).toBe(500);
//         expect(response.body.message).toBe('Error updating profile');
//         expect(response.body.error).toBeDefined();
//     });

//     test('should return 200 and updated user profile on success', async () => {
//         const updatedUser = { ...validUserData, _id: userId };
//         User.findByIdAndUpdate.mockResolvedValue(updatedUser); // Simulate successful update

//         const response = await request(app)
//             .put(`/api/users/${userId}`)
//             .send(validUserData);

//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(updatedUser);
//     });
// });
//10/19
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
//                
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
