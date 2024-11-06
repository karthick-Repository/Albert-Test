const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'test-results',           // Path to the folder where the JSON files are located
  reportPath: 'test-results/html',   // Path where the HTML report will be saved
  metadata: {
    browser: {
      name: 'chrome',
      version: 'XX',            // Replace with the correct browser version
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',          // Replace with your platform, e.g., Windows, macOS, Linux
      version: '10',
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Your Project Name' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: 'B11221.34321' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
      { label: 'Execution End Time', value: new Date().toLocaleString() },
    ],
  },
});
