const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const volunteerHistoryRoutes = require('./src/routes/volunteerHistory');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGO_URI); // Temporary logging for debugging

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/volunteer-history', volunteerHistoryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






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

