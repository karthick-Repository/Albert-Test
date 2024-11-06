const path = require('path')
const url = require('url')

module.exports = {
  default: {
    require: [
      'src/support/hooks.js',
      'src/support/world.js',
      'src/step_definitions/**/*.js',
      'src/step_definitions/**/**/*.js'
    ],
    format: [
      'progress',
      `${url.pathToFileURL(path.resolve(__dirname, 'src/utilities/Reporter.js'))}:formatted`,
      'junit:test-results/test-execution-report.xml',
      'json:test-results/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'promise'
    },
    // retry: 1,
    failFast: false,
    strict: true,
    tags: 'not @skip'
  }
}
