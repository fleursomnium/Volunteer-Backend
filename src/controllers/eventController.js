//src\controllers\eventController.js
const Event = require('../models/eventModel');
const VolunteerProfile = require('../models/volunteerProfileModel');
const Notification = require('../models/notificationModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createEvent = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { name, description, address1, address2, city, state, zipcode, skillsRequired, urgency, date, timeStart, timeEnd, addressMode } = req.body;

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
      timeEnd,
      addressMode
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

const updateEvent = async (req, res) => {
  const eventId = req.params.id; // Get the event ID from the URL parameters
  const { name, description, address1, address2, city, state, zipcode, skillsRequired, urgency, date, timeStart, timeEnd, addressMode } = req.body;

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
        addressMode
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

const getEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ msg: 'Failed to fetch event' });
  }
};

const isVolunteerDateAvailableForEvent = (volunteer, event) => {
  if (!volunteer.availability || !event.date || !event.timeStart || !event.timeEnd) {
    return false; // If availability or event details are missing, consider the volunteer unavailable
  }

  const eventDate = new Date(event.date).toISOString().split('T')[0]; // Get the date part
  const eventStartTime = event.timeStart;
  const eventEndTime = event.timeEnd;

  // Check if the event conflicts with blocked dates
  const isBlocked = volunteer.availability.blocked.some((blockedDate) => {
    const blockedDateOnly = new Date(blockedDate.date).toISOString().split('T')[0];
    return blockedDateOnly === eventDate && (
      blockedDate.isAllDay || 
      (blockedDate.start <= eventEndTime && blockedDate.end >= eventStartTime)
    );
  });
  if (isBlocked) return false;

  // Check if the event matches specific available dates
  const isSpecificAvailable = volunteer.availability.specific.some((specificDate) => {
    const specificDateOnly = new Date(specificDate.date).toISOString().split('T')[0];
    return specificDateOnly === eventDate && (
      specificDate.isAllDay || 
      (specificDate.start <= eventStartTime && specificDate.end >= eventEndTime)
    );
  });
  if (isSpecificAvailable) return true;

  // Check general availability for the day of the week
  const eventDayOfWeek = new Date(event.date).toLocaleString('en-US', { weekday: 'long' });
  const generalAvailability = volunteer.availability.general[eventDayOfWeek];
  if (generalAvailability && generalAvailability.start && generalAvailability.end) {
    return generalAvailability.start <= eventStartTime && generalAvailability.end >= eventEndTime;
  }

  return false; // If no specific availability matches and general availability is undefined or does not match
};
 
const matchVolunteersToEvent = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
    console.error("Invalid event ID:", eventId);
    return res.status(400).json({ msg: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      console.log(`Event not found for id: ${eventId}`);
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (!Array.isArray(event.matchedVolunteers)) {
      event.matchedVolunteers = [];
    }

    const volunteers = await VolunteerProfile.find();

    // Revalidate existing matchedVolunteers
    event.matchedVolunteers = event.matchedVolunteers.filter((volunteerId) => {
      const volunteer = volunteers.find((v) => v._id.equals(volunteerId));
      if (!volunteer) return false; // Volunteer no longer exists

      const isSameZipcode = volunteer.address.zipcode === event.address.zipcode;
      const hasMatchingSkills = event.skillsRequired.some((skill) =>
        volunteer.skills.includes(skill)
      );
      const isDateAvailable = isVolunteerDateAvailableForEvent(volunteer, event);

      console.log(`Revalidating Volunteer ${volunteer._id} - Same Zipcode: ${isSameZipcode}, Matching Skills: ${hasMatchingSkills}, Available: ${isDateAvailable}`);
      return isSameZipcode && hasMatchingSkills && isDateAvailable;
    });

    // Match new volunteers
    const matchingVolunteers = volunteers.filter((volunteer) => {
      try {
        const isAlreadyRegistered = event.registeredVolunteers.some((id) =>
          id.equals(volunteer._id)
        ); // Check if the volunteer is already registered
        const isSameZipcode = volunteer.address.zipcode === event.address.zipcode;
        const hasMatchingSkills = event.skillsRequired.some((skill) =>
          volunteer.skills.includes(skill)
        );
        const isDateAvailable = isVolunteerDateAvailableForEvent(volunteer, event);

        console.log(`Volunteer ${volunteer._id} - Registered: ${isAlreadyRegistered}, Same Zipcode: ${isSameZipcode}, Matching Skills: ${hasMatchingSkills}, Available: ${isDateAvailable}`);
        return (
          !isAlreadyRegistered && // Exclude already registered volunteers
          isSameZipcode &&
          hasMatchingSkills &&
          isDateAvailable &&
          !event.matchedVolunteers.includes(volunteer._id) // Avoid duplicate matches
        );
      } catch (error) {
        console.error(`Error evaluating volunteer ${volunteer._id}:`, error);
        return false;
      }
    });

    console.log('Matching...');

    // Add new matches to event.matchedVolunteers
    for (const volunteer of matchingVolunteers) {
      event.matchedVolunteers.push(volunteer._id);
    }

    console.log('Updated Matched Volunteers:', event.matchedVolunteers);
    await event.save();

    res.status(200).json({
      msg: `${matchingVolunteers.length} new volunteers matched for the event.`,
      matchedVolunteers: event.matchedVolunteers,
    });
  } catch (error) {
    console.error('Error matching volunteers:', error);
    res.status(500).json({ msg: 'Server error while matching volunteers.' });
  }
};


const acceptMatchedEvent = async (req, res) => {
  const { eventId } = req.params;
  const volunteerId = req.user.userId; // Assuming the user is authenticated via JWT

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the volunteer is in matchedVolunteers
    const isMatched = event.matchedVolunteers.some((id) => id.equals(volunteerId));
    if (!isMatched) {
      return res.status(400).json({ msg: 'Volunteer not matched for this event' });
    }

    // Move volunteer from matchedVolunteers to registeredVolunteers
    event.registeredVolunteers.push(volunteerId);
    event.matchedVolunteers = event.matchedVolunteers.filter(
      (id) => !id.equals(volunteerId)
    );

    // Update the volunteer's profile
    const volunteer = await VolunteerProfile.findOne({ userId: volunteerId });
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    volunteer.confirmedEvents.push(eventId);

    await event.save();
    await volunteer.save();

    res.status(200).json({ msg: 'Volunteer successfully registered for the event' });
  } catch (error) {
    console.error('Error accepting matched event:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const registerFromMatch = async (req, res) => {
    const { eventId } = req.params;
    const { volunteerId } = req.body;

    console.log("Request Body in registerFromMatch:", req.body);

    if (!volunteerId) {
        return res.status(400).json({ msg: 'Volunteer ID is required.' });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Remove the volunteer from matchedVolunteers
        event.matchedVolunteers = event.matchedVolunteers.filter(id => id.toString() !== volunteerId);

        // Add the volunteer to registeredVolunteers if not already present
        if (!event.registeredVolunteers.includes(volunteerId)) {
            event.registeredVolunteers.push(volunteerId);
        }

        await event.save();

        // Update the volunteer's confirmedEvents field
        const volunteer = await VolunteerProfile.findById(volunteerId);
        if (!volunteer) {
            return res.status(404).json({ msg: 'Volunteer not found' });
        }

        // Add the eventId to the confirmedEvents array if not already present
        if (!volunteer.confirmedEvents.includes(eventId)) {
            volunteer.confirmedEvents.push(eventId);
            await volunteer.save();
        }

        res.status(200).json({ msg: 'Volunteer successfully registered for the event.' });
    } catch (error) {
        console.error('Error registering from match:', error);
        res.status(500).json({ msg: 'Server error while registering.' });
    }
};

const unregisterVolunteer = async (req, res) => {
  const { eventId, volunteerId } = req.body;

  try {
      const event = await Event.findById(eventId);
      if (!event) {
          return res.status(404).json({ msg: 'Event not found' });
      }

      // Remove volunteer from registeredVolunteers
      event.registeredVolunteers = event.registeredVolunteers.filter(id => id.toString() !== volunteerId);

      // Add volunteer back to matchedVolunteers
      if (!event.matchedVolunteers.includes(volunteerId)) {
          event.matchedVolunteers.push(volunteerId);
      }

      await event.save();

      // Remove event from volunteer's confirmedEvents
      const volunteer = await VolunteerProfile.findById(volunteerId);
      if (!volunteer) {
          return res.status(404).json({ msg: 'Volunteer not found' });
      }
      volunteer.confirmedEvents = volunteer.confirmedEvents.filter(id => id.toString() !== eventId);
      await volunteer.save();

      res.status(200).json({ msg: 'Successfully unregistered from the event.' });
  } catch (error) {
      console.error('Error unregistering volunteer:', error);
      res.status(500).json({ msg: 'Server error while unregistering.' });
  }
};

const rejectMatchedEvent = async (req, res) => {
  const { eventId, volunteerId } = req.body;

  try {
    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the volunteer is in matchedVolunteers
    const isMatched = event.matchedVolunteers.some((id) => id.equals(volunteerId));
    if (!isMatched) {
      return res.status(400).json({ msg: 'Volunteer is not matched for this event' });
    }

    // Remove the volunteer from matchedVolunteers
    event.matchedVolunteers = event.matchedVolunteers.filter(
      (id) => !id.equals(volunteerId)
    );

    // Save the updated event
    await event.save();

    // Optionally: Add a notification for the admin or log the rejection
    console.log(`Volunteer ${volunteerId} rejected event ${eventId}`);

    res.status(200).json({ msg: 'Volunteer has successfully rejected the event.' });
  } catch (error) {
    console.error('Error rejecting matched event:', error);
    res.status(500).json({ msg: 'Server error while rejecting the event.' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('registeredVolunteers');
    const eventsWithCounts = events.map((event) => ({
      ...event.toObject(),
      volunteerCount: event.registeredVolunteers.length,
    }));
    res.status(200).json(eventsWithCounts);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch events' });
  }
};

const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $gte: today } }).populate('registeredVolunteers');
    // Include volunteer counts if needed
    const eventsWithCounts = events.map((event) => ({
      ...event.toObject(),
      volunteerCount: event.registeredVolunteers.length,
    }));
    res.status(200).json(eventsWithCounts);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch upcoming events' });
  }
};

const getPastEvents = async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $lt: today } }).populate('registeredVolunteers');
    // Include volunteer counts if needed
    const eventsWithCounts = events.map((event) => ({
      ...event.toObject(),
      volunteerCount: event.registeredVolunteers.length,
    }));
    res.status(200).json(eventsWithCounts);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch past events' });
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

module.exports = { createEvent, updateEvent, getEvent, matchVolunteersToEvent, acceptMatchedEvent, registerFromMatch, unregisterVolunteer, 
  getEvents, getUpcomingEvents, getPastEvents, getAvailableEvents, getScheduledEvents, rejectMatchedEvent };

// const hasTimeConflict = (event1, event2) => {
//   // Check if the events are on the same date
//   const event1Date = new Date(event1.date).toDateString();
//   const event2Date = new Date(event2.date).toDateString();

//   if (event1Date !== event2Date) {
//     return false; // Events are on different dates, no conflict
//   }

//   // Parse event times
//   const event1Start = new Date(`${event1.date.toISOString().split('T')[0]}T${event1.timeStart}`);
//   const event1End = new Date(`${event1.date.toISOString().split('T')[0]}T${event1.timeEnd}`);
//   const event2Start = new Date(`${event2.date.toISOString().split('T')[0]}T${event2.timeStart}`);
//   const event2End = new Date(`${event2.date.toISOString().split('T')[0]}T${event2.timeEnd}`);

//   // Check for overlap
//   return event1Start < event2End && event1End > event2Start;
// };


//   const registerVolunteerToEvent = async (req, res) => {
//     const { eventId, volunteerId } = req.body;

//     console.log("Received eventId:", eventId);
//     console.log("Received volunteerId:", volunteerId);

//     try {
//         // Convert eventId to ObjectId
//         const event = await Event.findById(new ObjectId(eventId));  // Make sure to use new ObjectId()
       
//         if (!event) {
//             return res.status(404).json({ msg: 'Event not found' });
//         }

//         // Ensure the registeredVolunteers array exists
//         if (!event.registeredVolunteers) {
//             event.registeredVolunteers = []; // Initialize if undefined
//         }

//         // Convert volunteerId to ObjectId
//         const volunteer = await VolunteerProfile.findOne({ userId: new ObjectId(volunteerId) });  // Query by userId
//         if (!volunteer) {
//             return res.status(404).json({ msg: 'Volunteer not found' });
//         }

//         // Ensure the confirmedEvents array exists
//         if (!volunteer.confirmedEvents) {
//             volunteer.confirmedEvents = []; // Initialize if undefined
//         }

//         // Add volunteer to the event's registeredVolunteers array
//         if (!event.registeredVolunteers.some(id => id.equals(volunteerId))) {
//             event.registeredVolunteers.push(volunteerId);
//         }

//         // Add event to volunteer's confirmedEvents array
//         if (!volunteer.confirmedEvents.some(id => id.equals(eventId))) {
//             volunteer.confirmedEvents.push(eventId);
//         }

//         await event.save();
//         await volunteer.save();

//         res.status(200).json({ msg: 'Volunteer registered for event' });
//     } catch (error) {
//         console.error("Error registering volunteer to event:", error);
//         res.status(500).json({ msg: 'Server error' });
//     }
// };

// Unregister a volunteer from an event
// const unregisterVolunteerFromEvent = async (req, res) => {
//   const { eventId } = req.body;

//   try {
//     // Find the volunteer by their userId from the token
//     const volunteer = await VolunteerProfile.findOne({ userId: req.user.userId });
//     if (!volunteer) return res.status(404).json({ msg: 'Volunteer not found' });

//     // Remove the event from the volunteer's confirmedEvents
//     volunteer.confirmedEvents = volunteer.confirmedEvents.filter(
//       (id) => id.toString() !== eventId
//     );
    
//     await volunteer.save();

//     res.status(200).json({ msg: 'Volunteer unregistered from event successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Error unregistering from event' });
//   }
// };

//   async function getMatchingEvents(req, res) {
//     try {
//         const volunteerId = req.user.userId;


//         const volunteer = await VolunteerProfile.findById(volunteerId);
//         if (!volunteer) {
//             return res.status(404).json({ message: "Volunteer not found" });
//         }


//         const { skills, availability, address, confirmedEvents } = volunteer;


//         const filter = {
//             _id: { $nin: confirmedEvents },
//             skillsRequired: { $in: skills },
//             date: { $in: availability },
//             "address.city": address.city,
//             "address.state": address.state,
//         };


//         const matchingEvents = await Event.find(filter).populate(
//             "registeredVolunteers"
//         );


//         res.json(matchingEvents);
//     } catch (error) {
//         console.error("Error fetching matching events:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
 
// const runMatches = async (req, res) => {
//   try {
//     // Fetch all volunteers
//     const volunteers = await VolunteerProfile.find().populate('userId confirmedEvents');

//     // Fetch all upcoming events (events with dates in the future)
//     const today = new Date();
//     const upcomingEvents = await Event.find({ date: { $gte: today } });

//     // Initialize a map to track volunteer counts per event
//     const eventVolunteerCounts = {};

//     // Fetch existing registrations
//     upcomingEvents.forEach((event) => {
//       eventVolunteerCounts[event._id.toString()] = event.registeredVolunteers.length || 0;
//     });

//     // Urgency mapping
//     const urgencyLevels = { High: 3, Medium: 2, Low: 1 };

//     // Perform matching
//     for (const volunteer of volunteers) {
//       const availableEvents = upcomingEvents.filter((event) =>
//         isVolunteerAvailableForEvent(volunteer, event)
//       );

//       // Sort available events by urgency and volunteer count
//       availableEvents.sort((a, b) => {
//         const urgencyDifference = urgencyLevels[b.urgency] - urgencyLevels[a.urgency];
//         if (urgencyDifference !== 0) return urgencyDifference;

//         // If urgency is the same, assign to event with fewer volunteers
//         const aVolunteerCount = eventVolunteerCounts[a._id.toString()] || 0;
//         const bVolunteerCount = eventVolunteerCounts[b._id.toString()] || 0;

//         return aVolunteerCount - bVolunteerCount;
//       });

//       for (const event of availableEvents) {
//         const eventIdStr = event._id.toString();

//         // Check if the volunteer is already registered for an event that conflicts with this event
//         const hasConflict = volunteer.confirmedEvents.some((registeredEvent) =>
//           hasTimeConflict(event, registeredEvent)
//         );

//         if (hasConflict) {
//           continue; // Skip this event due to time conflict
//         }

//         // Proceed to register the volunteer

//         // Register the volunteer to the event
//         event.registeredVolunteers.push(volunteer._id);
//         await event.save();

//         // Update the volunteer's confirmedEvents
//         volunteer.confirmedEvents.push(event._id);
//         await volunteer.save();

//         // Update the volunteer count for the event
//         eventVolunteerCounts[eventIdStr] = (eventVolunteerCounts[eventIdStr] || 0) + 1;

//         // Break after assigning to one event
//         break;
//       }
//     }

//     res.status(200).json({ msg: 'Matching completed successfully!' });
//   } catch (error) {
//     console.error('Error running matches:', error);
//     res.status(500).json({ msg: 'Failed to run matches.' });
//   }
// };

// const isVolunteerAvailableForEvent = (volunteer, event) => {
//   const eventDate = new Date(event.date);
//   const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'long' });

//   // Check if event is on a blocked date
//   const isBlocked = volunteer.availability.blocked.some((blockedEntry) => {
//     const blockedDate = new Date(blockedEntry.date);
//     return (
//       blockedDate.toDateString() === eventDate.toDateString() &&
//       (blockedEntry.isAllDay ||
//         (blockedEntry.start && blockedEntry.end && isTimeOverlap(event, blockedEntry)))
//     );
//   });

//   if (isBlocked) return false;

//   // Check if event is on a specific date
//   const isSpecificDateAvailable = volunteer.availability.specific.some((specificEntry) => {
//     const specificDate = new Date(specificEntry.date);
//     return (
//       specificDate.toDateString() === eventDate.toDateString() &&
//       (specificEntry.isAllDay ||
//         (specificEntry.start && specificEntry.end && isTimeOverlap(event, specificEntry)))
//     );
//   });

//   if (isSpecificDateAvailable) return true;

//   // Check general availability
//   const generalAvailability = volunteer.availability.general[dayOfWeek];
//   if (generalAvailability && generalAvailability.isAvailable) {
//     if (generalAvailability.isAllDay) {
//       return true;
//     } else if (generalAvailability.start && generalAvailability.end) {
//       return isTimeOverlap(event, generalAvailability);
//     }
//   }

//   return false;
// };

// const isTimeOverlap = (event, availability) => {
//   const eventStart = new Date(`${event.date.toISOString().split('T')[0]}T${event.timeStart}`);
//   const eventEnd = new Date(`${event.date.toISOString().split('T')[0]}T${event.timeEnd}`);

//   const availStart = new Date(
//     `${event.date.toISOString().split('T')[0]}T${availability.start}`
//   );
//   const availEnd = new Date(`${event.date.toISOString().split('T')[0]}T${availability.end}`);

//   return eventStart < availEnd && eventEnd > availStart;
// };

// module.exports = { createEvent, updateEvent, registerVolunteerToEvent, getEvents, 
//                    getAvailableEvents, getScheduledEvents, unregisterVolunteerFromEvent, 
//                    matchVolunteersToEvent, acceptMatchedEvent, getUpcomingEvents, getPastEvents };