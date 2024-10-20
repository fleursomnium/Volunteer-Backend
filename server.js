const express = require('express');
const cors = require('cors');
const path = require('path');
const { fileURLToPath } = require('url');

// Required to use __dirname with ES modules in Node.js
//const __filename = fileURLToPath(__filename);
//const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Import the routes using CommonJS (require)
const volunteerHistoryRoutes = require('./src/routes/volunteerHistory.js'); // Gaby
const LoginRoute = require('./src/routes/Login.js'); // Mel
const VolunteerDashboardRoute = require('./src/routes/VolunteerDashboard.js'); // Mel
const VolunteerMatchingRoute = require('./src/routes/volcards.js'); // Angie
const NotificationsRoute = require('./src/routes/notifs.js'); // Angie
// Syeda

// Use the routes
app.use('/api/volunteer-history', volunteerHistoryRoutes); // Gaby
app.use('/api/login', LoginRoute); // Mel
app.use('/api/volunteer-dashboard', VolunteerDashboardRoute); // Mel
app.use('/api/notifs', NotificationsRoute); // Angie
app.use('/api/volcards', VolunteerMatchingRoute); // Angie

// Placeholder routes for other pages
app.get('/', (req, res) => res.json({ message: 'Welcome to the Home page!' }));
app.get('/api/register', (req, res) => res.json({ message: 'Register page route' }));
app.get('/api/admin-dashboard', (req, res) => res.json({ message: 'Admin Dashboard page route' }));
app.get('/api/volcards', (req, res) => res.json({ message: 'Volunteer Matching Form page route' }));
app.get('/api/volunteermanagmentform', (req, res) => res.json({ message: 'Volunteer Management Form page route' }));
app.get('/api/eventmanagmentform', (req, res) => res.json({ message: 'Event Management Form page route' }));
app.get('/api/notifs', (req, res) => res.json({ message: 'Notifications page route' }));

// Set up the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});















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

