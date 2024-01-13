const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    todo_key: "todo-modern-vanillajs",
    home_page: "/"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: "http://localhost:1337/",
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});