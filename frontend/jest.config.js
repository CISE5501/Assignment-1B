const nextJest = require('next/jest');

require('jest-fetch-mock').enableMocks();
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  automock: false,
  resetMocks: false,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
