module.exports = {
    transform: {
        "^.+\\.js$": "babel-jest"  // Use babel-jest to transpile JavaScript files
    },
    testEnvironment: "node",       // Set the test environment to Node.js
    testTimeout: 30000,
    detectOpenHandles: true,
    forceExit: true


};
// module.exports = {
//     transform: {
//         "^.+\\.js$": "babel-jest" // Use babel-jest to transpile JavaScript files
//     },
//     testEnvironment: "node", // Set the test environment to Node.js
//     testTimeout: 30000,
//     detectOpenHandles: true,
//     forceExit: true,
//     collectCoverage: true, // Enable coverage collection
//     collectCoverageFrom: [
//         "src/controllers/*.js", // Include all files in controllers folder for coverage
//         "!src/**/node_modules/**" // Exclude node_modules
//     ],
//     coverageDirectory: "coverage", // Save coverage reports to the coverage folder
//     coverageReporters: ["text", "html"], // Generate text and HTML coverage reports
//     testMatch: ["**/src/testing/**/*.test.js"], // Ensure Jest runs tests from the testing folder
// };



// export default {
//     transform: {
//         "^.+\\.js$": "babel-jest"  // Use babel-jest to transpile JavaScript files
//     },
//     testEnvironment: "node",       // Set the test environment to Node.js
// };
