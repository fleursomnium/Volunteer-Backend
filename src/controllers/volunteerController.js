//src\controllers\volunteerController.js
const VolunteerProfile = require('../models/volunteerProfileModel');
const User = require('../models/userModel');

const { checkTimeOverlap } = require('../utils/dateUtils');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const mongoose = require('mongoose'); // Add this line at the top



// Get volunteer profile with role included
const getVolunteerProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    // Fetch the volunteer profile
    const profile = await VolunteerProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Fetch the user data to get the role
    const user = await User.findById(userId, 'role'); // Select only the 'role' field
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Combine profile data with role
    const profileWithRole = {
      ...profile.toObject(), // Convert Mongoose document to plain object
      role: user.role,       // Add the role from the User collection
    };

    // Send the combined response
    res.status(200).json(profileWithRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update volunteer profile
const updateVolunteerProfile = async (req, res) => {
  const { userId } = req.user; // Now req.user is populated by the middleware
  console.log("Request body:", req.body); // Log incoming data for debugging
  const {
    firstName,
    lastName,
    preferences,
    skills,
    address1,
    address2,
    city,
    state,
    zipcode,
    availability,
    addressMode,
  } = req.body;

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
    profile.addressMode = addressMode || profile.addressMode; // Save addressMode

    // Mark profile as completed
    profile.volunteerFormCompleted = 'completed';

    await profile.save();

    res.status(200).json({ msg: 'Profile updated successfully', profile });
  } catch (error) {
    console.error(error);
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

// Update general availability
const updateGeneralAvailability = async (req, res) => {
  const { userId } = req.user;
  const { generalAvailability } = req.body;

  try {
    const profile = await VolunteerProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Validate general availability input
    for (const [day, times] of Object.entries(generalAvailability)) {
      if ((!times.start && times.end) || (times.start && !times.end)) {
          return res.status(400).json({ msg: `Incomplete time range for ${day}.` });
      }
      if (times.start && times.end && times.start >= times.end) {
          return res.status(400).json({ msg: `Invalid time range for ${day}. Start must be before End.` });
      }
  }
  

    profile.availability.general = generalAvailability;
    await profile.save();

    res.status(200).json({ msg: 'General availability updated successfully', profile });
  } catch (error) {
    console.error('Error updating general availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


// Update specific availability with validation
const updateSpecificAvailability = async (req, res) => {
  const { userId } = req.user;
  const { specificDates } = req.body;

  try {
    const profile = await VolunteerProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Validate overlaps
    for (const specificDate of specificDates) {
      for (const blockedDate of profile.availability.overrides.remove) {
        if (checkTimeOverlap(specificDate, blockedDate)) {
          return res.status(400).json({
            msg: `Overlap detected between specific date ${specificDate.date} and blocked date ${blockedDate.date}.`,
          });
        }
      }
    }

    // Add specific availability dates
    const formattedDates = specificDates.map((entry) => ({
      date: new Date(entry.date),
      start: entry.start,
      end: entry.end,
    }));

    profile.availability.specific = [
      ...profile.availability.specific,
      ...formattedDates.filter(
          (newEntry) =>
              !profile.availability.specific.some(
                  (existing) => existing.date.getTime() === newEntry.date.getTime()
              )
      ),
  ];

    await profile.save();
    res.status(200).json({ msg: 'Specific availability updated successfully', profile });
  } catch (error) {
    console.error('Error updating specific availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update blocked dates with validation
const updateBlockedDates = async (req, res) => {
  const { userId } = req.user;
  const { blockedDates } = req.body;

  try {
    const profile = await VolunteerProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Validate overlaps
    for (const blockedDate of blockedDates) {
      for (const specificDate of profile.availability.overrides.add) {
        if (checkTimeOverlap(specificDate, blockedDate)) {
          return res.status(400).json({
            msg: `Overlap detected between blocked date ${blockedDate.date} and specific date ${specificDate.date}.`,
          });
        }
      }
    }

    // Add blocked dates
    const formattedBlockedDates = blockedDates.map((entry) => ({
      date: new Date(entry.date),
      start: entry.start,
      end: entry.end,
    }));

    profile.availability.blocked = [
      ...profile.availability.blocked,
      ...formattedBlockedDates.filter(
          (newEntry) =>
              !profile.availability.blocked.some(
                  (existing) => existing.date.getTime() === newEntry.date.getTime()
              )
      ),
  ];

    await profile.save();
    res.status(200).json({ msg: 'Blocked dates updated successfully', profile });
  } catch (error) {
    console.error('Error updating blocked dates:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update availability (Combined function)
const updateAvailability = async (req, res) => {
  const { userId } = req.user;
  const {
    generalAvailability,
    specificDates,
    blockedDates,
    specificDatesToDelete,
    blockedDatesToDelete,
  } = req.body;

  try {
    const profile = await VolunteerProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Initialize availability if undefined
    if (!profile.availability) {
      profile.availability = { general: {}, specific: [], blocked: [] };
    }

    // Update general availability
    if (generalAvailability) {
      console.log('Updating general availability');
      profile.availability.general = generalAvailability;
    }

    // Handle deletions for specific dates
    if (specificDatesToDelete && specificDatesToDelete.length > 0) {
      profile.availability.specific = profile.availability.specific.filter(
        (entry) => !specificDatesToDelete.includes(entry._id.toString())
      );
    }

    // Update specific dates
    if (specificDates) {
      specificDates.forEach((newEntry) => {
        const newDate = new Date(newEntry.date);
        if (newEntry._id && isValidObjectId(newEntry._id)) {
          // Existing entry - update it
          const index = profile.availability.specific.findIndex(
            (existingEntry) => existingEntry._id.toString() === newEntry._id
          );
          if (index >= 0) {
            profile.availability.specific[index] = {
              ...profile.availability.specific[index].toObject(),
              ...newEntry,
              date: newDate,
            };
          } else {
            console.warn('Specific date entry not found for update:', newEntry._id);
          }
        } else {
          // New entry - add it
          profile.availability.specific.push({
            date: newDate,
            start: newEntry.start || '',
            end: newEntry.end || '',
          });
        }
      });
    }

    // Handle deletions for blocked dates
    if (blockedDatesToDelete && blockedDatesToDelete.length > 0) {
      profile.availability.blocked = profile.availability.blocked.filter(
        (entry) => !blockedDatesToDelete.includes(entry._id.toString())
      );
    }

    // Update blocked dates
    if (blockedDates) {
      blockedDates.forEach((newEntry) => {
        const newDate = new Date(newEntry.date);
        if (isValidObjectId(newEntry._id)) {
          // Existing entry - update it
          const index = profile.availability.blocked.findIndex(
            (existingEntry) => existingEntry._id.toString() === newEntry._id
          );
          if (index >= 0) {
            profile.availability.blocked[index] = {
              ...profile.availability.blocked[index]._doc,
              ...newEntry,
              date: newDate,
            };
          }
        } else {
          // New entry - add it
          profile.availability.blocked.push({
            ...newEntry,
            date: newDate,
          });
        }
      });
    }

    // Optional: Validate for conflicts or overlaps here

    // Save the profile with updated availability
    await profile.save();

    res.status(200).json({
      msg: 'Availability updated successfully',
      availability: profile.availability,
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fetch the availability of the volunteer
const getAvailability = async (req, res) => {
  try {
    const { userId } = req.user;

    const profile = await VolunteerProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.status(200).json({
      availability: profile.availability,
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = { updateVolunteerProfile, getVolunteerProfile, getVolunteerHistory, 
  updateBlockedDates, updateGeneralAvailability, updateSpecificAvailability, 
  updateAvailability, getAvailability };