//eventController.js
const Event = require('../models/eventModel');
const VolunteerHistory = require('../models/VolunteerHistoryModel');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
      const { name, description, location, requiredSkills, urgency, date, time } = req.body;
  
      const event = new Event({
        name,
        description,
        location,
        requiredSkills,
        urgency,
        date,
        time,
      });
  
      await event.save();
      console.log('Event saved:', event);
      res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Error creating event', error });
    }
  };
  
  // Function to get all events from the database
  exports.getAllEvents = async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events
      res.json(events); // Return events as JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  }; 

// Get volunteers assigned to an event (for Admin Dashboard)
exports.getVolunteersForEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const volunteerHistory = await VolunteerHistory.find({ event: eventId }).populate('volunteer');
    res.json(volunteerHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers for the event', error });
  }
};




// const Event = require("../models/eventModel");
// const fileHandler = require("../utils/fileHandler");
// const path = require("path");

// const EVENTS_FILE = path.join(__dirname, "../data/events.json");

// const createEvent = async (req, res, next) => {
//   try {
//     const { name, date, location, description } = req.body;

//     if (!name || !date || !location) {
//       return res
//         .status(400)
//         .json({ message: "Name, date, and location are required." });
//     }

//     const newEvent = new Event({ name, date, location, description });

//     const events = await fileHandler.readJSON();

//     events.push(newEvent);
//     await fileHandler.writeJSON(events);

//     res
//       .status(201)
//       .json({ message: "Event created successfully.", event: newEvent });
//   } catch (error) {
//     next(error);
//   }
// };

// const getAllEvents = async (req, res, next) => {
//   try {
//     const events = await fileHandler.readJSON(EVENTS_FILE);
//     res.status(200).json({ events });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createEvent,
//   getAllEvents,
// };
