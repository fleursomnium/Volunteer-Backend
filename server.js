const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();
const cron = require('node-cron'); 

dotenv.config();

// Models
const Event = require('./src/models/eventModel');
const VolunteerProfile = require('./src/models/volunteerProfileModel');

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const volunteerRoutes = require('./src/routes/volunteerRoutes');
const statesRoutes = require('./src/routes/statesRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const reportRoutes = require('./src/routes/reportRoutes'); 


// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/states', statesRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Schedule a cron job to run every day at midnight to update volunteer histories
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const pastEvents = await Event.find({ date: { $lt: now } }); // Find events with a past date

    for (const event of pastEvents) {
      // For each past event, update all registered volunteers' histories
      await VolunteerProfile.updateMany(
        { confirmedEvents: event._id },
        {
          //$pull: { confirmedEvents: event._id }, // Remove from confirmed events
          $addToSet: { history: event._id } // Add to history without duplicating
        }
      );
    }
    //console.log('Volunteer histories updated');
  } catch (error) {
    console.error('Error updating volunteer histories:', error);
  }
});


// Start Server
const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//console.log(`Server running on port ${PORT}`);
// });
module.exports = app;


//11/1
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// require('dotenv').config();


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Import Routes
// const authRoutes = require('./src/routes/authRoutes');
// const eventRoutes = require('./src/routes/eventRoutes');
// const volunteerRoutes = require('./src/routes/volunteerRoutes');
// const statesRoutes = require('./src/routes/statesRoutes');
// app.use('/api/states', statesRoutes);
// // Use Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/volunteers', volunteerRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));


// // Start Server
// const PORT = process.env.PORT || 4000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// module.exports = app;





