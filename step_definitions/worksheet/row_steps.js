const { Before, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const logger = require('../../utilities/Logger')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When('Edit the row names added to WKS', async function () {
  this.editedRowNames = await this.poManager
    .fetchWorksheetPage()
    .editRowNames()
})

Then('Validate the edited row names are saved in the WKS', async function () {
  await this.poManager.fetchWorksheetPage().validateRows(this.editedRowNames)
})

When(
  'Delete {int} {string} {string} rows added to WKS',
  async function (numberOfRowsToDelete, rowType, withData) {
    this.deletedIndices = await this.poManager
      .fetchWorksheetPage()
      .deleteRows(numberOfRowsToDelete, rowType, withData)
  }
)

When(
  'Validate that the WKS no longer has the rows which were deleted earlier',
  async function () {
    const deletedIndicesSet = new Set(this.deletedIndices)
    const newEditedRowNames = this.editedRowNames.filter(
      (_, index) => !deletedIndicesSet.has(index)
    )
    logger.info(`Expected rows after row deletion are ${newEditedRowNames}`)
    expect(
      await this.poManager.fetchWorksheetPage().fetchAddedRowsFromWKS()
    ).toEqual(newEditedRowNames)
  }
)

When(
  'Enter values into the detail cells for the rows added in the {string} panel & the action type is {string}',
  async function (panelType, actionType) {
    this.cellValues = await this.poManager
      .fetchWorksheetPage()
      .addCellDetails(panelType, actionType)
  }
)

Then(
  'Validate that the value of Inventory Total for the added rows in the {string} panel for {string} rows',
  async function (panelType, rowType) {
    const inventoryTotal = await this.poManager
      .fetchWorksheetPage()
      .fetchInventoryTotal(panelType)
    const invTotal = parseInt(inventoryTotal[0])
    logger.info(`Inventory total as fetched from UI is : ${invTotal}`)
    if (rowType === 'blank') {
      expect(invTotal).toBeLessThanOrEqual(0)
    } else {
      const expectedSum = this.cellValues.reduce(
        (acc, entry) => acc + entry,
        0
      )
      logger.info(`Expected inventory total is : ${expectedSum}`)
      expect(invTotal).toBeLessThanOrEqual(expectedSum)
    }
  }
)

When(
  'Edit values of the detail cells for the rows added in the {string} panel',
  async function (panelType) {
    this.editedCellValues = await this.poManager
      .fetchWorksheetPage()
      .addCellDetails(panelType, 'edit')
  }
)

When(
  'User deletes blank row at index {int} from WKS',
  async function (rowNumber) {
    await this.poManager.fetchWorksheetPage().waitForDuration(1)
    await this.poManager
      .fetchWorksheetPage()
      .rowModule.deleteBlankRowFromWKS(rowNumber)
    await this.poManager.fetchWorksheetPage().waitForDuration(1)
  }
)

When(
  'User clicks the action icon of row {int} in WKS',
  async function (rowNumber) {
    await this.poManager
      .fetchWorksheetPage()
      .rowModule.clickOnActionIcon(rowNumber)
  }
)

When(
  'User deletes blank row at indexes {string} from WKS',
  async function (rowNumbers) {
    // await this.poManager
    //   .fetchWorksheetPage()
    //   .rowModule.deleteBlankRowsFromWKS(rowIndexes)
    await wksPage.rowModule.deleteRowsByIndexes(rowNumbers, 'This is an empty Row. Are you sure?', 'Confirm')
  }
)

When(
  'User moves row at index {int} to index {int}',
  async function (fromPos, toPos) {
    await this.poManager
      .fetchWorksheetPage()
      .rowModule.moveRowsAcrossWKS(fromPos, toPos)
    await wksPage.waitForDuration(3)
  }
)

When(
  'User clicks on the advanced search button in the inventory seach dialog',
  async function () {
    await this.poManager
      .fetchWorksheetPage()
      .rowModule.clickInventoryAdvancedSearch()
  }
)

When('User checks the {string} checkboxes under category section in the Advanced Search Dialog', async function (inputString) {
  const checkBoxes = inputString.split(',').map(str => str.trim())

  const checkBoxMap = {
    Formulas: await wksPage.advancedInventorySearchFormulasCheckBox,
    RawMaterials: await wksPage.advancedInventorySearchRawMaterialsCheckBox,
    Consumables: await wksPage.advancedInventorySearchConsumablesCheckBox
  }

  for (const checkBox of checkBoxes) {
    const checkBoxElement = checkBoxMap[checkBox]
    if (await checkBoxElement) {
      logger.info(`Checking the ${checkBox} checkbox`)
      await wksPage.webElementHandler.checkCheckbox(await checkBoxElement)
    } else {
      const errorMessage = `Incorrect inventory category or checkbox name passed as a param: ${checkBox}`
      logger.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
})

When(
  'User adds {int} inventories of type {string} to the WKS from advanced search dialog',
  async function (bulkAddInvetories, invType) {
    this.inventoryDataMap =
      await this.dataGenerator.generateRandomInventoryData(
        bulkAddInvetories,
        invType,
        await this.jwtToken
      )
    this.advancedSearchInvAdded = await this.poManager
      .fetchWorksheetPage()
      .rowModule.addInventoriesInBulk(this.inventoryDataMap)
  }
)

const deleteDataFromWorksheet = async function (rowNumber) {
  await this.poManager
    .fetchWorksheetPage()
    .rowModule.deleteAllDataInTheWKS(rowNumber, 'COL4')
}

When('User clears all data from the WKS', async function () {
  await deleteDataFromWorksheet.call(this, '1')
})

When('User clears all data from the WKS starting from row {int}', async function (rowNumber) {
  await deleteDataFromWorksheet.call(this, rowNumber)
})

When(
  'User renames row group identified by index {int} to {string}',
  async function (rowIndex, editedRowName) {
    await this.poManager
      .fetchWorksheetPage()
      .rowModule.clickOnActionIcon(rowIndex)
    await this.poManager
      .fetchWorksheetPage()
      .rowModule.renameGroupTo(rowIndex, editedRowName)
  }
)

When(
  'User clicks on the action icon of row at index {int}',
  async function (rowIndex) {
    await this.poManager
      .fetchWorksheetPage()
      .rowModule.clickActionIconOfRowInLeftContainer(rowIndex)
  }
)

When('I click on the action icon of the {string} row', async function (rowName) {
  const rowToClick = await wksPage.rowModule.allRowsByPluginRender.filter({ hasText: rowName }).locator('span').first()
  await wksPage.webElementHandler.click(await rowToClick)
})

Then(
  'User verifies that the row {string} is added at index {int} to the product design grid of the worksheet',
  async function (rowName, expectedRowIndex) {
    this.allRowsInWKS = await wksPage.rowModule.fetchAllRowsInTheWorksheet()
    logger.info(`The rows fetched from UI are: ${this.allRowsInWKS}`)
    const actualRowIndex = this.allRowsInWKS.findIndex(
      (row) => row === rowName
    )
    logger.info(
      `The actual row index of '${rowName}' as fetched from the UI is: ${actualRowIndex}`
    )
    logger.info(
      `The expected row index of '${rowName}' is: ${expectedRowIndex}`
    )
    expect(actualRowIndex).toBe(expectedRowIndex - 1)
  }
)

When(
  'User adds the inventories added in the parent project to the current project',
  async function () {
    this.advancedSearchInvAdded = await this.poManager
      .fetchWorksheetPage()
      .rowModule.addInventoriesInBulk(this.inventoryDataMap)
  }
)

When('I expand the apps grid section in the worksheet', async function () {
  const appsGridExpandIcon = await wksPage.rowModule.appsGrid_Icon
  await wksPage.webElementHandler.click(await appsGridExpandIcon)
  await wksPage.waitForDuration(2)
})

When('I click on the product design grid section in the worksheet', async function () {
  const productDesignIcon = await wksPage.rowModule.productDesignGridArrowIcon
  await wksPage.webElementHandler.click(await productDesignIcon.first())
  await wksPage.waitForDuration(1)
})

When('I click on the plus icon of apps grid section in the worksheet', async function () {
  const appsGridPlusIcon = await wksPage.rowModule.appsGridPlusIcon
  await wksPage.webElementHandler.click(await appsGridPlusIcon)
  await wksPage.waitForDuration(1)
})

When('I click on the result grid section in the worksheet', async function () {
  const resultIcon = await wksPage.rowModule.productResultGridArrowIcon
  await wksPage.webElementHandler.click(await resultIcon)
  await wksPage.waitForDuration(1)
})

Then('I validate that {string} rows are displayed in the Apps grid', async function (expectedRows) {
  const actualAppGridRows = await wksPage.rowModule.fetchDefaultAppGridRows()
  const expectedAppGridRows = expectedRows.split(',')
  await wksPage.assertObjects(actualAppGridRows, expectedAppGridRows)
})

When('I add all the available look up rows to the app grid in the worksheet', async function () {
  await wksPage.rowModule.addAllLookUpRowsToAppsGrid()
})

When('I delete the look up rows at indexes {string}', async function (indexes) {
  await wksPage.rowModule.deleteRowsByIndexes(indexes, 'Are you sure you want to remove this  row? You can add it back at any time.', 'Remove')
})

When('I add the look up rows {string} starting from the row at index {int} in the apps grid', async function (lookupRows, startingAtIndex) {
  const lookUpRowArray = lookupRows.split(',')
  for (const lookUpRow of lookUpRowArray) {
    await wksPage.rowModule.clickActionIconOfRowInLeftContainer(startingAtIndex)
    const textElementToClickOn = await wksPage.frameLocator.getByText('Add a Lookup Row').first()
    await wksPage.webElementHandler.click(await textElementToClickOn)
    const elementToClickOn = await wksPage.frameLocator.locator(`//a[text()=' ${lookUpRow} ']`)
    await wksPage.webElementHandler.click(await elementToClickOn)
    await wksPage.waitForDuration(1)
  }
})

When('I add the following look up rows {string} to the apps grid', async function (lookUpRows) {
  const lookUpRowArray = lookUpRows.split(',')
  for (const lookUpRow of lookUpRowArray) {
    await wksPage.webElementHandler.click(await wksPage.rowModule.appsGridPlusIcon)
    const textElementToClickOn = await this.page.getByText('Add a Lookup Row').first()
    await wksPage.webElementHandler.click(await textElementToClickOn)
    const elementToClickOn = await this.page.locator(`//a[text()=' ${lookUpRow} ']`)
    await wksPage.webElementHandler.click(await elementToClickOn)
    await wksPage.waitForDuration(1)
  }
})

When('I fetch all the rows in the product design grid', async function () {
  const allRowElementsInPDGrid = await wksPage.rowModule.allRowsInPDGrid
  this.allRowsInPDGrid = await wksPage.webElementHandler.getAllTexts(await allRowElementsInPDGrid)
})
