
//oct/17
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
//const volunteerHistoryRoutes = require('./src/routes/volunteerHistory');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGO_URI); // Temporary logging for debugging

//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
// app.use('/api/volunteer-history', volunteerHistoryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';


// // Required to use __dirname with ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const app = express();


// // Enable CORS
// app.use(cors());


// // Enable JSON body parsing
// app.use(express.json());


// // Serve static files from the "public" directory
// app.use('/public', express.static(path.join(__dirname, 'public')));


// // Import the routes
// import volunteerHistoryRoutes from './src/routes/volunteerHistory.js'; // Adjust for Gaby's routes
// import LoginRoute from './src/routes/Login.js'; // Adjust for Mel's routes
// import VolunteerDashboardRoute from './src/routes/VolunteerDashboard.js'; // Adjust for Mel's routes
// import userRoutes from './src/routes/userRoutes.js'; // Correct relative path for Syeda's Volunteer Management Form
// import eventRoutes from './src/routes/eventRoutes.js';

// // Use the routes
// app.use('/api/volunteer-history', volunteerHistoryRoutes); // Gaby's Volunteer History Routes
// app.use('/api/login', LoginRoute); // Mel's Login Route
// app.use('/api/volunteer-dashboard', VolunteerDashboardRoute); // Mel's Volunteer Dashboard Route
// app.use('/api/users', userRoutes); // Syeda's Volunteer Management Form Route
// app.use('/api/events', eventRoutes);

// // Placeholder routes for other pages
// app.get('/', (req, res) => res.json({ message: 'Welcome to the Home page!' }));
// app.get('/api/register', (req, res) => res.json({ message: 'Register page route' }));
// app.get('/api/admin-dashboard', (req, res) => res.json({ message: 'Admin Dashboard page route' }));
// app.get('/api/volcards', (req, res) => res.json({ message: 'Volunteer Matching Form page route' }));
// app.get('/api/volunteermanagmentform', (req, res) => res.json({ message: 'Volunteer Management Form page route' }));
// app.get('/api/eventmanagmentform', (req, res) => res.json({ message: 'Event Management Form page route' }));
// app.get('/api/notifs', (req, res) => res.json({ message: 'Notifications page route' }));


// // Set up the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });













// const express = require("express");
// const bodyParser = require("body-parser");
// const eventRoutes = require("./src/routes/eventRoutes");
// const userRoutes = require("./src/routes/userRoutes");
// const cors = require('cors');
// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import userRoutes from './routes/userRoutes.js';

// const app = express();
// const PORT = process.env.PORT || 3030;
// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to the Event Management System API");
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import userRoutes from './src/routes/userRoutes.js';
//  // Adjust this path based on your project structure

// // Required to use __dirname with ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(express.json());  // Use express's built-in body parser middleware
// app.use(express.urlencoded({ extended: true }));

// // app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);  // Mount user routes

// app.get("/", (req, res) => {
//   res.send("Welcome to the Event Management System API");
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

