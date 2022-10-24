// jest.config.js
module.exports = async () => ({
  verbose: true,
  preset: 'jest-puppeteer',
  rootDir: './',
  testTimeout: 60000
});
