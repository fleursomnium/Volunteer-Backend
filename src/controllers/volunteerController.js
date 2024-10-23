const VolunteerProfile = require('../models/volunteerprofileModel');

// Update volunteer profile
const updateVolunteerProfile = async (req, res) => {
  const { userId } = req.user;  // Now req.user is populated by the middleware
  const { firstName, lastName, preferences, skills, address1, address2, city, state, zipcode, availability } = req.body;

  try {
    const profile = await VolunteerProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Update profile fields
    profile.firstName = firstName || profile.firstName;
    profile.lastName = lastName || profile.lastName;
    profile.preferences = preferences || profile.preferences;
    profile.skills = skills || profile.skills;
    profile.address.address1 = address1 || profile.address.address1;
    profile.address.address2 = address2 || profile.address.address2;
    profile.address.city = city || profile.address.city;
    profile.address.state = state || profile.address.state;
    profile.address.zipcode = zipcode || profile.address.zipcode;
    profile.availability = availability || profile.availability;

    await profile.save();

    res.status(200).json({ msg: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = { updateVolunteerProfile };