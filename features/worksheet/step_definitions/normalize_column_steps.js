
const { When, Then, Before } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const logger = require('../../../utilities/Logger')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When(
  'User clicks on the ellipses of the default product or formula column',
  async function () {
    await wksPage.columnsModule.clickEllipses('Default Formula')
  }
)

When(
  'User clicks on the ellipses of the added blank column',
  async function () {
    await wksPage.columnsModule.clickEllipses('Blank')
  }
)

Then('{string} message has to be displayed', async function (message) {
  await wksPage.normalizeModule.validateNormalizeMessage(message)
})

Then(
  'Normalize should not be displayed when clicked on the ellipses of a blank column',
  async function () {
    await wksPage.columnsModule.validateColumnOptionsForBlankColumn()
  }
)

Then('Validate the elements displayed in Normalize pop-up', async function () {
  expect(
    await wksPage.normalizeModule.checkWhetherNormalizePopUpIsDisplayed()
  ).toBeTruthy()
  await wksPage.normalizeModule.validateNormalizePopUpUI()
})

Then('Validate the normalize input for boundary values', async function () {
  await wksPage.normalizeModule.validateNormalizeInputBoundaries()
})

When('User closes the Normalize pop-up', async function () {
  await wksPage.normalizeModule.clickCancel()
})

Then('Normalize pop-up should not be displayed anymore', async function () {
  expect(
    await wksPage.normalizeModule.checkWhetherNormalizePopUpIsDisplayed()
  ).toBeFalsy()
})

When('Normalize with {float}', async function (normalizeValue) {
  await wksPage.normalizeModule.enterNomalizeValue(normalizeValue)
})

Then(
  'Cell values must be updated according to the normalized input {float}',
  async function (normalizedValue) {
    await wksPage.normalizeModule.validateColumnValuesAfterNormalize(
      this.cellValues,
      normalizedValue
    )
  }
)

Then('The column {string} go to focused mode', async function (focusOrNot) {
  await wksPage.normalizeModule.checkFocus(focusOrNot)
})

Then('The focus mode count should be {string}', async function (count) {
  await wksPage.normalizeModule.checkFocusCount(count)
})

When(
  'User enters {string} as normalize value',
  async function (normalizeValue) {
    await wksPage.normalizeModule.enterNormalizationValue(normalizeValue)
  }
)

Then('Validate that the default normalize value is 100', async function () {
  const defaultValue = await wksPage.normalizeModule.fetchDefaultNormalizeValue()
  await wksPage.normalizeModule.validateDefaultNormalizeValue(defaultValue)
})

Then(
  'Validate that the column values are normalized with normalize value {int} for column with ID {string}',
  async function (normalizeValue, colID) {
    this.actualNormalizedValues =
      await wksPage.normalizeModule.fetchNormalizedValuesForColumn(colID)
    const actualNormalizedParsedValues = this.actualNormalizedValues.map(
      (value) => parseFloat(value)
    )
    const actualInventoryTotal = actualNormalizedParsedValues.pop()
    const expectedNormalizedValues =
      await wksPage.normalizeModule.calculateNormalizedValues(
        this.delimitNumberValues,
        this.inventoryTotalNumber,
        normalizeValue
      )
    await wksPage.columnsModule.validateColumnValuesInWKS(
      actualNormalizedParsedValues,
      expectedNormalizedValues
    )
    expect(actualInventoryTotal).toBe(normalizeValue)
  }
)

Then(
  'The normalized values for column with ID {string} must be saved in the WKS',
  async function (colID) {
    const actualColumnValues = await wksPage.columnsModule.getColumnValues(colID)
    // this.actualNormalizedValues was fetched and stored in a world variable in the previous step which becomes the expected value for us in this step
    const expectedColumnValues = this.actualNormalizedValues
    expectedColumnValues.pop() // Removing the inventory total
    await wksPage.columnsModule.validateColumnValuesInWKS(
      actualColumnValues,
      expectedColumnValues
    )
  }
)

When(
  'Enter {string} into the normalize input',
  async function (normalizeValue) {
    await wksPage.normalizeModule.enterNomalizeValue(normalizeValue)
  }
)

When('User checks checkbox number {int}', async function (checkBoxIndex) {
  await wksPage.normalizeModule.checkTheCheckbox(checkBoxIndex)
})

Then(
  'Validate that after checking checkbox {string} the cell values are displayed accordingly after normalization with normalize value {string} for column with ID {string}',
  async function (checkIndex, normalizeValue, colID) {
    const normalizeValueNumber = parseInt(normalizeValue, 10)
    const cellValues = this.delimitNumberValues
    const normalizedValuesWithConstant =
      await wksPage.normalizeModule.normalizationWithConstant(
        cellValues,
        checkIndex,
        normalizeValueNumber
      )
    this.actualNormalizedValues =
      await wksPage.normalizeModule.fetchNormalizedValuesForColumn(colID)
    const actualNormalizedParsedValues = this.actualNormalizedValues.map(
      (value) => parseFloat(value)
    )
    const actualNormalizedInventoryTotal = actualNormalizedParsedValues.pop()
    await wksPage.columnsModule.validateColumnValuesInWKS(
      actualNormalizedParsedValues,
      normalizedValuesWithConstant.normalizedValues
    )
    expect(normalizedValuesWithConstant.total).toBe(
      actualNormalizedInventoryTotal
    )
  }
)

Then(
  'Validate that the normalized cell values in the column identified by the ID {string} are {string}',
  async function (colID, expectedValues) {
    const allValues = await wksPage.normalizeModule.fetchCalculatedNormalizedValues(colID)
    this.expInvTotal = allValues.pop()
    this.actualNormalizedValues = allValues
    const expectedNormalizedValues = expectedValues.split(',').map(value => value.trim())
    logger.info(`Normalized values as fetched from the UI is : ${this.actualNormalizedValues}`)
    logger.info(`Expected normalized values are : ${expectedNormalizedValues}`)
    expect(this.actualNormalizedValues).toMatchObject(expectedNormalizedValues)
  }
)

Then(
  'Validate that the normalized inventory total of the column identified by the ID {string} is {string}',
  async function (colID, expectedInventoryTotal) {
    expect(this.expInvTotal).toBe(expectedInventoryTotal)
  }
)

When('Validate that the message {string} is displayed after clicking normalize', async function (message) {
  await wksPage.normalizeModule.fetchCalculatedNormalizedValues(message)
})

When('User clicks on Got it link', async function () {
  await wksPage.normalizeModule.clickGotIt()
})

Then('Validate that the value in the normalize input is {string}', async function (expected) {
  const inputVal = await wksPage.normalizeModule.normalizeInput.inputValue()
  expect(inputVal).toBe(expected)
})

Then('Validate that the total number of normalize checkboxes displayed are {string}', async function (expectedNormalizeCheckox) {
  await wksPage.normalizeModule.validateTotalNumberOfCheckboxes(expectedNormalizeCheckox)
})

Then('User validates that the plus icon in the plus icon in {string} grid is {string}', async function (grid, visibilityState) {
  await wksPage.rowModule.checkPlusIconStatus(grid, visibilityState)
})
