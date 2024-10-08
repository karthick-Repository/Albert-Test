const { When, Then, Before } = require('@cucumber/cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(10 * 60000)

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When(
  'User {string} the rows identified by indexes {string}',
  async function (operationType, rowIndexesToGroup) {
    const rowIndexes = rowIndexesToGroup.split(',').map(Number)
    if (operationType === 'groups') {
      await wksPage.rowGroupModule.groupTheseRowsTogether(rowIndexes)
    } else {
      await wksPage.rowGroupModule.unGroupTheseRows(rowIndexes)
    }
  }
)

When('User names the row as {string}', async function (groupName) {
  await wksPage.rowGroupModule.enterGroupName(groupName)
})

When('User clicks on the group rows button', async function () {
  await wksPage.rowGroupModule.clickOnGroupSelectionButton()
})

When('User expands the row group number {string} in the work sheet', async function (rowindex) {
  await wksPage.rowGroupModule.expandGroupAtIndex(rowindex)
})

Then('User validates the child rows selected for grouping is visible in same position', async function (rowIndex) {
  await wksPage.rowGroupModule.checkTheActiveRowStatus(rowIndex)
})

Then('User validates that the group {string} is added to the worksheet', async function (rowName) {
  this.allRowsInWKS = await wksPage.rowModule.fetchAllRowsInTheWorksheet()
  await wksPage.rowModule.checkThatThisRowExists(this.allRowsInWKS, rowName)
  await wksPage.waitForDuration(1)
})

Then('User validates that the group {string} is not added to the worksheet', async function (rowName) {
  this.allRowsInWKS = await wksPage.rowModule.fetchAllRowsInTheWorksheet()
  await wksPage.rowModule.checkThatThisRowDoesNotExists(this.allRowsInWKS, rowName)
})

When('User delete the group identified by row index {int}', async function (rowIndex) {
  await this.poManager
    .fetchWorksheetPage()
    .rowModule.clickOnActionIcon(rowIndex)
})

Then('User validates that {string} is visible', async function (rowGroupedText) {
  await wksPage.rowGroupModule.validateGroupedRowsCount(rowGroupedText)
})

Then('User validates that the checkboxes of the rows identified by the indexes {string} are {string}', async function (rowIndexes, status) {
  await wksPage.rowGroupModule.assertCheckboxStatusForRows(rowIndexes, status)
})

When('User deselects all rows by clicking on the cancel icon', async function () {
  await wksPage.rowGroupModule.groupCheckCount.click()
})

Then('Validate that group rows button is displayed', async function () {
  await wksPage.rowGroupModule.checkGroupRowsVisibility()
})
