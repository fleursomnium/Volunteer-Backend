
// 
// const { registerUser, loginUser } = require('../controllers/userController');  // Ensure the path is correct

// const router = express.Router();

// router.post('/register', registerUser);  // Correctly reference registerUser
// router.post('/login', loginUser);  // Correctly reference loginUser

// module.exports = router;// import express from 'express';  // Use ES module syntax
// import { createUser } from '../controllers/userController.js';  // Use ES module import
const express = require('express');
const { updateUserProfile } = require('../controllers/userController'); // Only need update function here
const router = express.Router();

router.put('/:userId', updateUserProfile); // Make sure the frontend sends the correct userId in the URL

module.exports = router;

// const express = require('express');
// const { createUser } = require('../controllers/userController');
// const router = express.Router();


// router.post("/", createUser);  // Define your POST route for user creation
// module.exports = router;

// export default router;  // Export the router using ES module syntax







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

