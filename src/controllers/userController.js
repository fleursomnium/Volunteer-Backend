// userController.js
exports.updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  console.log('UserId:', userId);
  console.log('Request body:', req.body);

  const { firstName, lastName, address1, address2, city, state, zipcode, preferences, skills, dates, time } = req.body;

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },  // Find the profile by user ID
      {
        $set: {
          fullName: `${firstName} ${lastName}`,
          address1,
          address2,
          city,
          state,
          zipcode,
          preferences,
          skills,
          availability: dates,
          time
        },
      },
      { new: true } // Return the updated profile document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
