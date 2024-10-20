// notifsController.js
import Notif from '../models/notifModel.js'; // Importing the notification model

// Get all notifications
export const getAllNotifs = async (req, res) => {
  try {
    const notifications = await Notif.find();
    res.status(200).json(notifications); // Return all notifications as JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new notification
export const createNotif = async (req, res) => {
  const { title, message, date } = req.body; // Destructure the request body

  const newNotif = new Notif({
    title,
    message,
    date: date || new Date(), // Use the current date if not provided
  });

  try {
    const savedNotif = await newNotif.save();
    res.status(201).json(savedNotif); // Return the saved notification
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a notification by ID
export const updateNotif = async (req, res) => {
  const { id } = req.params; // Get the notification ID from the URL

  try {
    const updatedNotif = await Notif.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNotif) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(updatedNotif);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a notification by ID
export const deleteNotif = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotif = await Notif.findByIdAndDelete(id);
    if (!deletedNotif) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
