module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  globalSetup: "./testSetup.js",
  globalTeardown: "./tearDown.js",
};
