//src\controllers\eventController.js
const Event = require('../models/eventModel');
const VolunteerProfile = require('../models/volunteerprofileModel');

// Create a new events
const createEvent = async (req, res) => {
    try {
      console.log("Request body:", req.body);  // Log the request body to ensure data is coming through
      const { name, description, address1, address2, city, state, zipcode, skillsRequired, urgency, date, time } = req.body;
  
      // Basic validation to ensure all required fields are present
      if (!name || !description || !address1 || !city || !state || !zipcode || !skillsRequired || !urgency || !date || !time) {
        console.log("Missing required fields");
        return res.status(400).json({ msg: 'Please fill all required fields' });
      }
  
      // Ensure that the `date` is a valid date object
      if (isNaN(new Date(date).getTime())) {
        console.log("Invalid date format:", date);
        return res.status(400).json({ msg: 'Invalid date format' });
      }
  
      const event = new Event({
        name,
        description,
        address: {  // Pass the address object here
          address1,
          address2,
          city,
          state,
          zipcode
        },
        skillsRequired,
        urgency,
        date: new Date(date),  // Save the date as a Date object
        time
      });
  
      await event.save();
      console.log("Event saved successfully");
      return res.status(201).json({ msg: 'Event created successfully' });
    } catch (error) {
      console.error("Error while creating event:", error);
      return res.status(500).json({ msg: 'Failed to create event' });
    }
  };  
  

  

// Register a volunteer to an event
const registerVolunteerToEvent = async (req, res) => {
  const { eventId, volunteerId } = req.body;
  
  try {
    // Find the event by its ID
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Find the volunteer by their ID
    const volunteer = await VolunteerProfile.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ msg: 'Volunteer not found' });

    // Add volunteer to event's registeredVolunteers only if they are not already registered
    if (!event.registeredVolunteers.includes(volunteerId)) {
      event.registeredVolunteers.push(volunteerId);
    }

    // Add event to volunteer's confirmedEvents only if it is not already confirmed
    if (!volunteer.confirmedEvents.includes(eventId)) {
      volunteer.confirmedEvents.push(eventId);
    }

    // Save the updated event and volunteer profiles to the database
    await event.save();
    await volunteer.save();

    res.status(200).json({ msg: 'Volunteer registered for event' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getEvents = async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events from the database
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ msg: 'Failed to fetch events' });
    }
  };

module.exports = { createEvent, registerVolunteerToEvent, getEvents };
