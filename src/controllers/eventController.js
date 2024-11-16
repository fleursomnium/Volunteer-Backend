//src\controllers\eventController.js
const Event = require('../models/eventModel');
const VolunteerProfile = require('../models/volunteerProfileModel');
const Notification = require('../models/notificationModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Create a new events
const createEvent = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { name, description, address1, address2, city, state, zipcode, skillsRequired, urgency, date, timeStart, timeEnd } = req.body;

    // Basic validation
    if (!name || !description || !address1 || !city || !state || !zipcode || !skillsRequired || !urgency || !date || !timeStart || !timeEnd) {
      console.log("Missing required fields");
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }

    // Ensure date is valid
    if (isNaN(new Date(date).getTime())) {
      console.log("Invalid date format:", date);
      return res.status(400).json({ msg: 'Invalid date format' });
    }

    const event = new Event({
      name,
      description,
      address: {
        address1,
        address2,
        city,
        state,
        zipcode
      },
      skillsRequired,
      urgency,
      date: new Date(date),
      timeStart,
      timeEnd
    });

    await event.save();
    console.log("Event saved successfully");


    // Create a notification for all volunteers
    const notification = new Notification({
      title: `New Event: ${event.name}`,
      message: `A new event "${event.name}" has been created. Check it out and sign up if you're interested!`,
      targetAudience: 'volunteer', // Specify that this notification is for volunteers
      eventId: event._id // Link to the event
    });
    await notification.save();




    return res.status(201).json({ msg: 'Event created successfully', eventId: event._id });
  } catch (error) {
    console.error("Error while creating event:", error);
    return res.status(500).json({ msg: 'Failed to create event' });
  }
};

// Update an existing event
const updateEvent = async (req, res) => {
  const eventId = req.params.id; // Get the event ID from the URL parameters
  const { name, description, address1, address2, city, state, zipcode, skillsRequired, urgency, date, timeStart, timeEnd } = req.body;

  try {
    // Find and update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        name,
        description,
        address: {
          address1,
          address2,
          city,
          state,
          zipcode,
        },
        skillsRequired,
        urgency,
        date: new Date(date), // Ensure the date is stored as a Date object
        timeStart,
        timeEnd,
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(200).json({ msg: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ msg: 'Failed to update event' });
  }
};
  
  
  const registerVolunteerToEvent = async (req, res) => {
    const { eventId, volunteerId } = req.body;

    console.log("Received eventId:", eventId);
    console.log("Received volunteerId:", volunteerId);

    try {
        // Convert eventId to ObjectId
        const event = await Event.findById(new ObjectId(eventId));  // Make sure to use new ObjectId()
       
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Ensure the registeredVolunteers array exists
        if (!event.registeredVolunteers) {
            event.registeredVolunteers = []; // Initialize if undefined
        }

        // Convert volunteerId to ObjectId
        const volunteer = await VolunteerProfile.findOne({ userId: new ObjectId(volunteerId) });  // Query by userId
        if (!volunteer) {
            return res.status(404).json({ msg: 'Volunteer not found' });
        }

        // Ensure the confirmedEvents array exists
        if (!volunteer.confirmedEvents) {
            volunteer.confirmedEvents = []; // Initialize if undefined
        }

        // Add volunteer to the event's registeredVolunteers array
        if (!event.registeredVolunteers.some(id => id.equals(volunteerId))) {
            event.registeredVolunteers.push(volunteerId);
        }

        // Add event to volunteer's confirmedEvents array
        if (!volunteer.confirmedEvents.some(id => id.equals(eventId))) {
            volunteer.confirmedEvents.push(eventId);
        }

        await event.save();
        await volunteer.save();

        res.status(200).json({ msg: 'Volunteer registered for event' });
    } catch (error) {
        console.error("Error registering volunteer to event:", error);
        res.status(500).json({ msg: 'Server error' });
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



// Fetch available events for the volunteer (those they are not yet registered for)
const getAvailableEvents = async (req, res) => {
    try {
        const volunteerId = req.user.userId;  // Get the userId from the token (this should be set by your JWT middleware)

        // Find the volunteer's profile
        const volunteer = await VolunteerProfile.findOne({ userId: volunteerId }).populate('confirmedEvents');

        // If the volunteer is not found, return an error
        if (!volunteer) {
            return res.status(404).json({ msg: 'Volunteer not found' });
        }

        // Fetch all events
        const allEvents = await Event.find();

        // Filter out events the volunteer is already registered for (those in confirmedEvents)
        const availableEvents = allEvents.filter(event => !volunteer.confirmedEvents.some(confirmedEvent => confirmedEvent._id.equals(event._id)));

        // Send the available events (those not already registered for)
        res.status(200).json(availableEvents);
    } catch (error) {
        console.error("Error fetching available events:", error);
        res.status(500).json({ msg: 'Failed to fetch available events' });
    }
};


// Fetch scheduled events for the volunteer (those they are registered for)
const getScheduledEvents = async (req, res) => {
    const volunteerId = req.user.userId; // Assuming req.user is populated by your JWT middleware
    try {
        const volunteer = await VolunteerProfile.findOne({ userId: volunteerId }).populate('confirmedEvents');
        res.status(200).json(volunteer.confirmedEvents);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to fetch scheduled events' });
    }
};


  // Unregister a volunteer from an event
const unregisterVolunteerFromEvent = async (req, res) => {
    const { eventId } = req.body;
 
    try {
      // Find the volunteer by their userId from the token
      const volunteer = await VolunteerProfile.findOne({ userId: req.user.userId });
      if (!volunteer) return res.status(404).json({ msg: 'Volunteer not found' });
 
      // Remove the event from the volunteer's confirmedEvents
      volunteer.confirmedEvents = volunteer.confirmedEvents.filter(
        (id) => id.toString() !== eventId
      );
     
      await volunteer.save();
 
      res.status(200).json({ msg: 'Volunteer unregistered from event successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error unregistering from event' });
    }
  };


  async function getMatchingEvents(req, res) {
    try {
        const volunteerId = req.user.userId;


        const volunteer = await VolunteerProfile.findById(volunteerId);
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }


        const { skills, availability, address, confirmedEvents } = volunteer;


        const filter = {
            _id: { $nin: confirmedEvents },
            skillsRequired: { $in: skills },
            date: { $in: availability },
            "address.city": address.city,
            "address.state": address.state,
        };


        const matchingEvents = await Event.find(filter).populate(
            "registeredVolunteers"
        );


        res.json(matchingEvents);
    } catch (error) {
        console.error("Error fetching matching events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
 
 


module.exports = { createEvent, updateEvent, registerVolunteerToEvent, getEvents, getAvailableEvents, 
                   getScheduledEvents, unregisterVolunteerFromEvent };