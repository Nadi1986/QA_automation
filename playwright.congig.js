const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests', 
  timeout: 30000,
  retries: 1, 
  use: {
    headless: true, 
    baseURL: 'https://sdetchallenge.fetch.com', 
  },
};