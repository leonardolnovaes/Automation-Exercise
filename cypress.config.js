// cypress.config.js
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      return config;
    },
    baseUrl: "https://automationexercise.com",
    video: false,
    defaultCommandTimeout: 10000,
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      allure: true,
      allureResultsPath: "allure-results",
      // opcionais úteis:
      // allureReuseAfterSpec: true,
      // allureAttachRequests: true,
      // allureAddVideoOnPass: false,
    },
  },
});
