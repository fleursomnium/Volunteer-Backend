const Event = require('../models/eventModel');

const createEvent = async (req, res, next) => {
  try {
    const {
      eventName,
      eventDescription,
      address1,
      address2,
      city,
      state,
      zipcode,
      urgency,
      skills,
      dates,
      time,
    } = req.body;

    // Validation check for required fields
    if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates || !time) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create new event
    const newEvent = new Event({
      eventName,
      description: eventDescription,
      location: {
        address: address1,
        city,
        state,
        zipcode,
      },
      urgency,
      requiredSkills: skills,
      date: dates,
      time,
    });

    // Save event to MongoDB
    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event created successfully.", event: savedEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    next(error);
  }
};

module.exports = { createEvent };





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
