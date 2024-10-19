//src\controllers\eventController.js
const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

exports.updateEventRSVP = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findByIdAndUpdate(eventId, { $push: { rsvp: req.body.userId } }, { new: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating RSVP', error });
    }
};