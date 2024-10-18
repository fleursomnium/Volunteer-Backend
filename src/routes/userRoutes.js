//userRoutes.js

const express = require('express');
const { updateUserProfile } = require('../controllers/userController'); // Only need update function here
const router = express.Router();

router.put('/:userId', updateUserProfile); // Make sure the frontend sends the correct userId in the URL

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

