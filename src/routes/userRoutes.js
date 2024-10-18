const express = require('express');
const { updateUserProfile, getUserProfile } = require('../controllers/userController');
const router = express.Router();

router.put('/:userId', updateUserProfile);
router.get('/:userId', getUserProfile);

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

