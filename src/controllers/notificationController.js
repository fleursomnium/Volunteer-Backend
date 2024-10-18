const Notification = require('../models/notificationModel');

exports.createNotification = async (req, res) => {
  const { user, message } = req.body;
  try {
    const notification = new Notification({ user, message });
    await notification.save();
    res.status(201).json({ message: 'Notification created', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
};

// Fetch notifications for a user
exports.getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ user: userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};
