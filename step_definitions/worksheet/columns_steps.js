const { When, Then, Before } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const logger = require('../../utilities/Logger')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When(
  'User adds {int} {string} columns to WKS',
  async function (numberOfColumns, typeOfColumn) {
    this.columnsAdded = await wksPage.addColumnsToWKS(
      numberOfColumns,
      typeOfColumn
    )
  }
)

When('User clicks on the {string} button', async function (buttonType) {
  await wksPage.columnsModule.clickButton(buttonType)
})

Then('Validate that the WKS displays the added column', async function () {
  const responseBody = await this.apiUtil.getAPI(
    `api/v3/worksheet/project/${this.responseMap.get('albertId')}/columns`,
    await this.jwtToken
  )
  const parsedResponse = JSON.parse(JSON.stringify(responseBody))
  const columnNames = []

  for (const column of parsedResponse.Columns) {
    const colIdNumber = parseInt(column.colId.split('COL')[1])
    if (colIdNumber > 4) {
      columnNames.push(column.name)
    }
  }

  await this.poManager
    .fetchWorksheetPage()
    .validateObjects(columnNames.reverse(), this.columnsAdded)
})

When('User clicks action icon of column {string}', async function (colID) {
  this.colIDActionClicked = colID
  await this.poManager
    .fetchWorksheetPage()
    .columnsModule.clickActionIconByColumnID(colID)
})

When('I click on the filter icon of column with ID {string}', async function (colID) {
  const filterIconElement = await wksPage.frameLocator.locator(`[col-id='${colID}'] a`).first()
  await wksPage.webElementHandler.click(await filterIconElement)
})

When('User clicks on {string} in the action menu', async function (action) {
  await wksPage.columnsModule.clickOnAction(action)
})

When('User close the popup of inventory details',async function () {
  await wksPage.columnsModule.closePopup()
})

Then('Column with ID {string} must be locked', async function (colID) {
  await this.poManager
    .fetchWorksheetPage()
    .columnsModule.isLockedHeaderPresent(colID)
})

When(
  'Enter the values {string} into the column with ID {string} in WKS',
  async function (delimitedValues, colID) {
    const delimitValues = delimitedValues.split(',')
    this.delimitNumberValues = delimitedValues.split(',').map(Number)
    await wksPage.columnsModule.setColumnValues(colID, delimitValues)
  }
)

When(
  'Enter the values {string} into the column with ID {string} in WKS without reloading the page',
  async function (delimitedValues, colID) {
    const delimitValues = delimitedValues.split(',')
    this.delimitNumberValues = delimitedValues.split(',').map(Number)
    await wksPage.columnsModule.setColumnValues(colID, delimitValues, true)
  }
)

When(
  'User enters the formulae {string} into the cells of the column with ID {string} in WKS',
  async function (delimitedValues, colID) {
    const delimitValues = splitFormulae(delimitedValues)
    await wksPage.columnsModule.setColumnValues(colID, delimitValues)
  }
)

function splitFormulae(inputFormulae) {
  const result = []
  let tempStr = ''
  let openParenthesisCount = 0

  for (let i = 0; i < inputFormulae.length; i++) {
    if (inputFormulae[i] === '(') {
      openParenthesisCount++
    } else if (inputFormulae[i] === ')') {
      openParenthesisCount--
    }

    const prevCharIsDigit =
      i > 0 && !isNaN(inputFormulae[i - 1]) && inputFormulae[i - 1] !== ' '
    const nextCharIsDigit =
      i < inputFormulae.length - 1 &&
      !isNaN(inputFormulae[i + 1]) &&
      inputFormulae[i + 1] !== ' '
    const isDelimiterInsideNumber =
      (inputFormulae[i] === ',' || inputFormulae[i] === '.') &&
      prevCharIsDigit &&
      nextCharIsDigit

    if (
      inputFormulae[i] === ',' &&
      openParenthesisCount === 0 &&
      !isDelimiterInsideNumber
    ) {
      result.push(tempStr.trim())
      tempStr = ''
    } else {
      tempStr += inputFormulae[i]
    }
  }

  if (tempStr.trim() !== '') {
    result.push(tempStr.trim())
  }

  return result
}

When(
  'Fetch the cell values for column with ID {string} in WKS',
  async function (colID) {
    this.cellValues = await wksPage.columnsModule.getColumnValues(colID)
    logger.info(
      `The cell details for ${colID} as fetched from the UI is : ${this.cellValues}`
    )
  }
)

When(
  'Fetch inventory total for column with ID {string} in WKS',
  async function (colID) {
    const inventoryTotal = await wksPage.columnsModule.getInventoryTotal(colID)
    // this.inventoryTotalNumber = parseFloat(inventoryTotal);
    logger.info(
      `The inventory total for ${colID} as fetched from the UI is : ${inventoryTotal}`
    )
  }
)

When(
  'User enters the value {string} into the cell identified by row {int} and column {int} of the right panel in the WKS',
  async function (value, rowNumber, colNumber) {
    await wksPage.columnsModule.setValueInCell(
      rowNumber.toString(),
      colNumber,
      value
    )
  }
)

When(
  'User enters a random string of length {int} into the cell identified by row {int} and column {int} of the right panel in the WKS',
  async function (length, rowNumber, colNumber) {
    const valueToEnter = await wksPage.generateRandomStrings(length)
    await wksPage.columnsModule.setValueInCell(
      rowNumber.toString(),
      colNumber,
      valueToEnter
    )
  }
)

Then('Verify that the row index is not broken in WKS', async function () {
  const actualRowIndexes = await wksPage.rowModule.fetchRowIndexes()
  const addedRows = actualRowIndexes.length
  const expectedRowIndexes = Array.from({ length: addedRows }, (_, i) =>
    (i + 1).toString()
  )
  // let actualRowIndexes = await wksPage.rowModule.fetchRowIndexes();
  logger.info(`Actual row indexes : ${actualRowIndexes}`)
  logger.info(`Expected row indexes : ${expectedRowIndexes}`)
  expect(expectedRowIndexes).toEqual(actualRowIndexes)
})

Then(
  'Verify that the row index is {string}',
  async function (expectedRowIndexes) {
    const actualRowIndexes = await wksPage.rowModule.fetchRowIndexes()
    const expectedRowIndexesArr = expectedRowIndexes.split(',')
    logger.info(`The expected row indexes are : ${expectedRowIndexesArr}`)
    expect(expectedRowIndexesArr).toEqual(actualRowIndexes)
  }
)

Then('Verify that the column index is not broken in WKS', async function () {
  const actualColumnIndexes = await wksPage.columnsModule.fetchColumnIndexes()
  const wksColumnHeaders = await wksPage.headers.all()
  const expectedLength = wksColumnHeaders.length

  const sequentialColumnIndexes = Array.from({ length: expectedLength }, (_, i) =>
    String.fromCharCode(65 + i)
  )

  // const firstFourColumns = sequentialColumnIndexes.slice(0, 4)
  // const restReversed = sequentialColumnIndexes.slice(4).reverse()
  // const expectedColumnIndexes = [...firstFourColumns, ...restReversed]

  logger.info(`Actual column indexes : ${actualColumnIndexes}`)
  logger.info(`Expected column indexes : ${sequentialColumnIndexes}`)
  expect(actualColumnIndexes).toEqual(sequentialColumnIndexes)

  // let actualColumnIndexes = await wksPage.columnsModule.fetchColumnIndexes();
  // let wksColumnHeaders = await wksPage.headers.all();
  // let expectedLength = wksColumnHeaders.length;
  // let expectedColumnIndexes = Array.from({ length: expectedLength }, (_, i) =>
  //   String.fromCharCode(65 + i)
  // );
  // logger.info(`Actual column indexes : ${actualColumnIndexes}`);
  // logger.info(`Expected column indexes : ${expectedColumnIndexes}`);
  // expect(actualColumnIndexes).toEqual(expectedColumnIndexes);
})

Then(
  'Verify that the column index is {string}',
  async function (expectedColumnIndex) {
    const actualColumnIndexes = await wksPage.columnsModule.fetchColumnIndexes()
    const expectedColumnIndexesArr = expectedColumnIndex.split(',')
    expect(actualColumnIndexes).toEqual(expectedColumnIndexesArr)
  }
)

Then(
  'Verify that the column index is not broken in WKS when filters are applied on column or columns {string}',
  async function (arrayOfIndexes) {
    const actualColumnIndexes = await wksPage.columnsModule.fetchColumnIndexes()
    const wksColumnHeaders = await wksPage.headers.all()
    const expectedLength = wksColumnHeaders.length

    const fixedColumns = ['A', 'B', 'C', 'D']

    const dynamicColumns = Array.from(
      { length: expectedLength - 4 },
      (_, i) => String.fromCharCode(69 + i) // Starts from 'E'
    ).reverse()

    const incrementsMap = Object.fromEntries(
      arrayOfIndexes
        .split(',')
        .map((item, index) => [item.trim(), dynamicColumns[index]])
    )

    const expectedColumnIndexes = [
      ...fixedColumns,
      ...Object.values(incrementsMap),
      ...dynamicColumns.slice(arrayOfIndexes.length)
    ]

    logger.info(`Actual column indexes : ${actualColumnIndexes}`)
    logger.info(`Expected column indexes : ${expectedColumnIndexes}`)
    expect(actualColumnIndexes).toEqual(expectedColumnIndexes)
  }
)

// function generateIncrements (arrayOfStrings) {
//   const max = arrayOfStrings.length + 2 // We start with 3 for a column with "001"
//   return arrayOfStrings.reduce((acc, val, index) => {
//     acc[val] = max - index
//     return acc
//   }, {})
// }

When('User clicks on the {string} option', async function (option) {
  await wksPage.columnsModule.clickColumnOption(option)
})

When('User fetches all columns using WKS service endpoint', async function () {
  this.columnsInWKS = await this.apiUtil.getAPI(
    `api/v3/worksheet/project/PRO${this.responseMap.get('projectId')}/columns`,
    await this.jwtToken
  )
  this.ids = this.columnsInWKS.Columns.map((column) => column.id)
  this.colIds = this.columnsInWKS.Columns.map((column) => column.colId).filter(
    (colId) => colId !== 'COL2'
  )
  this.columnNames = this.columnsInWKS.Columns.map((column) => column.name)
})

When('I fetch the column names of all the formula columns in the WKS', async function () {
  this.allFormulasInWKS = await this.backEndHelper.fetchAllFormulaColumnsFromWKS(this.responseMap.get('projectId'), await this.jwtToken)
  logger.info(`The formula columns in worksheet are : ${JSON.stringify(this.allFormulasInWKS)}`)
})

When('I click on Remove after attempting to delete the look up column', async function () {
  const removeLink = await wksPage.columnsModule.secondTextInMessage
  await wksPage.webElementHandler.click(await removeLink)
})

When(
  'User fetches the id of the column with colId {string}',
  async function (columnID) {
    for (const column of this.columnsInWKS.Columns) {
      if (column.colId === columnID) {
        const cID = column.id
        this.columnIDFetched = cID.slice(3)
      } else {
        logger.info('Incorrect column ID passed as input to the step')
      }
    }
  }
)

When(
  'User resizes all columns in the WKS to {string}',
  async function (updatedColSize) {
    try {
      this.columnsInWKS = await this.apiUtil.getAPI(
        `api/v3/worksheet/project/PRO${this.initialResponseMap.get('projectId')}/columns`,
        await this.jwtToken
      )
      this.ids = this.columnsInWKS.Columns.map((column) => column.id)
      this.colIds = this.columnsInWKS.Columns.map((column) => column.colId).filter(
        (colId) => colId !== 'COL2'
      )
      logger.info(`Column IDs to be resized are : ${this.colIds}`)
      this.columnNames = this.columnsInWKS.Columns.map((column) => column.name)
      const resizeBodyTemplate = {
        data: [
          {
            operation: 'update',
            attribute: 'columnWidth',
            newValue: updatedColSize
          }
        ]
      }
      // Split colIds into chunks of 10
      const chunks = []
      for (let i = 0; i < this.colIds.length; i += 10) {
        chunks.push(this.colIds.slice(i, i + 10))
      }
      // Send patch requests for each chunk
      for (const chunk of chunks) {
        const resizeBody = { ...resizeBodyTemplate }
        resizeBody.data[0].colIds = chunk
        await this.apiUtil.patchAPI(
          `api/v3/worksheet/project/PRO${this.initialResponseMap.get(
            'projectId'
          )}/columns`,
          JSON.stringify(resizeBody),
          await this.jwtToken
        )
        await wksPage.waitForDuration(1)
      }
      await wksPage.reloadPage()
      await wksPage.isInWKSPage()
    } catch (error) {
      console.error('An error occurred while resizing columns:', error.message)
      throw error
    }
  }
)

When(
  'User resizes all columns in the WKS to {string} for the project {string}',
  async function (updatedColSize, project) {
    let projID
    const envMappings = {
      dev: 'Dev',
      staging: 'Stg'
    }
    const envPrefix = envMappings[process.env.EXECUTION_ENVIRONMENT]
    if (envPrefix && project.includes(envPrefix)) {
      projID = project.split('-')[1]
    }
    const resizeBody = {
      data: [
        {
          operation: 'update',
          attribute: 'columnWidth',
          colIds: this.colIds,
          newValue: updatedColSize
        }
      ]
    }
    await this.apiUtil.patchAPI(
      `api/v3/worksheet/project/PRO${projID}/columns`,
      JSON.stringify(resizeBody),
      await this.jwtToken
    )
  }
)

Then(
  'Validate that the inventory total for the column with column ID {string} is {string}',
  async function (colID, expectedTotal) {
    const inventoryTotal = await wksPage.columnsModule.getInventoryTotal(colID)
    await wksPage.columnsModule.validateColumnValuesInWKS(
      inventoryTotal.trim(),
      expectedTotal
    )
  }
)

Then(
  'Validate that after the page reload the inventory total for the column with column ID {string} is {string}',
  async function (colID, expectedTotal) {
    const inventoryTotal = await wksPage.columnsModule.getInventoryTotal(colID, true)
    await wksPage.columnsModule.validateColumnValuesInWKS(
      inventoryTotal.trim(),
      expectedTotal
    )
  }
)

Then(
  'Validate that the cell values in the column identified by the ID {string} are {string}',
  async function (colID, expected) {
    const actualValues = await wksPage.columnsModule.getColumnValues(colID)
    logger.info(
      `The values of the cells identified by column ID ${colID} as fetched from the UI are : ${actualValues}`
    )
    const expectedValues = expected.split(',').map(String)
    logger.info(
      `The expected values of the cells identified by column ID ${colID} : ${expectedValues}`
    )
    expect(actualValues).toMatchObject(expectedValues)
  }
)

Then(
  'Validate that the cell values in the column identified by the ID {string} between the rows with row-indexes {int} and {int} are {string}',
  async function (colID, fromRowIndex, toRowIndex, expected) {
    const actualValues = await wksPage.columnsModule.getColumnValuesBetweenRows(colID, fromRowIndex, toRowIndex, expected)
    logger.info(
      `The values of the cells identified by column ID ${colID} as fetched from the UI are : ${actualValues}`
    )
    const expectedValues = expected.split(',').map(String)
    logger.info(
      `The expected values of the cells identified by column ID ${colID} : ${expectedValues}`
    )
    expect(actualValues).toMatchObject(expectedValues)
  }
)

Then(
  'Validate that the cell values in the column identified by the ID {string} after adding the intermediate row are {string}',
  async function (colID, expected) {
    const actualValues = await wksPage.columnsModule.getColumnValues(colID, true)
    logger.info(
      `The values of the cells identified by column ID ${colID} as fetched from the UI are : ${actualValues}`
    )
    const expectedValues = expected.split(',').map(String)
    logger.info(
      `The expected values of the cells identified by column ID ${colID} : ${expectedValues}`
    )
    expect(actualValues).toMatchObject(expectedValues)
  }
)

Then(
  'Validate that after the reload cell values in the column identified by the ID {string} are {string}',
  async function (colID, expected) {
    const actualValues = await wksPage.columnsModule.getColumnValues(colID, true)
    const expectedValues = expected.split(',').map(String)
    expect(actualValues).toMatchObject(expectedValues)
  }
)

Then(
  'Validate that the cell or formula values in the column identified by the ID {string} are {string}',
  async function (colID, expected) {
    const actualValues =
      await wksPage.columnsModule.getColumnValuesyByDoubleClicking(colID)
    logger.info(
      `The values of the cells identified by column ID ${colID} as fetched from the UI are : ${actualValues}`
    )
    const expectedValues = expected.split(',').map(String)
    logger.info(
      `The expected values of the cells identified by column ID ${colID} : ${expectedValues}`
    )
    await wksPage.validateObjects(actualValues, expectedValues)
  }
)

When(
  'User enters {string} into the column header of the added column',
  async function (columnName) {
    await wksPage.enterColumnName(columnName)
  }
)

When(
  'User fetch the formulas from the cells of the column with ID {string} in WKS',
  async function (colID) {
    await wksPage.columnsModule.getColumnValuesyByDoubleClicking(colID)
  }
)

When(
  'User reads the value of the cell identified by row {string} in column identified by ID {string} in WKS',
  async function (rowID, colID) {
    this.cellValue = await wksPage.columnsModule.getCellValue(
      rowID,
      colID
    )
  }
)

When(
  'User fetch the value of the cell identified by row {string} in column identified by ID {string} in WKS',
  async function (rowID, colID) {
    this.cellValue = await wksPage.columnsModule.getCellValuesyByDoubleClicking(
      rowID,
      colID
    )
  }
)

When(
  'User just double clicks and pressed escape on the cell identified by row {string} in column identified by ID {string} in WKS',
  async function (rowID, colID) {
    await wksPage.columnsModule.justDoubleClickAndEscape(rowID, colID)
  }
)

When(
  'User just double clicks and presses escape on the all cells in column identified by ID {string} in WKS',
  async function (colID) {
    await wksPage.columnsModule.justDoubleClickAndEscapeOnMultipleCells(colID)
  }
)

When(
  'User just double clicks on the cell identified by row {string} in column identified by ID {string} in WKS',
  async function (rowID, colID) {
    await wksPage.columnsModule.performDoubleClickOnCell(rowID, colID)
  }
)

When('User enter {int} characters in the cell identified by row {string} in column identified by ID {string} in WKS',async (numberOfCharacters,rowId, colId) => {
  const cellValue = await wksPage.generateRandomStringsWithAlphaNumericCharacters(numberOfCharacters)
  await wksPage.columnsModule.justDoubleClickAndType(rowId,colId,cellValue)
})

When('User copy the tags value corresponding to row {string} and column {string}',async (rowId,colId) => {
  const newValueOfTags = await wksPage.columnsModule.getCellValueOfWorksheet(rowId,colId)
  await wksPage.columnsModule.copyTagsValue(newValueOfTags)
})

When('I copy the template name', async () => {
  await wksPage.columnsModule.copyTemplateName()
})

When('I Delete the created template',async () => {
  await wksPage.columnsModule.deleteTemplate()
})

When('I select a sheet template',async () => {
  await wksPage.columnsModule.selectTemplate()
})

Then('Verify tags value in new sheet corresponding to row {string} and column {string}',async (rowId,colId) => {
  const newValueOfTagsInNewSheet = await wksPage.columnsModule.getCellValueOfWorksheet(rowId,colId)
  await wksPage.columnsModule.verifyTagsValue(newValueOfTagsInNewSheet)
})

When('Verify predecessor value is differ then original value {string} shown in cell corresponding to row {string} and column {string}',async (oldValueOfPredecessor,rowId, colId) =>{
  const newValueOfPredecessor = await wksPage.columnsModule.getCellValueOfWorksheet(rowId,colId)
  console.log("Cell value ",newValueOfPredecessor)
  await wksPage.columnsModule.validatePredecessorValue(newValueOfPredecessor,oldValueOfPredecessor)
})

When('I Copy sheet values to verify in template sheet', async () => {
  await wksPage.columnsModule.copyWorksheetValues()
})

When('Verify data Tamplate Values in new sheet',async () => {
  await wksPage.columnsModule.verifySheetData()
})

When('User copy predecessor value in the cell identified by row {string} in column identified by ID {string} in WKS',async (rowID,colID) => {
  // this.ValueOfPredecessor = await wksPage.columnsModule.getCellValueOfWorksheet(rowID,colID)
  await wksPage.columnsModule.copyPredecessorValue();
})

When('User copy predecessor value in the cell identified by row {string} in column identified by ID {string} in WKS for template validation',async (rowID,colID) => {
  // this.ValueOfPredecessor = await wksPage.columnsModule.getCellValueOfWorksheet(rowID,colID)
  await wksPage.columnsModule.copyPredecessorValue(await wksPage.columnsModule.getCellValueOfWorksheet(rowID,colID));
})

When('Verify predecessor value in new sheet is same as old sheet shown in cell corresponding to row {string} and column {string}',async(rowId,colId) => {
  const newSheetValueOfPredecessor = await wksPage.columnsModule.getCellValueOfWorksheet(rowId,colId)
  // await wksPage.assertionHandler.assertWithToBe(this.newValueOfPredecessor)
  await wksPage.columnsModule.validatePredecessorValueInNewSheet(newSheetValueOfPredecessor)
})

Then(
  'Validate that the value fetched from the cell is {string}',
  async function (expected) {
    await wksPage.columnsModule.validateColumnValuesInWKS(
      this.cellValue,
      expected
    )
  }
)

When(
  'User clicks on the focus view icon of column identified by column ID {string}',
  async function (columnID) {
    await wksPage.columnsModule.clickFocusIcon(columnID)
  }
)

When('User hovers on the focus icon', async function () {
  await wksPage.columnsModule.hoverOnFocus()
})

Then(
  'Validate that {string} hover message is displayed',
  async function (message) {
    await wksPage.columnsModule.validateFocusHoverMessage(message)
  }
)

When('User fetches the focus count', async function () {
  this.focusCount = await wksPage.columnsModule.fetchFocusCount()
})

Then('Validate that the focus count is {string}', async function (focusCount) {
  this.focusCount = await wksPage.columnsModule.fetchFocusCount()
  expect(this.focusCount).toContain(focusCount)
})

When(
  'User moves column with identified by column ID {string} to {string}',
  async function (fromCol, toCOl) {
    await wksPage.columnsModule.moveColumnsAcrossWKS(fromCol, toCOl)
    await wksPage.waitForDuration(2)
  }
)

When(
  'User copies the cell contents from the cell identified by row {int} and column {int} to row {int} and column {int}',
  async function (fromRow, fromColumn, toRow, toColumn) {
    await wksPage.columnsModule.copyAndPasteFormula(
      fromRow,
      fromColumn,
      toRow,
      toColumn
    )
  }
)

When('User copies the cell contents from the cell identified by row {int} and column {int} to all cells between rows {int} to {int} in column {int}', async function (fromRowNum, fromColNum, rowRangeStart, rowRangeEnd, toColNum) {
  await wksPage.columnsModule.copyPasteDataBetweenCells(fromRowNum, fromColNum, rowRangeStart, rowRangeEnd)
  await wksPage.waitForDuration(1)
})

When(
  'User copies the cell contents from the column with ID {string} to column with ID {string}',
  async function (fromColID, toColID) {
    await wksPage.columnsModule.copyAndPasteDataToFromColumn(
      fromColID,
      toColID
    )
  }
)

When(
  'User deletes the column identified by column ID {string}',
  async function (colID) {
    await wksPage.waitForDuration(1)
    await wksPage.columnsModule.clickActionIconByColumnID(colID)
    await wksPage.columnsModule.clickOnAction('Remove Column')
    await wksPage.rowModule.confirmLink.last().click()
    await wksPage.waitForDuration(1)
  }
)

Then(
  'User validates that the columns names as fetched from the UI are {string}',
  async function (columnNames) {
    const expectedValues = columnNames.split(',').map(String)
    logger.info(`The actual values are : ${this.columnNames}`)
    logger.info(`The expected values are : ${expectedValues}`)
    expect(await this.columnNames).toMatchObject(expectedValues)
  }
)

When('User changes the formula name to {string}', async function (editedName) {
  await wksPage.columnsModule.editColumName(editedName)
})

Then(
  'User validates that {string} is not part of the menu options displayed',
  async function (optionNotToBeDisplayed) {
    await wksPage.columnsModule.validateThatThisOptionIsNotDisplayed(
      optionNotToBeDisplayed
    )
  }
)

Then(
  'User validates that the columns names as fetched from the UI using locators are {string}',
  async function (columnNames) {
    await this.page.waitForTimeout(1000)
    const expectedValues = columnNames.split(',').map(String)
    const actualValues = await wksPage.columnsModule.fetchColumnNames()
    logger.info(`The actual values are : ${actualValues}`)
    logger.info(`The expected values are : ${expectedValues}`)
    expect(actualValues).toMatchObject(expectedValues)
  }
)

When('User clicks on {string}', async function (clickItem) {
  await wksPage.columnsModule.clicksOn(clickItem)
})

Then('Validate that the menu actions are all grayed out', async function () {
  await wksPage.columnsModule.validateThatMenuActionsAreGrayed()
})

When(
  'User bulk deletes data starting from column identified by ID {string}',
  async function (columnID) {
    await wksPage.rowModule.deleteAllDataInTheWKS('1', columnID)
  }
)

Then(
  'User validates that the non product column filter icons are {string}',
  async function (enableState) {
    await wksPage.columnsModule.validateNonProductColumnFilterStatus(
      enableState
    )
  }
)

Then(
  'User verifies that the menu option {string} is {string}',
  async function (menuOption, state) {
    await wksPage.columnsModule.checkMenuOptionDisplayStatus(menuOption, state)
  }
)

Then('I validate that {string} menu options are displayed', async function (menuOptions) {
  const menuOptionElements = await wksPage.columnsModule.subMenu
  await wksPage.assertActualAndExpectedAllTexts(menuOptionElements, menuOptions)
  // await wksPage.webElementHandler.click(await wksPage.searchModule.searchInput)
})

Then('I verify that the contents of the cells in the column with ID {string} are not {string}', async function (columnID, cellContentsNotToBe) {
  await wksPage.columnsModule.validateThatCellContentsAreNot(columnID, cellContentsNotToBe)
})

When('I fetch the product design grid pinned column data', async function () {
  this.PDGridDataFromUI = await wksPage.rowModule.fetchProductDesignGridPinnedColumnData()
})

Then('I validate that data in product design grid pinned column data is preserved after adding adding intermediate row {string}', async function (intermediateRows) {
  const rowsToRemove = intermediateRows.split(',').map(row => parseInt(row.trim(), 10))
  const currentSheetPDGridRows = await wksPage.rowModule.fetchIntermediateRowPDGridData(rowsToRemove.length)
  await wksPage.assertionHandler.assertObjects(this.PDGridDataFromUI, currentSheetPDGridRows)
})

When('I click on open details of inventory and added below values in respective section', async function (dataTable) {
  const data = dataTable.hashes();
  await wksPage.openDetailsPageAndFillValues(data[0]);
});

When('Validate lookup values as follows in duplicate sheet', async function (dataTable) {
  const data = dataTable.hashes();
  await wksPage.validateLookupColumns(data[0]);
});

When('I add alias Descriptions RSN and RSNe lookup columns', async function () {
   await wksPage.addLookupColumns()
});