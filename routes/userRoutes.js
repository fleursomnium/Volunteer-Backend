const express = require("express");
const router = express.Router();
const userController = require("../src/controllers/userController");

router.post("/", userController.createUser);


module.exports = router;