











const mongoose = require('mongoose');
const {
    getVolunteerProfile,
    updateVolunteerProfile,
    getVolunteerHistory,
    updateGeneralAvailability,
} = require('../controllers/volunteerController');
const VolunteerProfile = require('../models/volunteerProfileModel');

jest.mock('../models/volunteerProfileModel');

describe('VolunteerController', () => {
    let mockReq, mockRes;

    beforeAll(() => {
        jest.mock('mongoose', () => ({
            ...jest.requireActual('mongoose'),
            connect: jest.fn(),
            connection: {
                close: jest.fn(),
            },
        }));
    });

    beforeEach(() => {
        mockReq = {
            user: { userId: new mongoose.Types.ObjectId() },
            body: {},
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    describe('getVolunteerProfile', () => {
        it('should return a volunteer profile with the role', async () => {
            const mockProfile = { name: 'John Doe', role: 'volunteer' };
            VolunteerProfile.findOne.mockResolvedValue(mockProfile);

            await getVolunteerProfile(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
        });

        it('should return 404 if profile is not found', async () => {
            VolunteerProfile.findOne.mockResolvedValue(null);

            await getVolunteerProfile(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
        });
    });

    describe('updateVolunteerProfile', () => {
        it('should update a volunteer profile', async () => {
            const mockProfile = { save: jest.fn().mockResolvedValue(true) };
            VolunteerProfile.findOne.mockResolvedValue(mockProfile);

            mockReq.body = { name: 'Updated Name' };

            await updateVolunteerProfile(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockProfile.save).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
        });

        it('should return 404 if profile is not found', async () => {
            VolunteerProfile.findOne.mockResolvedValue(null);

            await updateVolunteerProfile(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
        });
    });

    describe('getVolunteerHistory', () => {
        it('should return the volunteer history', async () => {
            VolunteerProfile.findOne.mockImplementation(() => ({
                populate: jest.fn().mockResolvedValue({ history: [{ event: 'Event A' }] }),
            }));

            await getVolunteerHistory(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([{ event: 'Event A' }]);
        });

        it('should return 404 if profile is not found', async () => {
            VolunteerProfile.findOne.mockResolvedValue(null);

            await getVolunteerHistory(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
        });
    });

    describe('updateGeneralAvailability', () => {
        it('should update general availability', async () => {
            const mockProfile = { save: jest.fn().mockResolvedValue(true) };
            VolunteerProfile.findOne.mockResolvedValue(mockProfile);

            mockReq.body = { availability: ['Monday'] };

            await updateGeneralAvailability(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockProfile.save).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
        });

        it('should return 404 if profile is not found', async () => {
            VolunteerProfile.findOne.mockResolvedValue(null);

            await updateGeneralAvailability(mockReq, mockRes);

            expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
        });
    });
});






// const mongoose = require('mongoose');
// const {
//     getVolunteerProfile,
//     updateVolunteerProfile,
//     getVolunteerHistory,
//     updateGeneralAvailability,
// } = require('../controllers/volunteerController');
// const VolunteerProfile = require('../models/volunteerProfileModel');

// // Mock the model
// jest.mock('../models/volunteerProfileModel');

// describe('VolunteerController', () => {
//     let mockReq, mockRes;

//     beforeEach(() => {
//         // Mock request and response objects
//         mockReq = {
//             user: { userId: new mongoose.Types.ObjectId() },
//             body: {},
//         };

//         mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks(); // Reset mocks before each test
//     });

//     describe('getVolunteerProfile', () => {
//         it('should return a volunteer profile with the role', async () => {
//             const mockProfile = { name: 'John Doe', role: 'volunteer' };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             await getVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await getVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
//         });
//     });

//     describe('updateVolunteerProfile', () => {
//         it('should update a volunteer profile', async () => {
//             const mockProfile = { save: jest.fn().mockResolvedValue(true) };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             mockReq.body = { name: 'Updated Name' };

//             await updateVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockProfile.save).toHaveBeenCalled();
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await updateVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
//         });
//     });

//     describe('getVolunteerHistory', () => {
//         it('should return the volunteer history', async () => {
//             const mockHistory = { history: [{ event: 'Event A' }] };
//             VolunteerProfile.findOne.mockReturnValue({
//                 populate: jest.fn().mockResolvedValue(mockHistory),
//             });

//             await getVolunteerHistory(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockHistory.history);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await getVolunteerHistory(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
//         });
//     });

//     describe('updateGeneralAvailability', () => {
//         it('should update general availability', async () => {
//             const mockProfile = { save: jest.fn().mockResolvedValue(true) };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             mockReq.body = { availability: ['Monday'] };

//             await updateGeneralAvailability(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockProfile.save).toHaveBeenCalled();
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await updateGeneralAvailability(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
//         });
//     });
// });













// keep it//
//const mongoose = require('mongoose');
// const {
//     getVolunteerProfile,
//     updateVolunteerProfile,
//     getVolunteerHistory,
//     updateGeneralAvailability,
// } = require('../controllers/volunteerController');
// const VolunteerProfile = require('../models/volunteerProfileModel');

// jest.mock('../models/volunteerProfileModel');

// describe('VolunteerController', () => {
//     let mockReq, mockRes;

//     beforeAll(() => {
//         jest.mock('mongoose', () => ({
//             ...jest.requireActual('mongoose'),
//             connect: jest.fn(),
//             connection: {
//                 close: jest.fn(),
//             },
//         }));
//     });

//     beforeEach(() => {
//         mockReq = {
//             user: { userId: new mongoose.Types.ObjectId() },
//             body: {},
//         };

//         mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     describe('getVolunteerProfile', () => {
//         it('should return a volunteer profile with the role', async () => {
//             const mockProfile = { name: 'John Doe', role: 'volunteer' };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             await getVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await getVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });

//     describe('updateVolunteerProfile', () => {
//         it('should update a volunteer profile', async () => {
//             const mockProfile = { save: jest.fn().mockResolvedValue(true) };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             mockReq.body = { name: 'Updated Name' };

//             await updateVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockProfile.save).toHaveBeenCalled();
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await updateVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });

//     describe('getVolunteerHistory', () => {
//         it('should return the volunteer history', async () => {
//             VolunteerProfile.findOne.mockImplementation(() => ({
//                 populate: jest.fn().mockResolvedValue({ history: [{ event: 'Event A' }] }),
//             }));

//             await getVolunteerHistory(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith([{ event: 'Event A' }]);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await getVolunteerHistory(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });

//     describe('updateGeneralAvailability', () => {
//         it('should update general availability', async () => {
//             const mockProfile = { save: jest.fn().mockResolvedValue(true) };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             mockReq.body = { availability: ['Monday'] };

//             await updateGeneralAvailability(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockProfile.save).toHaveBeenCalled();
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await updateGeneralAvailability(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });
// });







// const mongoose = require('mongoose');
// const {
//     getVolunteerProfile,
//     updateVolunteerProfile,
//     getVolunteerHistory,
//     updateGeneralAvailability,
// } = require('../controllers/volunteerController');
// const VolunteerProfile = require('../models/volunteerProfileModel');

// jest.mock('../models/volunteerProfileModel');

// describe('VolunteerController', () => {
//     let mockReq, mockRes;

//     beforeAll(() => {
//         jest.mock('mongoose', () => ({
//             ...jest.requireActual('mongoose'),
//             connect: jest.fn(),
//             connection: {
//                 close: jest.fn(),
//             },
//         }));
//     });

//     beforeEach(() => {
//         mockReq = {
//             user: { userId: new mongoose.Types.ObjectId() },
//             body: {},
//         };

//         mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     describe('getVolunteerProfile', () => {
//         it('should return a volunteer profile with the role', async () => {
//             const mockProfile = { name: 'John Doe', role: 'volunteer' };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             await getVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await getVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });

//     describe('updateVolunteerProfile', () => {
//         it('should update a volunteer profile', async () => {
//             const mockProfile = { save: jest.fn().mockResolvedValue(true) };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             mockReq.body = { name: 'Updated Name' };

//             await updateVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockProfile.save).toHaveBeenCalled();
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await updateVolunteerProfile(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });

//     describe('getVolunteerHistory', () => {
//         it('should return the volunteer history', async () => {
//             VolunteerProfile.findOne.mockImplementation(() => ({
//                 populate: jest.fn().mockResolvedValue({ history: [{ event: 'Event A' }] }),
//             }));

//             await getVolunteerHistory(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith([{ event: 'Event A' }]);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await getVolunteerHistory(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });

//     describe('updateGeneralAvailability', () => {
//         it('should update general availability', async () => {
//             const mockProfile = { save: jest.fn().mockResolvedValue(true) };
//             VolunteerProfile.findOne.mockResolvedValue(mockProfile);

//             mockReq.body = { availability: ['Monday'] };

//             await updateGeneralAvailability(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockProfile.save).toHaveBeenCalled();
//             expect(mockRes.status).toHaveBeenCalledWith(200);
//             expect(mockRes.json).toHaveBeenCalledWith(mockProfile);
//         });

//         it('should return 404 if profile is not found', async () => {
//             VolunteerProfile.findOne.mockResolvedValue(null);

//             await updateGeneralAvailability(mockReq, mockRes);

//             expect(VolunteerProfile.findOne).toHaveBeenCalledWith({ userId: mockReq.user.userId });
//             expect(mockRes.status).toHaveBeenCalledWith(404);
//             expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Volunteer profile not found' });
//         });
//     });
// });










