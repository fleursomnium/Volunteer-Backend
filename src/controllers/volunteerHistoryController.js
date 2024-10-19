const VolunteerHistory = require('../models/VolunteerHistoryModel');
const User = require('../models/userModel');

// Fetch volunteers registered to the event
exports.getVolunteersForEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const registeredVolunteers = await VolunteerHistory.find({ event: eventId }).populate('volunteer');
        res.json(registeredVolunteers.map(v => v.volunteer));  // Return the volunteer details
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registered volunteers', error });
    }
};

// Fetch all volunteers (both registered and unregistered for an event)
exports.getAllVolunteers = async (req, res) => {
    try {
        const allVolunteers = await User.find({ role: 'volunteer' });  // Fetch all users with the role 'volunteer'
        res.json(allVolunteers);  // Return all volunteers
    } catch (error) {
        res.status(500).json({ message: 'Error fetching volunteers', error });
    }
};

// Add a volunteer to an event
exports.addVolunteerToEvent = async (req, res) => {
    const { volunteerId, eventId } = req.body;

    try {
        // Check if the volunteer is already added to this event
        const existingRecord = await VolunteerHistory.findOne({ volunteer: volunteerId, event: eventId });
        if (existingRecord) {
            return res.status(400).json({ message: 'Volunteer is already assigned to this event' });
        }

        const history = new VolunteerHistory({
            volunteer: volunteerId,
            event: eventId,
            dateJoined: new Date(),
            status: 'confirmed',  // Mark as confirmed
        });
        await history.save();
        res.status(201).json({ message: 'Volunteer added to event successfully', history });
    } catch (error) {
        res.status(500).json({ message: 'Error adding volunteer to event', error });
    }
};

// Remove a volunteer from an event
exports.removeVolunteerFromEvent = async (req, res) => {
    const { volunteerId, eventId } = req.body;

    try {
        const result = await VolunteerHistory.findOneAndDelete({ volunteer: volunteerId, event: eventId });
        if (!result) {
            return res.status(404).json({ message: 'Volunteer not found in this event' });
        }
        res.status(200).json({ message: 'Volunteer removed from event successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing volunteer from event', error });
    }
};

const VolunteerHistory = require('../models/volunteerHistoryModels');
const User = require('../models/userModel');

// Fetch volunteers registered to the event
exports.getVolunteersForEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const registeredVolunteers = await VolunteerHistory.find({ event: eventId }).populate('volunteer');
        res.json(registeredVolunteers.map(v => v.volunteer));  // Return the volunteer details
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registered volunteers', error });
    }
};

// Fetch all volunteers (both registered and unregistered for an event)
exports.getAllVolunteers = async (req, res) => {
    try {
        const allVolunteers = await User.find({ role: 'volunteer' });  // Fetch all users with the role 'volunteer'
        res.json(allVolunteers);  // Return all volunteers
    } catch (error) {
        res.status(500).json({ message: 'Error fetching volunteers', error });
    }
};

// Add a volunteer to an event
exports.addVolunteerToEvent = async (req, res) => {
    const { volunteerId, eventId } = req.body;

    try {
        // Check if the volunteer is already added to this event
        const existingRecord = await VolunteerHistory.findOne({ volunteer: volunteerId, event: eventId });
        if (existingRecord) {
            return res.status(400).json({ message: 'Volunteer is already assigned to this event' });
        }

        const history = new VolunteerHistory({
            volunteer: volunteerId,
            event: eventId,
            dateJoined: new Date(),
            status: 'confirmed',  // Mark as confirmed
        });
        await history.save();
        res.status(201).json({ message: 'Volunteer added to event successfully', history });
    } catch (error) {
        res.status(500).json({ message: 'Error adding volunteer to event', error });
    }
};

// Remove a volunteer from an event
exports.removeVolunteerFromEvent = async (req, res) => {
    const { volunteerId, eventId } = req.body;

    try {
        const result = await VolunteerHistory.findOneAndDelete({ volunteer: volunteerId, event: eventId });
        if (!result) {
            return res.status(404).json({ message: 'Volunteer not found in this event' });
        }
        res.status(200).json({ message: 'Volunteer removed from event successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing volunteer from event', error });
    }
};