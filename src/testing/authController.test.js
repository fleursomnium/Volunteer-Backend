

// // src/controllers/authController.test.js
// const { login } = require('./authController');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// jest.mock('../models/userModel');
// jest.mock('bcryptjs');
// jest.mock('jsonwebtoken');

// describe('Auth Controller', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = { body: {} };
//         res = {
//             status: jest.fn().mockReturnThis(), // Ensure .mockReturnThis() to allow chaining
//             json: jest.fn(),
//         };
//         next = jest.fn();
//         jest.clearAllMocks();
//     });

//     describe('login', () => {
//         it('should login successfully with valid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'password123' };
//             const mockUser = { _id: '12345', password: 'hashedPassword', role: 'volunteer' };
//             User.findOne.mockResolvedValue(mockUser);
//             bcrypt.compare.mockResolvedValue(true); // Mock password match
//             jwt.sign.mockReturnValue('fakeToken'); // Mock token generation

//             // Act
//             await login(req, res, next);

//             // Debug logs
//             console.log("Mock User:", mockUser);
//             console.log("Password comparison:", await bcrypt.compare(req.body.password, mockUser.password));
//             console.log("res.status calls:", res.status.mock.calls);
//             console.log("res.json calls:", res.json.mock.calls);

//             // Assert
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken', role: 'volunteer' });
//         });

//         it('should return 404 for invalid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'wrongPassword' };
//             User.findOne.mockResolvedValue(null); // Simulate user not found

//             await login(req, res, next);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });
//     });
// });

// // src/controllers/authController.test.js
// const { login } = require('./authController');
// const User = require('../models/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const verifyToken = require('../middleware/authMiddleware'); // Import verifyToken function from middleware

// jest.mock('../models/userModel');
// jest.mock('jsonwebtoken');
// jest.mock('bcryptjs');

// describe('Auth Controller', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = { body: {}, headers: {} };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         next = jest.fn();
//         jest.clearAllMocks();
//     });

//     describe('login', () => {
//         it('should login successfully with valid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'password123' };
//             const mockUser = { _id: '12345', password: 'hashedPassword', role: 'volunteer' };

//             User.findOne.mockResolvedValue(mockUser); // Mock User found
//             bcrypt.compare.mockResolvedValue(true); // Mock password match
//             jwt.sign.mockReturnValue('fakeToken'); // Mock token

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken', role: 'volunteer' });
//         });

//         it('should return 404 for invalid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'wrongPassword' };
//             User.findOne.mockResolvedValue(null); // No user found

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });
//     });

//     describe('verifyToken', () => {
//         it('should verify token successfully', async () => {
//             req.headers.authorization = 'Bearer validToken';
//             jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId: 'user123' }));

//             await verifyToken(req, res, next);

//             expect(next).toHaveBeenCalled();
//             expect(req.user).toEqual({ userId: 'user123' });
//         });

//         it('should return 401 for invalid token', async () => {
//             req.headers.authorization = 'Bearer invalidToken';
//             jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Invalid token')));

//             await verifyToken(req, res);

//             expect(res.status).toHaveBeenCalledWith(401);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid token' });
//         });
//     });
// });



// // src/controllers/authController.test.js 3 passed
// const { login } = require('./authController');
// const User = require('../models/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const verifyToken = require('../middleware/authMiddleware'); // Import verifyToken middleware

// jest.mock('../models/userModel');
// jest.mock('jsonwebtoken');
// jest.mock('bcryptjs');

// describe('Auth Controller', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = { body: {}, headers: {} };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         next = jest.fn();
//         jest.clearAllMocks();
//     });

//     describe('login', () => {
//         it('should login successfully with valid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'password123' };
//             const mockUser = { _id: '12345', password: 'hashedPassword', role: 'volunteer' };

//             User.findOne.mockResolvedValue(mockUser);
//             bcrypt.compare.mockResolvedValue(true); // Mock password match
//             jwt.sign.mockReturnValue('fakeToken'); // Mock JWT token creation

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken', role: 'volunteer' });
//         });

//         it('should return 404 for invalid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'wrongPassword' };
//             User.findOne.mockResolvedValue(null); // No user found

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });
//     });

//     describe('verifyToken', () => {
//         it('should verify token successfully', async () => {
//             req.headers.authorization = 'Bearer validToken';
//             jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId: 'user123' }));

//             await verifyToken(req, res, next);

//             expect(next).toHaveBeenCalled();
//             expect(req.user).toEqual({ userId: 'user123' });
//         });

//         it('should return 401 for invalid token', async () => {
//             req.headers.authorization = 'Bearer invalidToken';
//             jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Invalid token')));

//             await verifyToken(req, res);

//             expect(res.status).toHaveBeenCalledWith(401);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid token' }); // Match the actual response message
//         });
//     });
// });




// src/controllers/authController.test.js
// const { login } = require('./authController'); // Only import `login` if `verifyToken` is middleware
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel'); // Mock User model
// const verifyToken = require('../middleware/authMiddleware').verifyToken; // Import from middleware if needed

// // Mock User and JWT
// jest.mock('../models/userModel');
// jest.mock('jsonwebtoken');

// describe('Auth Controller', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = { body: {}, headers: {} };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         next = jest.fn();
//     });

//     describe('login', () => {
//         it('should login successfully with valid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'password123' };
//             const mockUser = { _id: '12345', password: 'hashedPassword', comparePassword: jest.fn().mockResolvedValue(true) };

//             User.findOne.mockResolvedValue(mockUser); // Mock DB response
//             jwt.sign.mockReturnValue('fakeToken'); // Mock JWT generation

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken' });
//         });

//         it('should return 401 for invalid credentials', async () => {
//             req.body = { email: 'test@example.com', password: 'wrongPassword' };

//             User.findOne.mockResolvedValue(null); // Simulate invalid user

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(401);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });
//     });

//     describe('verifyToken', () => {
//         it('should verify token successfully', async () => {
//             req.headers.authorization = 'Bearer validToken';
//             jwt.verify.mockReturnValue({ userId: 'user123' }); // Mock successful token verification

//             await verifyToken(req, res, next);

//             expect(next).toHaveBeenCalled();
//             expect(req.user).toEqual({ userId: 'user123' });
//         });

//         it('should return 401 for invalid token', async () => {
//             req.headers.authorization = 'Bearer invalidToken';
//             jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); }); // Mock invalid token scenario

//             await verifyToken(req, res);

//             expect(res.status).toHaveBeenCalledWith(401);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Unauthorized' });
//         });
//     });
// });



//11/1
// const authController = require('./authController');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');

// jest.mock('bcryptjs');
// jest.mock('jsonwebtoken');
// jest.mock('../models/userModel');
// jest.mock('../models/volunteerProfileModel');

// describe('Auth Controller', () => {
//     describe('Register', () => {
//         it('should register a new user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue(null);
//             bcrypt.hash.mockResolvedValue('hashedPassword123');

//             User.prototype.save = jest.fn().mockResolvedValue({
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 role: 'user',
//             });

//             jwt.sign.mockReturnValue('fakeToken');

//             await authController.register(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 role: 'user', // Adjusted to match the output structure
//             });
//         });

//         it('should return 400 if user already exists', async () => {
//             const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue({ email: 'existing@example.com' });

//             await authController.register(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Email already in use' });
//         });
//     });

//     describe('Login', () => {
//         it('should log in a user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             const mockUser = {
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 password: 'hashedPassword123',
//                 role: 'user',  // Ensure role is set directly on the user object
//                 toObject: jest.fn().mockReturnValue({
//                     _id: 'userId123',
//                     email: 'test@example.com',
//                     role: 'user',
//                 }),
//             };

//             User.findOne.mockResolvedValue(mockUser);
//             bcrypt.compare.mockResolvedValue(true);
//             jwt.sign.mockReturnValue('fakeToken');

//             await authController.login(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//             expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 role: 'user', // Adjusted to match the output structure
//             });
//         });

//         it('should return 404 if email is not found', async () => {
//             const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue(null);

//             await authController.login(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });
//     });
// });

// authController.test.js
const authController = require('../controllers/authController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const VolunteerProfile = require('../models/volunteerProfileModel');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models/userModel');
jest.mock('../models/volunteerProfileModel');

describe('Auth Controller', () => {
    const mockSecretKey = "mockSecretKey";

    describe('Register', () => {
        it('should register a new user', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedPassword123');
            User.prototype.save = jest.fn().mockResolvedValue({
                _id: 'userId123',
                email: 'test@example.com',
                role: 'user',
            });
            jwt.sign.mockReturnValue('fakeToken');

            await authController.register(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                token: 'fakeToken',
                role: 'user',
            });
        });

        it('should return 400 if user already exists', async () => {
            const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValue({ email: 'existing@example.com' });

            await authController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Email already in use' });
        });
    });

    describe('Login', () => {
        it('should log in a user', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockUser = {
                _id: 'userId123',
                email: 'test@example.com',
                password: 'hashedPassword123',
                role: 'user',
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('fakeToken');

            await authController.login(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
            expect(res.json).toHaveBeenCalledWith({
                token: 'fakeToken',
                role: 'user',
            });
        });

        it('should return 404 if email is not found', async () => {
            const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValue(null);

            await authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
        });
    });
});










//best
// const authController = require('./authController');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// jest.mock('bcryptjs');
// jest.mock('jsonwebtoken');
// jest.mock('../models/userModel');

// describe('Auth Controller', () => {
//     describe('Register', () => {
//         it('should register a new user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue(null);
//             bcrypt.hash.mockResolvedValue('hashedPassword123');

//             User.prototype.save = jest.fn().mockResolvedValue({
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 role: 'user',
//             });

//             jwt.sign.mockReturnValue('fakeToken');

//             await authController.register(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 role: 'user',
//             });
//         });

//         it('should return 400 if user already exists', async () => {
//             const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue({ email: 'existing@example.com' });

//             await authController.register(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Email already in use' });
//         });
//     });

//     describe('Login', () => {
//         it('should log in a user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             const mockUser = {
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 password: 'hashedPassword123',
//                 role: 'user', // Ensure role is included here
//                 toObject: jest.fn().mockReturnValue({
//                     _id: 'userId123',
//                     email: 'test@example.com',
//                     role: 'user', // Ensure role is included here as well
//                 }),
//             };

//             User.findOne.mockResolvedValue(mockUser);
//             bcrypt.compare.mockResolvedValue(true);
//             jwt.sign.mockReturnValue('fakeToken');

//             await authController.login(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//             expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 role: 'user',
//             });
//         });

//         it('should return 404 if email is not found', async () => {
//             const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue(null);

//             await authController.login(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });
//     });
// });



//10/31//3 passed.

// const authController = require('./authController');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');

// jest.mock('bcryptjs');
// jest.mock('jsonwebtoken');
// jest.mock('../models/userModel');
// jest.mock('../models/volunteerProfileModel');

// describe('Auth Controller', () => {
//     describe('Register', () => {
//         it('should register a new user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue(null);
//             bcrypt.hash.mockResolvedValue('hashedPassword123');

//             User.prototype.save = jest.fn().mockResolvedValue({
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 role: 'user',
//             });

//             jwt.sign.mockReturnValue('fakeToken');

//             await authController.register(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 role: 'user', // Adjusted to match the output structure
//             });
//         });

//         it('should return 400 if user already exists', async () => {
//             const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue({ email: 'existing@example.com' });

//             await authController.register(req, res);

//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Email already in use' });
//         });
//     });

//     describe('Login', () => {
//         it('should log in a user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             const mockUser = {
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 password: 'hashedPassword123',
//                 toObject: jest.fn().mockReturnValue({
//                     _id: 'userId123',
//                     email: 'test@example.com',
//                     role: 'user',
//                 }),
//             };

//             User.findOne.mockResolvedValue(mockUser);
//             bcrypt.compare.mockResolvedValue(true);
//             jwt.sign.mockReturnValue('fakeToken');

//             await authController.login(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//             expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 role: 'user', // Adjusted to match the output structure
//             });
//         });

//         it('should return 404 if email is not found', async () => {
//             const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             User.findOne.mockResolvedValue(null);

//             await authController.login(req, res);

//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });
//     });
// });


//10/31
// const authController = require('./authController');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// // const Profile = require('../models/profileModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');


// jest.mock('bcryptjs');
// jest.mock('jsonwebtoken');
// jest.mock('../models/userModel');
// jest.mock('../models/volunteerrofileModel');

// describe('Auth Controller', () => {

//     describe('Register', () => {

//         it('should register a new user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return null (no existing user)
//             User.findOne.mockResolvedValue(null);

//             // Mocking bcrypt.hash to return a hashed password
//             bcrypt.hash.mockResolvedValue('hashedPassword123');

//             // Mocking User.prototype.save to return the correct user object with id, email, and role
//             User.prototype.save = jest.fn().mockResolvedValue({
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 role: 'user',
//             });

//             // Mocking Profile.prototype.save
//             Profile.prototype.save = jest.fn().mockResolvedValue({});

//             // Mocking jwt.sign to return a fake token
//             jwt.sign.mockReturnValue('fakeToken');

//             // Call the register controller
//             await authController.register(req, res);

//             // Check that User.findOne is called with the correct email
//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

//             // Check that bcrypt.hash is called with the correct password and salt
//             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

//             // Check that res.status(201) is called
//             expect(res.status).toHaveBeenCalledWith(201);

//             // Check that res.json is called with the correct token and user data
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 user: { id: 'userId123', email: 'test@example.com', role: 'user' },
//             });
//         });

//         it('should return 400 if user already exists', async () => {
//             const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return an existing user
//             User.findOne.mockResolvedValue({ email: 'existing@example.com' });

//             // Call the register controller
//             await authController.register(req, res);

//             // Check that res.status(400) is called
//             expect(res.status).toHaveBeenCalledWith(400);

//             // Check that res.json is called with the correct message
//             expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
//         });
//     });

//     describe('Login', () => {

//         it('should log in a user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return a user with the hashed password
//             const mockUser = {
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 password: 'hashedPassword123',
//                 toObject: jest.fn().mockReturnValue({
//                     _id: 'userId123',
//                     email: 'test@example.com',
//                     role: 'user',
//                 }),
//             };

//             User.findOne.mockResolvedValue(mockUser);

//             // Mocking bcrypt.compare to return true (password matches)
//             bcrypt.compare.mockResolvedValue(true);

//             // Mocking jwt.sign to return a fake token
//             jwt.sign.mockReturnValue('fakeToken');

//             // Call the login controller
//             await authController.login(req, res);

//             // Check that User.findOne is called with the correct email
//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

//             // Check that bcrypt.compare is called with the correct passwords
//             expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');

//             // Check that res.json is called with the correct token and user data
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 user: { _id: 'userId123', email: 'test@example.com', role: 'user' },
//             });
//         });

//         it('should return 400 if email is not found', async () => {
//             const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return null (user not found)
//             User.findOne.mockResolvedValue(null);

//             // Call the login controller
//             await authController.login(req, res);

//             // Check that res.status(400) is called
//             expect(res.status).toHaveBeenCalledWith(400);

//             // Check that res.json is called with the correct message
//             expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
//         });
//     });
// });

//10/31
// const authController = require('./authController');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const Profile = require('../models/profileModel');


// jest.mock('bcryptjs');
// jest.mock('jsonwebtoken');
// jest.mock('../models/userModel');
// jest.mock('../models/profileModel');

// describe('Auth Controller', () => {

//     describe('Register', () => {

//         it('should register a new user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return null (no existing user)
//             User.findOne.mockResolvedValue(null);

//             // Mocking bcrypt.hash to return a hashed password
//             bcrypt.hash.mockResolvedValue('hashedPassword123');

//             // Mocking User.prototype.save to return the correct user object with id, email, and role
//             User.prototype.save = jest.fn().mockResolvedValue({
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 role: 'user',
//             });

//             // Mocking Profile.prototype.save
//             Profile.prototype.save = jest.fn().mockResolvedValue({});

//             // Mocking jwt.sign to return a fake token
//             jwt.sign.mockReturnValue('fakeToken');

//             // Call the register controller
//             await authController.register(req, res);

//             // Check that User.findOne is called with the correct email
//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

//             // Check that bcrypt.hash is called with the correct password and salt
//             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

//             // Check that res.status(201) is called
//             expect(res.status).toHaveBeenCalledWith(201);

//             // Check that res.json is called with the correct token and user data
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 user: { id: 'userId123', email: 'test@example.com', role: 'user' },
//             });
//         });

//         it('should return 400 if user already exists', async () => {
//             const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return an existing user
//             User.findOne.mockResolvedValue({ email: 'existing@example.com' });

//             // Call the register controller
//             await authController.register(req, res);

//             // Check that res.status(400) is called
//             expect(res.status).toHaveBeenCalledWith(400);

//             // Check that res.json is called with the correct message
//             expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
//         });
//     });

//     describe('Login', () => {

//         it('should log in a user', async () => {
//             const req = { body: { email: 'test@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return a user with the hashed password
//             const mockUser = {
//                 _id: 'userId123',
//                 email: 'test@example.com',
//                 password: 'hashedPassword123',
//                 toObject: jest.fn().mockReturnValue({
//                     _id: 'userId123',
//                     email: 'test@example.com',
//                     role: 'user',
//                 }),
//             };

//             User.findOne.mockResolvedValue(mockUser);

//             // Mocking bcrypt.compare to return true (password matches)
//             bcrypt.compare.mockResolvedValue(true);

//             // Mocking jwt.sign to return a fake token
//             jwt.sign.mockReturnValue('fakeToken');

//             // Call the login controller
//             await authController.login(req, res);

//             // Check that User.findOne is called with the correct email
//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

//             // Check that bcrypt.compare is called with the correct passwords
//             expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');

//             // Check that res.json is called with the correct token and user data
//             expect(res.json).toHaveBeenCalledWith({
//                 token: 'fakeToken',
//                 user: { _id: 'userId123', email: 'test@example.com', role: 'user' },
//             });
//         });

//         it('should return 400 if email is not found', async () => {
//             const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
//             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//             // Mocking User.findOne to return null (user not found)
//             User.findOne.mockResolvedValue(null);

//             // Call the login controller
//             await authController.login(req, res);

//             // Check that res.status(400) is called
//             expect(res.status).toHaveBeenCalledWith(400);

//             // Check that res.json is called with the correct message
//             expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
//         });
//     });
// });
// //10/25/2024
// // const authController = require('./authController');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/userModel');
// // const Profile = require('../models/profileModel');

// // jest.mock('bcryptjs');
// // jest.mock('jsonwebtoken');
// // jest.mock('../models/userModel');
// // jest.mock('../models/profileModel');

// // describe('Auth Controller', () => {

// //     describe('Register', () => {

// //         it('should register a new user', async () => {
// //             const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
// //             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

// //             // Mocking User.findOne to return null (no existing user)
// //             User.findOne.mockResolvedValue(null);

// //             // Mocking bcrypt.hash to return a hashed password
// //             bcrypt.hash.mockResolvedValue('hashedPassword123');

// //             // Mocking User.prototype.save to return the correct user object with id, email, and role
// //             User.prototype.save = jest.fn().mockResolvedValue({
// //                 _id: 'userId123',
// //                 email: 'test@example.com',
// //                 role: 'user',
// //             });

// //             // Mocking Profile.prototype.save
// //             Profile.prototype.save = jest.fn().mockResolvedValue({});

// //             // Mocking jwt.sign to return a fake token
// //             jwt.sign.mockReturnValue('fakeToken');

// //             // Call the register controller
// //             await authController.register(req, res);

// //             // Check that User.findOne is called with the correct email
// //             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

// //             // Check that bcrypt.hash is called with the correct password and salt
// //             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

// //             // Check that res.status(201) is called
// //             expect(res.status).toHaveBeenCalledWith(201);

// //             // Check that res.json is called with the correct token and user data
// //             expect(res.json).toHaveBeenCalledWith({
// //                 token: 'fakeToken',
// //                 user: { id: 'userId123', email: 'test@example.com', role: 'user' },
// //             });
// //         });

// //         it('should return 400 if user already exists', async () => {
// //             const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
// //             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

// //             // Mocking User.findOne to return an existing user
// //             User.findOne.mockResolvedValue({ email: 'existing@example.com' });

// //             // Call the register controller
// //             await authController.register(req, res);

// //             // Check that res.status(400) is called
// //             expect(res.status).toHaveBeenCalledWith(400);

// //             // Check that res.json is called with the correct message
// //             expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
// //         });
// //     });

// //     describe('Login', () => {

// //         it('should log in a user', async () => {
// //             const req = { body: { email: 'test@example.com', password: 'password123' } };
// //             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

// //             // Mocking User.findOne to return a user with the hashed password
// //             const mockUser = {
// //                 _id: 'userId123',
// //                 email: 'test@example.com',
// //                 password: 'hashedPassword123',
// //                 toObject: jest.fn().mockReturnValue({
// //                     _id: 'userId123',
// //                     email: 'test@example.com',
// //                     role: 'user',
// //                 }),
// //             };

// //             User.findOne.mockResolvedValue(mockUser);

// //             // Mocking bcrypt.compare to return true (password matches)
// //             bcrypt.compare.mockResolvedValue(true);

// //             // Mocking jwt.sign to return a fake token
// //             jwt.sign.mockReturnValue('fakeToken');

// //             // Call the login controller
// //             await authController.login(req, res);

// //             // Check that User.findOne is called with the correct email
// //             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

// //             // Check that bcrypt.compare is called with the correct passwords
// //             expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');

// //             // Check that res.json is called with the correct token and user data
// //             expect(res.json).toHaveBeenCalledWith({
// //                 token: 'fakeToken',
// //                 user: { _id: 'userId123', email: 'test@example.com', role: 'user' },
// //             });
// //         });

// //         it('should return 400 if email is not found', async () => {
// //             const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
// //             const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

// //             // Mocking User.findOne to return null (user not found)
// //             User.findOne.mockResolvedValue(null);

// //             // Call the login controller
// //             await authController.login(req, res);

// //             // Check that res.status(400) is called
// //             expect(res.status).toHaveBeenCalledWith(400);

// //             // Check that res.json is called with the correct message
// //             expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
// //         });
// //     });
// // });