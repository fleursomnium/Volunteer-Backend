const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
    try {
        console.log('Received event data:', req.body); // Debugging log

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
            time
        } = req.body;

        if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode || !dates || !time) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

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

        const savedEvent = await newEvent.save();
        console.log('Event created successfully:', savedEvent); // Debugging log
        res.status(201).json({ message: 'Event created successfully.', event: savedEvent });
    } catch (error) {
        console.error('Error creating event:', error); // Debugging log
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { createEvent };







// import Event from '../models/eventModel.js';  // Use ES module import
// import { readJSON, writeJSON } from '../utils/fileHandler.js';
// import path from 'path';
// import { fileURLToPath } from 'url';


// // Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const EVENTS_FILE = path.join(__dirname, "../data/events.json");


// const createEvent = async (req, res, next) => {
//     try {
//         const {
//             eventName,
//             eventDescription,
//             address1,
//             address2,
//             city,
//             state,
//             zipcode,
//             urgency,
//             skills,
//             dates,
//             time,
//         } = req.body;


//         if (!eventName || !eventDescription || !address1 || !city || !state || !zipcode) {
//             return res.status(400).json({
//                 message: "Required fields: eventName, eventDescription, address1, city, state, and zipcode."
//             });
//         }


//         const newEvent = new Event({
//             eventName,
//             eventDescription,
//             address1,
//             address2,
//             city,
//             state,
//             zipcode,
//             urgency,
//             skills,
//             dates,
//             time,
//         });


//         const events = await readJSON(EVENTS_FILE);
//         events.push(newEvent);


//         await writeJSON(EVENTS_FILE, events);


//         res
//             .status(201)
//             .json({ message: "Event created successfully.", event: newEvent });
//     } catch (error) {
//         next(error);
//     }
// };


// export { createEvent };




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
