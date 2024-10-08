const { When, Then, Before } = require('@cucumber/cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(10 * 60000)

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When(
  'User locks the column identified by column ID {string}',
  async function (columnID) {
    await wksPage.waitForDuration(1)
    await wksPage.columnsModule.clickActionIconByColumnID(columnID)
    await wksPage.lockUnlockModule.lockColumn()
    await wksPage.waitForDuration(1)
  }
)

When(
  'User unlocks the column identified by column ID {string}',
  async function (columnID) {
    await wksPage.waitForDuration(1)
    await wksPage.columnsModule.clickActionIconByColumnID(columnID)
    await wksPage.lockUnlockModule.unlockColumn()
  }
)

Then(
  'User validates that the column identified by column ID {string} is locked',
  async function (columnID) {
    await wksPage.lockUnlockModule.validateLockIconForColumn(columnID)
    await wksPage.lockUnlockModule.validateLockIconForAllCellsInLockedColumn(
      columnID
    )
    await wksPage.lockUnlockModule.validateLockedMessageAllCellsInLockedColumn(columnID)
  }
)

Then(
  'User validates that the blank column identified by column ID {string} is locked',
  async function (columnID) {
    await wksPage.lockUnlockModule.validateLockIconForAllCellsInLockedColumn(
      columnID
    )
    await wksPage.lockUnlockModule.validateLockedMessageAllCellsInLockedColumn(columnID)
  }
)
