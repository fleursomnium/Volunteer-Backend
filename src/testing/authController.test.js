






const { register, login, getUser } = require('../controllers/authController');
const User = require('../models/userModel');
const VolunteerProfile = require('../models/volunteerProfileModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock the required modules
jest.mock('../models/userModel');
jest.mock('../models/volunteerProfileModel');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Auth Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            user: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('register()', () => {
        it('should register a new volunteer', async () => {
            req.body = {
                email: 'volunteer@test.com',
                password: 'password123',
                role: 'volunteer',
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.prototype.save = jest.fn().mockResolvedValue({ _id: 'userId' });
            VolunteerProfile.prototype.save = jest.fn().mockResolvedValue({});
            jwt.sign.mockReturnValue('mockToken');

            await register(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'volunteer@test.com' });
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(User.prototype.save).toHaveBeenCalled();
            expect(VolunteerProfile.prototype.save).toHaveBeenCalled();
            expect(jwt.sign).toHaveBeenCalledWith(
                { userId: 'userId', role: 'volunteer' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                token: 'mockToken',
                role: 'volunteer',
            });
        });

        it('should return 400 if email is already in use', async () => {
            req.body = {
                email: 'existing@test.com',
                password: 'password123',
                role: 'volunteer',
            };

            User.findOne.mockResolvedValue({ _id: 'existingUserId' });

            await register(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'existing@test.com' });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Email already in use' });
        });

        it('should return 500 on server error', async () => {
            req.body = {
                email: 'error@test.com',
                password: 'password123',
                role: 'volunteer',
            };

            User.findOne.mockRejectedValue(new Error('Database error'));

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Server error', error: 'Database error' });
        });
    });

    describe('login()', () => {
        it('should login an existing user', async () => {
            req.body = {
                email: 'login@test.com',
                password: 'password123',
            };

            User.findOne.mockResolvedValue({
                _id: 'userId',
                email: 'login@test.com',
                password: 'hashedPassword',
                role: 'volunteer',
            });
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockToken');

            await login(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'login@test.com' });
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(jwt.sign).toHaveBeenCalledWith(
                { userId: 'userId', role: 'volunteer' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'mockToken', role: 'volunteer' });
        });

        it('should return 404 for invalid credentials', async () => {
            req.body = {
                email: 'invalid@test.com',
                password: 'password123',
            };

            User.findOne.mockResolvedValue(null);

            await login(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'invalid@test.com' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
        });

        it('should return 500 on server error', async () => {
            req.body = {
                email: 'error@test.com',
                password: 'password123',
            };

            User.findOne.mockRejectedValue(new Error('Database error'));

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Server error', error: 'Database error' });
        });
    });

    describe('getUser()', () => {
        it('should return the user role', async () => {
            req.user = { userId: 'userId' };

            User.findById.mockResolvedValue({
                _id: 'userId',
                role: 'volunteer',
            });

            await getUser(req, res);

            expect(User.findById).toHaveBeenCalledWith('userId');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ role: 'volunteer' });
        });

        it('should return 404 if user not found', async () => {
            req.user = { userId: 'nonexistentId' };

            User.findById.mockResolvedValue(null);

            await getUser(req, res);

            expect(User.findById).toHaveBeenCalledWith('nonexistentId');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User not found' });
        });

        it('should return 500 on server error', async () => {
            req.user = { userId: 'errorId' };

            User.findById.mockRejectedValue(new Error('Database error'));

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Server error', error: 'Database error' });
        });
    });

describe('Auth Controller Additional Tests', () => {
    beforeEach(() => {
        req = { body: {}, user: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('register()', () => {
        it('should return 400 if email or password is missing', async () => {
            req.body = { email: '', password: 'password123', role: 'volunteer' };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Email and password are required' });
        });

        it('should return 400 if role is not specified', async () => {
            req.body = { email: 'test@test.com', password: 'password123' };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Role is required' });
        });
    });

    describe('login()', () => {
        it('should return 403 if user role is invalid', async () => {
            req.body = { email: 'test@test.com', password: 'password123' };

            User.findOne.mockResolvedValue({
                _id: 'userId',
                email: 'test@test.com',
                password: 'hashedPassword',
                role: 'invalidRole',
            });

            bcrypt.compare.mockResolvedValue(true);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid role' });
        });
    });

    describe('getUser()', () => {
        it('should return 500 if database error occurs', async () => {
            req.user = { userId: 'userId' };

            User.findById.mockRejectedValue(new Error('Database error'));

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
        });
    });
});


});





// const { register, login, getUser } = require('../controllers/authController');
// const User = require('../models/userModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// // Mock the required modules
// jest.mock('../models/userModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('jsonwebtoken', () => ({
//     sign: jest.fn(),
// }));
// jest.mock('bcryptjs', () => ({
//     hash: jest.fn(),
//     compare: jest.fn(),
// }));

// describe('Auth Controller Tests', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {},
//             user: {},
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('register()', () => {
//         it('should register a new volunteer', async () => {
//             req.body = {
//                 email: 'volunteer@test.com',
//                 password: 'password123',
//                 role: 'volunteer',
//             };

//             // Mock database calls
//             User.findOne.mockResolvedValue(null);
//             bcrypt.hash.mockResolvedValue('hashedPassword');
//             User.prototype.save = jest.fn().mockResolvedValue({
//                 _id: 'userId',
//                 email: 'volunteer@test.com',
//                 role: 'volunteer',
//             });
//             VolunteerProfile.prototype.save = jest.fn().mockResolvedValue({});
//             jwt.sign.mockReturnValue('mockToken');

//             await register(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'volunteer@test.com' });
//             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
//             expect(User.prototype.save).toHaveBeenCalled();
//             expect(VolunteerProfile.prototype.save).toHaveBeenCalled();
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'mockToken', role: 'volunteer' }));
//         });

//         it('should return 400 if email is already in use', async () => {
//             req.body = {
//                 email: 'existing@test.com',
//                 password: 'password123',
//                 role: 'volunteer',
//             };

//             User.findOne.mockResolvedValue({ _id: 'existingUserId' });

//             await register(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'existing@test.com' });
//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Email already in use' });
//         });

//         it('should return 500 on server error', async () => {
//             req.body = {
//                 email: 'error@test.com',
//                 password: 'password123',
//                 role: 'volunteer',
//             };

//             User.findOne.mockRejectedValue(new Error('Database error'));

//             await register(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
//         });
//     });

//     describe('login()', () => {
//         it('should login an existing user', async () => {
//             req.body = {
//                 email: 'login@test.com',
//                 password: 'password123',
//             };

//             User.findOne.mockResolvedValue({
//                 _id: 'userId',
//                 email: 'login@test.com',
//                 password: 'hashedPassword',
//                 role: 'volunteer',
//             });
//             bcrypt.compare.mockResolvedValue(true);
//             jwt.sign.mockReturnValue('mockToken');

//             await login(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'login@test.com' });
//             expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
//             expect(jwt.sign).toHaveBeenCalledWith({ userId: 'userId', role: 'volunteer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             expect(res.json).toHaveBeenCalledWith({ token: 'mockToken', role: 'volunteer' });
//         });

//         it('should return 404 for invalid credentials', async () => {
//             req.body = {
//                 email: 'invalid@test.com',
//                 password: 'password123',
//             };

//             User.findOne.mockResolvedValue(null);

//             await login(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'invalid@test.com' });
//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });

//         it('should return 500 on server error', async () => {
//             req.body = {
//                 email: 'error@test.com',
//                 password: 'password123',
//             };

//             User.findOne.mockRejectedValue(new Error('Database error'));

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
//         });
//     });

//     describe('getUser()', () => {
//         it('should return the user role', async () => {
//             req.user = { userId: 'userId' };

//             User.findById.mockResolvedValue({
//                 _id: 'userId',
//                 role: 'volunteer',
//             });

//             await getUser(req, res);

//             expect(User.findById).toHaveBeenCalledWith('userId');
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ role: 'volunteer' });
//         });

//         it('should return 404 if user not found', async () => {
//             req.user = { userId: 'nonexistentId' };

//             User.findById.mockResolvedValue(null);

//             await getUser(req, res);

//             expect(User.findById).toHaveBeenCalledWith('nonexistentId');
//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'User not found' });
//         });

//         it('should return 500 on server error', async () => {
//             req.user = { userId: 'errorId' };

//             User.findById.mockRejectedValue(new Error('Database error'));

//             await getUser(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
//         });
//     });
// });
 






//11/18/9:50
// const { register, login, getUser } = require('../controllers/authController');
// const User = require('../models/userModel');
// const VolunteerProfile = require('../models/volunteerProfileModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// // Mock the required modules
// jest.mock('../models/userModel');
// jest.mock('../models/volunteerProfileModel');
// jest.mock('jsonwebtoken');
// jest.mock('bcryptjs');

// describe('Auth Controller Tests', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {},
//             user: {},
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     describe('register()', () => {
//         it('should register a new volunteer', async () => {
//             req.body = {
//                 email: 'volunteer@test.com',
//                 password: 'password123',
//                 role: 'volunteer',
//             };

//             // Mock database calls
//             User.findOne.mockResolvedValue(null);
//             bcrypt.hash.mockResolvedValue('hashedPassword');
//             User.prototype.save = jest.fn().mockResolvedValue({ _id: 'userId' });
//             VolunteerProfile.prototype.save = jest.fn().mockResolvedValue({});

//             await register(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'volunteer@test.com' });
//             expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
//             expect(User.prototype.save).toHaveBeenCalled();
//             expect(VolunteerProfile.prototype.save).toHaveBeenCalled();
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String), role: 'volunteer' }));
//         });

//         it('should return 400 if email is already in use', async () => {
//             req.body = {
//                 email: 'existing@test.com',
//                 password: 'password123',
//                 role: 'volunteer',
//             };

//             User.findOne.mockResolvedValue({ _id: 'existingUserId' });

//             await register(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'existing@test.com' });
//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Email already in use' });
//         });

//         it('should return 500 on server error', async () => {
//             req.body = {
//                 email: 'error@test.com',
//                 password: 'password123',
//                 role: 'volunteer',
//             };

//             User.findOne.mockRejectedValue(new Error('Database error'));

//             await register(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
//         });
//     });

//     describe('login()', () => {
//         it('should login an existing user', async () => {
//             req.body = {
//                 email: 'login@test.com',
//                 password: 'password123',
//             };

//             User.findOne.mockResolvedValue({
//                 _id: 'userId',
//                 email: 'login@test.com',
//                 password: 'hashedPassword',
//                 role: 'volunteer',
//             });
//             bcrypt.compare.mockResolvedValue(true);
//             jwt.sign.mockReturnValue('mockToken');

//             await login(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'login@test.com' });
//             expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
//             expect(jwt.sign).toHaveBeenCalledWith({ userId: 'userId', role: 'volunteer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             expect(res.json).toHaveBeenCalledWith({ token: 'mockToken', role: 'volunteer' });
//         });

//         it('should return 404 for invalid credentials', async () => {
//             req.body = {
//                 email: 'invalid@test.com',
//                 password: 'password123',
//             };

//             User.findOne.mockResolvedValue(null);

//             await login(req, res);

//             expect(User.findOne).toHaveBeenCalledWith({ email: 'invalid@test.com' });
//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
//         });

//         it('should return 500 on server error', async () => {
//             req.body = {
//                 email: 'error@test.com',
//                 password: 'password123',
//             };

//             User.findOne.mockRejectedValue(new Error('Database error'));

//             await login(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
//         });
//     });

//     describe('getUser()', () => {
//         it('should return the user role', async () => {
//             req.user = { userId: 'userId' };

//             User.findById.mockResolvedValue({
//                 _id: 'userId',
//                 role: 'volunteer',
//             });

//             await getUser(req, res);

//             expect(User.findById).toHaveBeenCalledWith('userId');
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ role: 'volunteer' });
//         });

//         it('should return 404 if user not found', async () => {
//             req.user = { userId: 'nonexistentId' };

//             User.findById.mockResolvedValue(null);

//             await getUser(req, res);

//             expect(User.findById).toHaveBeenCalledWith('nonexistentId');
//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'User not found' });
//         });

//         it('should return 500 on server error', async () => {
//             req.user = { userId: 'errorId' };

//             User.findById.mockRejectedValue(new Error('Database error'));

//             await getUser(req, res);

//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.json).toHaveBeenCalledWith({ msg: 'Server error' });
//         });
//     });
// });









