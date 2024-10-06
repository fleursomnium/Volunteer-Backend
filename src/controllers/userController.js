const User = require("../models/userModel");
const fileHandler = require("../utils/fileHandler");
const path = require("path");
const USER_FILE = path.join(__dirname, "../data/users.json");

const createUser = async (req, res, next) => {
  try {
    const { name, date, location, description } = req.body;

    if (!name || !date || !location) {
      return res
        .status(400)
        .json({ message: "Name, date, and location are required." });
    }
  const newUser = new User({ name, date, location, description });

    const users = await fileHandler.readJSON();

    users.push(newUser);
    await fileHandler.writeJSON(users);

    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};