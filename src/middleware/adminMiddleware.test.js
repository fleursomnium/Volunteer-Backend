const adminMiddleware = require('./adminMiddleware');

describe('adminMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { user: { role: 'user' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('should return 403 for a non-admin user', () => {
        adminMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Access denied. Admins only' });
    });

    it('should return 403 if user role is missing', () => {
        req.user = {};  // No role defined

        adminMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Access denied. Admins only' });
    });

    it('should call next if user is an admin', () => {
        req.user.role = 'admin';

        adminMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

// const adminMiddleware = require('./adminMiddleware');

// describe('adminMiddleware', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = { user: {} };
//         res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         next = jest.fn();
//     });

//     it('should call next for an admin user', () => {
//         req.user.role = 'admin';

//         adminMiddleware(req, res, next);

//         expect(next).toHaveBeenCalled();
//     });

//     it('should return 403 for a non-admin user', () => {
//         req.user.role = 'user';

//         adminMiddleware(req, res, next);

//         expect(res.status).toHaveBeenCalledWith(403);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Access denied' });
//     });

//     it('should return 403 if user role is missing', () => {
//         adminMiddleware(req, res, next);

//         expect(res.status).toHaveBeenCalledWith(403);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Access denied' });
//     });
// });
