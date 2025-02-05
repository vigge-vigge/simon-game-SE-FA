module.exports = {
  transform: {
    '^.+\\.m?js$': 'babel-jest', // Use Babel to transform JavaScript files
  },
  TestEnvironment: 'jsdom'
};