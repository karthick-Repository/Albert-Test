const { When, Before } = require('@cucumber/cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(10 * 60000)

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When(
  'User enters {string} into the Select Product to copy dropdown in Copy to Existing dialog',
  async function (formulaName) {
    this.copyfromExistingColumn = formulaName
    await wksPage.copyFromExistingModule.enterFormulaName(formulaName)
  }
)

When(
  'User enters the fetched column id into the Select Product to copy dropdown in Copy to Existing dialog',
  async function () {
    await wksPage.copyFromExistingModule.enterFormulaName(this.columnIDFetched)
  }
)

When(
  'User clicks on the formula entered {string} an external project',
  async function (checkCondition) {
    if (checkCondition === 'not involving') {
      await wksPage.waitForDuration(1.5)
      await wksPage.copyFromExistingModule.clickOnTheEnteredFormula(
        this.columnIndexToBeUsed,
        this.responseMap.get('projectId'),
        this.copyfromExistingColumn
      )
      await wksPage.waitForDuration(1.5)
    } else {
      await wksPage.copyFromExistingModule.clickOnFormedFormula(
        this.columnIDFetched
      )
    }
  }
)

When(
  'User selects {string} radio button',
  async function (typeOfCopyFromExisting) {
    await wksPage.copyFromExistingModule.selectCopyFromExistingType(
      typeOfCopyFromExisting
    )
  }
)

When(
  'User clicks on {string} in Copy to Existing dialog',
  async function (buttonType) {
    await wksPage.copyFromExistingModule._clickButtonByPosition(buttonType)
    await wksPage.isInWKSPage()
  }
)

When(
  'User stores {string} as the index number of the column which will be used in performing copy from existing',
  async function (colID) {
    this.columnIndexToBeUsed = colID
  }
)

When('I perform Copy From Existing operation on column {string} using {string} with {string}', async function (toCol, fromCol, involves) {
  await wksPage.copyFromExistingModule.performCopyFromExisting(toCol, fromCol, involves)
})
