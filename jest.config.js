// jest.config.js
export default {
  transform: {
    '^.+\\.m?js$': 'babel-jest', // Use Babel to transform JavaScript files
  },
  testEnvironment: 'jsdom', // Use jsdom as the test environment (for DOM manipulation)
};
