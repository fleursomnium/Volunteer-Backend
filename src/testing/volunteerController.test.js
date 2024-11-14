// const VolunteerProfile = require('../models/volunteerprofileModel');

// // Update volunteer profile
// const updateVolunteerProfile = async (req, res) => {
//     const { userId } = req.user;  // Now req.user is populated by the middleware
//     const { firstName, lastName, preferences, skills, address1, address2, city, state, zipcode, availability } = req.body;

//     try {
//         const profile = await VolunteerProfile.findOne({ userId });

//         if (!profile) {
//             return res.status(404).json({ msg: 'Profile not found' });
//         }

//         // Update profile fields
//         profile.firstName = firstName || profile.firstName;
//         profile.lastName = lastName || profile.lastName;
//         profile.preferences = preferences || profile.preferences;
//         profile.skills = skills || profile.skills;
//         profile.address.address1 = address1 || profile.address.address1;
//         profile.address.address2 = address2 || profile.address.address2;
//         profile.address.city = city || profile.address.city;
//         profile.address.state = state || profile.address.state;
//         profile.address.zipcode = zipcode || profile.address.zipcode;
//         profile.availability = availability || profile.availability;

//         await profile.save();

//         res.status(200).json({ msg: 'Profile updated successfully', profile });
//     } catch (error) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// };


// module.exports = { updateVolunteerProfile };

//10/31
// const { updateVolunteerProfile } = require('../controllers/volunteerController');
// const VolunteerProfile = require('../models/volunteerprofileModel');

// jest.mock('../models/volunteerprofileModel'); // Mock the VolunteerProfile model

// describe('VolunteerController - updateVolunteerProfile', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             user: { userId: 'volunteer123' },
//             body: {
//                 firstName: 'Jane',
//                 lastName: 'Doe',
//                 skills: ['Teamwork'],
//                 address1: '123 Main St',
//                 city: 'Houston',
//                 state: 'TX',
//                 zipcode: '77001',
//                 availability: ['2024-10-01'],
//             },
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };

//         jest.clearAllMocks();
//     });

//     it('should update volunteer profile successfully', async () => {
//         // Mocking VolunteerProfile.findOne to return a volunteer profile
//         VolunteerProfile.findOne.mockResolvedValue({
//             save: jest.fn(),
//         });

//         await updateVolunteerProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             msg: 'Profile updated successfully',
//             profile: expect.any(Object),
//         });
//     });

//     it('should return 404 if profile not found', async () => {
//         // Mocking VolunteerProfile.findOne to return null
//         VolunteerProfile.findOne.mockResolvedValue(null);

//         await updateVolunteerProfile(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
//     });
// });


//10//31
const { updateVolunteerProfile } = require('../controllers/volunteerController');
const VolunteerProfile = require('../models/volunteerProfileModel'); // Make sure the case matches exactly

jest.mock('../models/volunteerProfileModel'); // Mock the VolunteerProfile model

describe('VolunteerController - updateVolunteerProfile', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { userId: 'volunteer123' },
            body: {
                firstName: 'Jane',
                lastName: 'Doe',
                skills: ['Teamwork'],
                address1: '123 Main St',
                city: 'Houston',
                state: 'TX',
                zipcode: '77001',
                availability: ['2024-10-01'],
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it('should update volunteer profile successfully', async () => {
        // Mocking VolunteerProfile.findOne to return a volunteer profile
        VolunteerProfile.findOne.mockResolvedValue({
            firstName: 'OldFirstName',
            lastName: 'OldLastName',
            skills: [],
            address: {
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipcode: '',
            },
            availability: [],
            save: jest.fn(), // Mock the save function on the profile object
        });

        await updateVolunteerProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'Profile updated successfully',
            profile: expect.any(Object),
        });
    });

    it('should return 404 if profile not found', async () => {
        // Mocking VolunteerProfile.findOne to return null
        VolunteerProfile.findOne.mockResolvedValue(null);

        await updateVolunteerProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Profile not found' });
    });
});
