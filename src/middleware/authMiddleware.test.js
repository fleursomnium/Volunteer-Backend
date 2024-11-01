const authMiddleware = require('./authMiddleware');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer valid-token',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('should call next for a valid token', () => {
        jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId: '123' }));

        authMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 401 for an invalid token', () => {
        jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Invalid token')));

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid token' });
    });

    it('should return 403 if token is missing', () => {
        req.headers.authorization = '';

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Authorization header missing' });  // Updated message
    });
});

// const authMiddleware = require('./authMiddleware');
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
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Access denied. Admins only' });
//     });
// });
