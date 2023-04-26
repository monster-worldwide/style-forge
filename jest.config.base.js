module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['jsx', 'js', 'tsx', 'ts'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash-es)'],
  collectCoverage: true,
  verbose: true,
  testEnvironment: 'jsdom',
  testTimeout: 10000,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
