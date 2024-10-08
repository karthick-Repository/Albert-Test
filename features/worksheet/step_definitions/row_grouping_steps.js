const { When, Then, Before } = require('@cucumber/cucumber')
const logger = require('../../../utilities/Logger')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When(
  'Group {int} random rows from the rows added in the previous step together',
  { timeout: 10 * 60 * 1000 },
  async function (groupCount) {
    logger.info(`Rows added in the UI are ${this.rowsAdded}`)
    const rAdded = await this.rowsAdded
    const availableIndexes = [...Array(rAdded.length).keys()]

    const randomIndexes = []
    while (
      randomIndexes.length < groupCount &&
      randomIndexes.length < availableIndexes.length
    ) {
      const randomIndex = Math.floor(Math.random() * availableIndexes.length)
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex)
      }
    }

    const rowsToGroup = randomIndexes.map((index) => rAdded[index])
    this.remainingRows = availableIndexes.filter(
      (index) => !randomIndexes.includes(index)
    )
    logger.info(`The remaining rows are ${this.remainingRows}`)
    this.rowGroups = await this.poManager
      .fetchWorksheetPage()
      .groupRows(rowsToGroup)
  }
)

Then('Validate that the row groups are created', async function () {
  await this.poManager.fetchWorksheetPage().validateWKSGroups(this.rowGroups)
})

When('Group the remaining rows together', async function () {
  await this.poManager.fetchWorksheetPage().groupRows(this.remainingRows)
})

Then('Validate that the rows are grouped together', async function () {
  await this.poManager.fetchWorksheetPage().validateAddedRowGroups()
})

When('Group a random row from the groups created', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('User should be unable to group the rows together', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

When(
  'User enters the {string} as the row group name',
  async function (groupName) {
    this.expectedRowGroupNames = []
    this.expectedRowGroupNames.push(groupName)
    await wksPage.rowGroupModule.enterGroupName(groupName)
  }
)
