// migration.js
require('dotenv').config();
const mongoose = require('mongoose');
const VolunteerProfile = require('./src/models/volunteerProfileModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

const migrateAvailability = async () => {
  try {
    console.log('Fetching volunteer profiles...');
    const profiles = await VolunteerProfile.find();

    if (profiles.length === 0) {
      console.log('No profiles found. Exiting migration.');
      return process.exit(0);
    }

    console.log(`Found ${profiles.length} profiles. Starting migration...`);

    for (const profile of profiles) {
      console.log(`Updating profile with ID: ${profile._id}`);

      // Initialize availability with specific and blocked
      profile.availability = {
        general: {}, // Initialize general availability as empty
        specific: [], // No specific dates initially
        blocked: [],  // No blocked dates initially
      };

      await profile.save();
      console.log(`Profile ${profile._id} updated.`);
    }

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

migrateAvailability();