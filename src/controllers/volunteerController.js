const VolunteerProfile = require('../models/volunteerprofileModel')

// Update Volunteer Profile
const updateProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await VolunteerProfile.findOneAndUpdate({ userId }, req.body, { new: true });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { updateProfile };

