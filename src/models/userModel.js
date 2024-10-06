const { v4: uuidv4 } = require("uuid");

class User {
  constructor({ name, date, location, description }) {
    this.id = uuidv4();
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
    this.createdAt = new Date();
  }
}

module.exports = User;