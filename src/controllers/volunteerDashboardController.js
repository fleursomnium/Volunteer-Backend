//src\controllers\volunteerDashboardController.js
const User = require('../models/userModel');

// Controller logic to get volunteer dashboard data
exports.getVolunteerDashboard = async (req, res) => {
    try {
        const userId = req.user.id;  // Assuming you use middleware to get the logged-in user
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch related events or data for the volunteer dashboard
        const events = [];  // Fetch volunteer-related events here

        res.status(200).json({ user, events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};