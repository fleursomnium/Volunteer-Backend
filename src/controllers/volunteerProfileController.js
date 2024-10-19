//src\controllers\volunteerProfileController.js
const Volunteer = require('../models/volunteerModel');

// Update volunteer profile
exports.updateVolunteerProfile = async (req, res) => {
    try {
        const { firstName, lastName, address1, address2, city, state, zipcode, preferences, skills } = req.body;

        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
            req.user.id,
            {
                firstName,
                lastName,
                address1,
                address2,
                city,
                state,
                zipcode,
                preferences,
                skills
            },
            { new: true }
        );

        if (!updatedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json(updatedVolunteer);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
