module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',  // Use babel-jest to transform JS files
  },
  testEnvironment: 'node',  // Set the test environment to Node.js
};