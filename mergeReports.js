const fs = require('fs')
const xml2js = require('xml2js')

async function mergeTestExecutionReports (reports) {
  // Parse the XML reports.
  const parsedReports = []
  for (const report of reports) {
    const data = await fs.promises.readFile(report)
    const parsedReport = await xml2js.parseStringPromise(data)
    parsedReports.push(parsedReport)
  }

  // Merge the parsed reports.
  const mergedReport = parsedReports[0]
  for (const parsedReport of parsedReports.slice(1)) {
    if (parsedReport.testsuites && parsedReport.testsuites.testsuite) {
      for (const testsuite of parsedReport.testsuites.testsuite) {
        mergedReport.testsuites.testsuite.push(testsuite)
      }
    }
  }

  // Create an XML builder instance.
  const builder = new xml2js.Builder()

  // Convert the merged report back to XML.
  // Return the merged report XML.
  return builder.buildObject(mergedReport)
}

// Get the paths to the test execution reports.
const reports = ['test-execution-report.xml', 'test-execution-report-rerun.xml']

// Merge the test execution reports.
mergeTestExecutionReports(reports)
  .then((mergedReportXml) => {
    // Write the merged report XML to a file.
    fs.writeFileSync('merged-report.xml', mergedReportXml)
  })
  .catch((error) => {
    console.error('Error merging reports:', error)
  })
