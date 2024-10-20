module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',  // If using Babel
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // Ensure this is correctly set
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'], // For various file types
  };
  