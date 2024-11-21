//
const verifyToken = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Mock the `jsonwebtoken` module
jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        };
        next = jest.fn();
    });

    it('should return 403 if authorization header is missing', () => {
        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Authorization header missing' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if authorization format is invalid', () => {
        req.headers.authorization = 'InvalidFormat';

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid authorization format' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if the token is invalid', () => {
        req.headers.authorization = 'Bearer invalidtoken';
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error('Invalid token'));
        });

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid token' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should decode the token and call next if the token is valid', () => {
        req.headers.authorization = 'Bearer validtoken';
        const mockDecoded = { userId: '12345', role: 'user' };

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, mockDecoded);
        });

        verifyToken(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('validtoken', process.env.JWT_SECRET, expect.any(Function));
        expect(req.user).toEqual(mockDecoded);
        expect(next).toHaveBeenCalled();
    });
});

















//const authMiddleware = require('./authMiddleware');
// const jwt = require('jsonwebtoken');

// jest.mock('jsonwebtoken');

// describe('authMiddleware', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = {
//             headers: {
//                 authorization: 'Bearer valid-token',
//             },
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         next = jest.fn();
//         jest.clearAllMocks();
//     });

//     it('should call next for a valid token', () => {
//         jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId: '123' }));

//         authMiddleware(req, res, next);

//         expect(next).toHaveBeenCalled();
//     });

//     it('should return 401 for an invalid token', () => {
//         jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Invalid token')));

//         authMiddleware(req, res, next);

//         expect(res.status).toHaveBeenCalledWith(401);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid token' });
//     });

//     it('should return 403 if token is missing', () => {
//         req.headers.authorization = '';

//         authMiddleware(req, res, next);

//         expect(res.status).toHaveBeenCalledWith(403);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Authorization header missing' });  // Updated message
//     });
// });

// // const authMiddleware = require('./authMiddleware');
// // const jwt = require('jsonwebtoken');

// // jest.mock('jsonwebtoken');

// // describe('authMiddleware', () => {
// //     let req, res, next;

// //     beforeEach(() => {
// //         req = {
// //             headers: {
// //                 authorization: 'Bearer valid-token',
// //             },
// //         };
// //         res = {
// //             status: jest.fn().mockReturnThis(),
// //             json: jest.fn(),
// //         };
// //         next = jest.fn();
// //         jest.clearAllMocks();
// //     });

// //     it('should call next for a valid token', () => {
// //         jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId: '123' }));

// //         authMiddleware(req, res, next);

// //         expect(next).toHaveBeenCalled();
// //     });

// //     it('should return 401 for an invalid token', () => {
// //         jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Invalid token')));

// //         authMiddleware(req, res, next);

// //         expect(res.status).toHaveBeenCalledWith(401);
// //         expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid token' });
// //     });

// //     it('should return 403 if token is missing', () => {
// //         req.headers.authorization = '';

// //         authMiddleware(req, res, next);

// //         expect(res.status).toHaveBeenCalledWith(403);
// //         expect(res.json).toHaveBeenCalledWith({ msg: 'Access denied. Admins only' });
// //     });
// // });
