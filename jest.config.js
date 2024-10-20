module.exports = {
    transform: {
        "^.+\\.js$": "babel-jest"  // Use babel-jest to transpile JavaScript files
    },
    testEnvironment: "node",       // Set the test environment to Node.js
    testTimeout: 30000
};


// export default {
//     transform: {
//         "^.+\\.js$": "babel-jest"  // Use babel-jest to transpile JavaScript files
//     },
//     testEnvironment: "node",       // Set the test environment to Node.js
// };
