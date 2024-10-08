const { When, Then } = require('@cucumber/cucumber')
const logger = require('../../../utilities/Logger')

When(
  'Enter values into the {int} cells of the default formula column to validate copy to new functionality',
  async function (numberOfInventories) {
    const defaultFormulas = [
      '10',
      '20',
      '=SUM(E1:E2)',
      '=PRODUCT(E1:E2)-E3',
      '=SINH(E1)',
      '=COS(E3)',
      '=TANH(E4)',
      '=E5/E6',
      '=DEC2BIN(E1)',
      '=OCT2HEX(E3)'
    ]
    this.valuesToBeAdded = Array.from(
      { length: numberOfInventories },
      (_, index) => defaultFormulas[index % defaultFormulas.length]
    )
    logger.info(`Random formulae are : ${this.valuesToBeAdded}`)
    this.cellValues = await this.poManager
      .fetchWorksheetPage()
      .addCellDetails('right', 'new', this.valuesToBeAdded)
  }
)

When(
  'User clicks on the ellipses of the default formula column',
  async function () {
    await this.poManager
      .fetchWorksheetPage()
      .copyToNewModule.clickEllipsesOfDefaultFormula()
  }
)

When('User clicks on copy to new', async function () {
  await this.poManager.fetchWorksheetPage().copyToNewModule.clickCopyToNew()
})

When(
  'User enters {string} into the copy to new input field',
  async function (copyToNewValue) {
    await this.poManager
      .fetchWorksheetPage()
      .copyToNewModule.enterCopyToNewValue(copyToNewValue)
  }
)

Then(
  'User checks for the error message when copy to new value is {string}',
  async function (copyToNewValue) {
    await this.poManager
      .fetchWorksheetPage()
      .copyToNewModule.checkForError(copyToNewValue)
  }
)

Then('Validate that copy to new is displayed', async function () {
  await this.poManager
    .fetchWorksheetPage()
    .copyToNewModule.validateCopyToNewCheckBoxUI()
})

When('User clicks on the Done button in Copy to new dialog', async function () {
  await this.poManager
    .fetchWorksheetPage()
    .copyToNewModule.clickDoneButton()
})
