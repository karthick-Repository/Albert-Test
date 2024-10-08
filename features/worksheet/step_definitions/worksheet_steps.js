const { Given, When, Then, Before } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const logger = require('../../../utilities/Logger')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

Given(
  'User navigates to the WKS of project for index validation',
  async function () {
    await wksPage.gotoWorksheetForIndexValidation()
  }
)

Given('User is in the WKS page', async function () {
  await wksPage.isInWKSPage()
})

Then('Validate the default columns present in WKS page', async function () {
  await wksPage.validateDefaultColumns(this.responseMap.get('projectId'))
})

Then('Validate the default rows present in WKS page', async function () {
  await wksPage.validateDefaultRows()
})

Then(
  'Validate WKS rows after clicking focus to view icon in the details column',
  async function () {
    await wksPage.validateAppsChildRows()
  }
)

Then(
  'Validate WKS rows after clicking focus to view icon again',
  async function () {
    await wksPage.collapseDetailsColumnAndValidateRows()
  }
)

Then(
  'Validate WKS rows after clicking focus to view icon in the default formula column',
  async function () {
    await wksPage.validateRowsAfterClickToFocusViewInDefaultFormula()
  }
)

Then('Validate the number of plus icons displayed in WKS', async function () {
  await wksPage.validateTotalNumberOfDefaultPlusIconsInWKS()
})

Then(
  'Validate the plus icon options for {string}',
  async function (plusIconType) {
    await wksPage.validatePlusIconOptions(plusIconType)
  }
)

When(
  'Add {string} {string} rows in WKS',
  async function (plusIconType, rowType) {
    await wksPage.addRowsToWKS(plusIconType, rowType)
  }
)

When(
  'Add {int} blank rows to WKS',
  { timeout: 10 * 60 * 1000 },
  async function (numberOfRows) {
    this.rowsAdded = await wksPage.addBlankRows(numberOfRows)
  }
)

Then('Validate the rows added to the WKS', async function () {
  await wksPage.validateRows(this.rowsAdded)
})

Then('Validate the inventory search UI elements', async function () {
  await wksPage.validateInventorySearchUI()
})

When(
  'Add {int} inventory rows of type {string} to WKS',
  { timeout: 10 * 60 * 1000 },
  async function (numberOfInventories, typeOfInventory) {
    const inventoryData = await this.dataGenerator.generateRandomInventoryData(
      numberOfInventories,
      typeOfInventory,
      await this.jwtToken
    )
    this.rowsAdded = await wksPage.addInventoryRows(inventoryData)
  }
)

When('User waits for the search box to be displayed', async function () {
  await wksPage.waitForSearchBox()
})

Then(
  'Validate that the message {string} is displayed',
  async function (message) {
    await wksPage.validateMessageInWKS(message)
  }
)

Then(
  'User validates that the message {string} is displayed',
  async function (message) {
    await wksPage.validateMessageWithoutClose(message)
  }
)

Then(
  'I validate that the tippy message number {int} displays the message {string}',
  async function (tippyNumber, message) {
    const messageElement = await wksPage.tippyMessages.nth(tippyNumber - 1)
    await wksPage.assertionHandler.assertActualAndExpectedText(await messageElement, message)
  }
)

When('User reloads the page', async function () {
  await wksPage.reloadPage()
})

When('User pauses the execution', async function () {
  await this.page.pause()
})

Then(
  'Validate the menu options displayed when user clicks on the action icon of a blank column',
  async function () {
    await wksPage.columnsModule.validateColumnOptionsForBlankColumn()
  }
)

Then('{string} message is displayed', async function (message) {
  const messageElement = await this.page.getByText(message)
  await messageElement.waitFor({ state: 'visible', timeout: 2 * 1000 })
  expect(await messageElement).toHaveCount(1)
})

When('User waits for {int} seconds', async function (timeout) {
  await this.page.waitForTimeout(timeout * 1000)
})

When('I fetch the size of the input cell', async function () {
  const cellElement = await wksPage.rowInput
  this.sizeOfElement = await wksPage.webElementHandler.getSizeOfElement(await cellElement)
  logger.info(`The width of the cell before is : ${await this.sizeOfElement.width}`)
})

When('I set the name of the row as a random string of length {int} characters', async function (numberOfCharacters) {
  const rowName = await wksPage.generateRandomStrings(numberOfCharacters)
  const cellEditor = await wksPage.inputEditor
  const cellElement = await wksPage.rowInput
  const actualElement = await cellElement.or(cellEditor)
  await wksPage.webElementHandler.click(await actualElement)
  await wksPage.waitForDuration(1)
  await wksPage.webElementHandler.fillInputWithType(await actualElement, rowName)
  this.rowsAddedToWKS.push(rowName)
})

When('I validate that the size of the input cell identified is bigger than what it was previously', async function () {
  const cellEditor = await wksPage.inputEditor
  const cellElement = await wksPage.rowInput
  const actualElement = await cellElement.or(cellEditor)
  await wksPage.waitForDuration(1)
  const currentSize = await wksPage.webElementHandler.getSizeOfElement(await actualElement)
  expect(await currentSize.width).toBeGreaterThan(await this.sizeOfElement.width)
})

When('I {string} the cell identified by row {string} of the left container', async function (copyOrPaste, rowIndex) {
  const cellToCopyFrom = copyOrPaste === 'copy from' ? await this.page.locator(`[row-index="${rowIndex}"] .cell-content`) : await wksPage.rowInput
  const keyOp = copyOrPaste === 'copy from' ? 'Control+C' : 'Control+V'
  copyOrPaste === 'copy from' ? await wksPage.webElementHandler.pressUsingKey(await cellToCopyFrom, keyOp) : await this.page.keyboard.press('Control+V')
})

When('I press the {string} key on the enabled input field', async function (keyBoardOp) {
  const cellElement = await wksPage.rowInput
  await wksPage.webElementHandler.pressUsingKey(await cellElement, keyBoardOp)
})

When('I fetch all the rows added in the {string} grid', async function (gridType) {
  let endpoint
  if (gridType === 'product design') {
    endpoint = `api/v3/worksheet/${this.responseMap.get('productDesignID')}/products/grid`
  } else if (gridType === 'result design') {
    endpoint = `api/v3/worksheet/design/${this.responseMap.get('resultDesignID')}/rows`
  } else {
    endpoint = `api/v3/worksheet/design/${this.responseMap.get('appDesignID')}/rows`
  }
  const response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  this.rowsFethedFromBE = response.Items.map((row) => row.name).slice(0, -1)
  logger.info(`Rows fetched from BE is : ${this.rowsFethedFromBE}`)
})

Then('I validate that the rows are added to the worksheet', async function () {
  logger.info(`All rows in the product design grid are : ${this.rowsAddedToWKS}`)
  for (const row of this.rowsAddedToWKS) {
    expect(this.rowsFethedFromBE).toContain(row)
  }
})

When('I add {int} blank rows with row names consisting of string of length {int} characters each', async function (numberOfRows, rowNameLength) {
  while (numberOfRows > 0) {
    const rowName = await wksPage.generateRandomStrings(rowNameLength)
    const cellEditor = await wksPage.inputEditor
    const cellElement = await wksPage.rowInput
    const actualElement = await cellElement.or(cellEditor)
    await wksPage.webElementHandler.click(await actualElement)
    await wksPage.webElementHandler.fillInputWithType(await actualElement, rowName)
    this.rowsAddedToWKS.push(rowName)
    numberOfRows = numberOfRows - 1
    await wksPage.webElementHandler.pressUsingKey(await actualElement, 'Enter')
  }
})

When('I enter random strings of length {int} characters into the cells of column with ID {string}', async function (rowNameLength, columnID) {
  this.cellContents = []
  const allRows = await wksPage.rowModule.fetchAllRowsInTheWorksheet()
  this.cellContents = await wksPage.generateRandomStringsAsArray(rowNameLength, allRows.length)
  await wksPage.columnsModule.setColumnValues(columnID, this.cellContents)
})

Then('I double click on each cell in the column identified with ID {string} and validate that the size of the input cell is bigger than what it was previously', async function (columnID) {
  const cellSize = await wksPage.columnsModule.fetchTheCellSize(columnID)
  const doubleClickedCellSizes = await wksPage.columnsModule.doubleClickCellsAndFetchSize(columnID)
  for (const cs of doubleClickedCellSizes) {
    expect(cs).toBeGreaterThan(await cellSize.width)
  }
})

When('I expand or collapse the row with aria-index {string}', async function (rowIndex) {
  const rowToClickOn = `div[aria-rowindex='${rowIndex}'] div[class^='worksheets-ag-grid'] svg`
  await wksPage.webElementHandler.click(await this.page.locator(rowToClickOn))
})

When('I fetch the color code details from the formula cell', async function () {
  this.colorCodeDetails = await wksPage.calculationHighlightsModule.fetchTheColorCodesInTheUI()
})

Then('I validate that the color code of the cells in rows between {string} to {string} and columns between {string} to {string} matches with the color code of the original formula at index {string}', async function (fromRowIndex, toRowIndex, fromColIndex, toColIndex, targetIndexInFormula) {
  const colorCodeToCheck = this.colorCodeDetails[targetIndexInFormula - 1]
  await wksPage.calculationHighlightsModule.validateColorCodes(colorCodeToCheck.formulaColor, fromRowIndex, toRowIndex, fromColIndex, toColIndex)
})

Then('I validate that the color code of the cells in column {string} matches with the color code of the original formula at index {string}', async function (columnIndex, targetIndexInFormula) {
  const colorCodeToCheck = this.colorCodeDetails[targetIndexInFormula - 1]
  await wksPage.calculationHighlightsModule.validateColorCodes(colorCodeToCheck.formulaColor, '0', columnIndex, '0')
})

Then('I validate that the total number of {string} in the active cell are {int}', async function (tagName, count) {
  await wksPage.calculationHighlightsModule.validateSpansInActiveCell(tagName, count)
})
