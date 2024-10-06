const fs = require("fs").promises;
const path = require("path");

const EVENTS_FILE = path.join(__dirname, "..", "data", "events.json");

const readJSON = async () => {
  try {
    const data = await fs.readFile(EVENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

const writeJSON = async (data) => {
  try {
    await fs.writeFile(EVENTS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  readJSON,
  writeJSON,
};
