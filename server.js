//server.js 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

// Importing routes
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const userRoutes = require('./src/routes/userRoutes');
const volunteerHistoryRoutes = require('./src/routes/volunteerHistoryRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const volunteerDashboardRoutes = require('./src/routes/volunteerDashboardRoutes');


// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas directly in server.js
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/volunteer-history', volunteerHistoryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/volunteer-dashboard', volunteerDashboardRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});