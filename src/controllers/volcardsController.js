const Event = require('../models/eventModel');
const VolunteerProfile = require('../models/volunteerProfileModel');

// Controller function to get volunteer cards for a specific event
const getVolunteersForEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        // Find the event by its ID and populate the registered volunteers
        const event = await Event.findById(eventId).populate({
            path: 'registeredVolunteers',
            select: 'firstName lastName skills preferences', // Only select these fields
        });

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Send the registered volunteers and event name
        res.status(200).json({
            eventName: event.name,
            registeredVolunteers: event.registeredVolunteers,
        });
    } catch (error) {
        console.error('Error fetching volunteers for event:', error);
        res.status(500).json({ msg: 'Failed to fetch volunteers for event' });
    }
};

module.exports = { getVolunteersForEvent };
