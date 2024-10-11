import express from 'express';  // Use ES module syntax
import { createUser } from '../controllers/userController.js';  // Use ES module import


const router = express.Router();


router.post("/", createUser);  // Define your POST route for user creation


export default router;  // Export the router using ES module syntax







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

