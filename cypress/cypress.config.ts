import {defineConfig} from 'cypress'

export default defineConfig({
  e2e: {
    fixturesFolder: 'fixtures',
    video: true,
    videoCompression: 32,
    videosFolder: 'videos/',
    screenshotsFolder: 'screenshots/',
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config)
      return config
    }
  }
})
