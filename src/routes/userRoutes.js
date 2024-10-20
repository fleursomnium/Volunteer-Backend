//userRoutes.js
const express = require('express');
const { updateUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware'); // Import middleware
const router = express.Router();

// Apply verifyToken middleware to protect this route
router.put('/profile/:userId', verifyToken, updateUserProfile);
router.put('/:userId', updateUserProfile);  // Update user profile

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");

// router.post("/", userController.createUser);


// module.exports = router;
// import express from "express";
// import { createUser } from "../controllers/userController.js"; // Adjust import for named export

// const router = express.Router();

// router.post("/", createUser);

// export default router; // Use default export