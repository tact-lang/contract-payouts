module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  snapshotSerializers: ["ton-jest/serializers"],
  maxWorkers: 1,
  globalSetup: './jest.setup.js',
  globalTeardown: './jest.teardown.js',
};