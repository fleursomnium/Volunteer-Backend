//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const registerRoutes = require('./src/routes/registerRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const userRoutes = require('./src/routes/userRoutes'); // For user profile updates/retrieval
const volunteerDashboardRoutes = require('./src/routes/volunteerDashRoutes');
const volunteerHistoryRoutes = require('./src/routes/volunteerHistoryRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', registerRoutes); // Handles login and registration
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/volunteer-dashboard', volunteerDashboardRoutes);
app.use('/api/volunteer-history', volunteerHistoryRoutes); // Add volunteer history-related routes
app.use('/api/auth', authRoutes);  // This will handle login and auth-related routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start the server on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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

