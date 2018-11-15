module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [
    '<rootDir>/client/src/tests/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
  ],
  modulePaths: [
    '<rootDir>/client/node_modules/',
    // '<rootDir>/tests/mocks/',
    // '<rootDir>/node_modules/jest-meteor-stubs/lib/',
  ],
  roots: [
    '<rootDir>/client/src/',
    // '<rootDir>/tests/',
  ],
  moduleNameMapper: {
    '^imports/(.*)': '<rootDir>/client/src/',
    '^(.*):(.*)$': '$1_$2',
  },
  unmockedModulePathPatterns: [
    // '/^imports\\/.*\\.jsx?$/',
    // '/^imports\\/.*\\.graphql$/',
    '/^client\\/.*\\.jsx?$/',
    '/^server\\/.*\\.jsx?$/',
    '/^node_modules/',
  ],
};
