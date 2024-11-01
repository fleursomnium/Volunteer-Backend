//src\controllers\volunteerController.js
const VolunteerProfile = require('../models/volunteerProfileModel');

const getVolunteerProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    const profile = await VolunteerProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update volunteer profile
const updateVolunteerProfile = async (req, res) => {
  const { userId } = req.user;  // Now req.user is populated by the middleware
  console.log("Request body:", req.body);  // Log incoming data for debugging
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

// Function to get the volunteer's history
const getVolunteerHistory = async (req, res) => {
  try {
    // Make sure to use only the userId from req.user
    const userId = req.user.userId;
    console.log("Fetching volunteer history for userId:", userId);

    const volunteerProfile = await VolunteerProfile.findOne({ userId })
      .populate('history', 'name description date address skillsRequired'); // Populate with event details

    if (!volunteerProfile) {
      console.log("Volunteer profile not found");
      return res.status(404).json({ msg: 'Volunteer profile not found' });
    }

    console.log("Volunteer history fetched successfully:", volunteerProfile.history);
    res.status(200).json(volunteerProfile.history);
  } catch (error) {
    console.error('Error fetching volunteer history:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};



module.exports = { updateVolunteerProfile, getVolunteerProfile, getVolunteerHistory };