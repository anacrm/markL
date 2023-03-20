const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  watchForFileChanges: true,
  e2e: {
    baseUrl: 'http://localhost:8080',
    env:
    {
      apiUrl: 'http://localhost:3333'
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    reporter: "mochawesome",
    reporterOptions: {
      "reportDir": "cypress/reports/mochawesome-report",
      "overwrite": false,
      "html": false,
      "json": true,
      "timestamp": "mmddyyyy_HHMMss"
    },
  },
});
