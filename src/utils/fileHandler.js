import { promises as fs } from 'fs';


export const readJSON = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];  // Return empty array if the file doesn't exist
    }
    throw error;
  }
};


export const writeJSON = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw error;
  }
};



// const fs = require("fs").promises;
// const path = require("path");

// const readJSON = async (filePath) => {
//   try {
//     const data = await fs.readFile(filePath, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       return [];
//     }
//     throw error;
//   }
// };

// const writeJSON = async (filePath, data) => {
//   try {
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2));
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   readJSON,
//   writeJSON,
// };

// import fs from 'fs/promises';
// import path from 'path';

// export const readJSON = async (filePath) => {
//   try {
//     const data = await fs.readFile(filePath, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       return [];
//     }
//     throw error;
//   }
// };

// export const writeJSON = async (filePath, data) => {
//   try {
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2));
//   } catch (error) {
//     throw error;
//   }
// };
