const { When, Then, Before } = require('@cucumber/cucumber')

let wksPage
let elementHandler, response, endpoint

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
  elementHandler = await wksPage.webElementHandler
})

When('I click on the plus icon in the footer of the worksheet', async function () {
  const plusIconElement = await wksPage.sheetsModule.plusIcon
  await elementHandler.click(await plusIconElement)
})

Then('I validate that the {string} options are displayed after clicking the plus icon displayed in the footer of the worksheet', async function (expectedOptions) {
  const plusIconOptionsElement = await wksPage.sheetsModule.plusIconOptions
  await wksPage.assertActualAndExpectedAllTexts(await plusIconOptionsElement, expectedOptions)
})

Then('I validate that the steps {string} are displayed after user clicks on copy from another sheet', async function (expectedSteps) {
  const copyFromSheetsStepsElements = await wksPage.sheetsModule.copyFromSheetSteps
  await wksPage.assertActualAndExpectedAllTexts(await copyFromSheetsStepsElements, expectedSteps)
})

Then('I validate that sub pop-over is displayed', async function () {
  const startFromScratchSubPopOverElement = await wksPage.sheetsModule.startFromScratch_SubPopOver
  await wksPage.assertionHandler.assertForVisibility(await startFromScratchSubPopOverElement)
})

When('I enter a random string of length {int} as the sheet name into the sub pop-over', async function (sheetNameLength) {
  const sheetName = await wksPage.generateRandomStrings(sheetNameLength) + '!@#$%^&*(){}:"<>?|'
  const sheetNameInputElement = await wksPage.sheetsModule.startFromScratch_SubPopOver_Input
  await wksPage.webElementHandler.fillInput(await sheetNameInputElement, sheetName)
})

When('I click on the {string} link', async function (linkName) {
  const linkElement = linkName === 'Save' ? await wksPage.saveButton : await wksPage.cancelButton
  await elementHandler.click(await linkElement)
})

When('I create {int} sheets from scratch and name them as random {int} character alphanumeric strings', async function (numberOfSheets, sheetNameCharLength) {
  this.sheetNamesGenerated = await wksPage.generateRandomStringsWithAlphanumericCharsAsArray(sheetNameCharLength, numberOfSheets)
  await wksPage.sheetsModule.createSheetsFromScratch(numberOfSheets, this.sheetNamesGenerated, await wksPage.createButton.last())
  this.sheetNamesGenerated.unshift('Sheet 1')
  await wksPage.waitForDuration(2)
})

Then('I validate that all the sheets are added to the worksheet', async function () {
  endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  this.sheetNamesFetchedFromBEService = await response.Sheets.map(sheet => sheet.name).reverse()
  await wksPage.assertionHandler.assertObjects(this.sheetNamesFetchedFromBEService, this.sheetNamesGenerated)
})

When('I click on sheet number {int} in the footer of the worksheet', async function (sheetNumber) {
  await wksPage.sheetsModule.clickOnSpecificSheet(sheetNumber)
})

When('I fetch the design IDs of all the sheets added to the worksheet', async function () {
  endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  this.designIDsFetchedFromBE = await response.Sheets.flatMap(sheet => sheet.Designs.map(design => design.albertId)).reduce((acc, id, i, arr) => i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc, [])
})

When('I add {int} blank rows, {int} inventory rows of type {string} into the PD grid of all the sheets of the worksheet', async function (numberOfBlankRows, numberOfInvRows, invType) {
  this.rowsInSheets = []
  endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  this.designIDsFetchedFromBE = await response.Sheets.flatMap(sheet => sheet.Designs.map(design => design.albertId)).reduce((acc, id, i, arr) => i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc, [])
  const randomBlankRowPayLoad = this.dataGenerator.generateRandomBlankRowData(numberOfBlankRows)
  for (const designID of this.designIDsFetchedFromBE) {
    const endPoint = `api/v3/worksheet/design/${designID[1]}/rows`
    for (let i = 0; i < numberOfBlankRows; i++) {
      response = await this.apiUtil.postAPI(endPoint, randomBlankRowPayLoad[i], await this.jwtToken)
      this.rowsInSheets.push(response.map(row => row.name))
    }
    const randomInventoryRowPayLoad = await this.dataGenerator.generateRandomInventoryRowData(numberOfInvRows, invType, await this.jwtToken)
    response = await this.apiUtil.postAPI(endPoint, await randomInventoryRowPayLoad, await this.jwtToken)
    this.rowsInSheets.push(response.map(row => row.name))
  }
})

When('I add {int} blank rows, {int} inventory rows of type {string} into the PD grid of all the sheets of worksheet {int}', async function (numberOfBlankRows, numberOfInvRows, invType, worksheetNumber) {
  this.rowsInSheets = []
  const wksDetails = this.allProjectsMap[worksheetNumber - 1]
  endpoint = `api/v3/worksheet/?type=project&id=${wksDetails.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  this.designIDsFetchedFromBE = await response.Sheets.flatMap(sheet => sheet.Designs.map(design => design.albertId)).reduce((acc, id, i, arr) => i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc, [])
  const randomBlankRowPayLoad = this.dataGenerator.generateRandomBlankRowData(numberOfBlankRows)
  for (const designID of this.designIDsFetchedFromBE) {
    const endPoint = `api/v3/worksheet/design/${designID[1]}/rows`
    for (let i = 0; i < numberOfBlankRows; i++) {
      response = await this.apiUtil.postAPI(endPoint, randomBlankRowPayLoad[i], await this.jwtToken)
      this.rowsInSheets.push(response.map(row => row.name))
    }
    const randomInventoryRowPayLoad = await this.dataGenerator.generateRandomInventoryRowData(numberOfInvRows, invType, await this.jwtToken)
    response = await this.apiUtil.postAPI(endPoint, await randomInventoryRowPayLoad, await this.jwtToken)
    this.rowsInSheets.push(response.map(row => row.name))
  }
})

When('I add {int} formula columns and {int} blank columns into the PD grid of all the sheets of the worksheet', async function (numberOfInventoryColumns, numberOfBlankColumns) {
  endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  this.worksheetIDsFetchedFromBE = await response.Sheets.map(sheet => sheet.albertId)
  const formulaColumnData = this.dataGenerator.generateRandomFormulaColumnData(numberOfInventoryColumns)
  const blankColumnData = this.dataGenerator.generateRandomBlankColumnData(numberOfBlankColumns)
  for (const wksID of this.worksheetIDsFetchedFromBE) {
    endpoint = `api/v3/worksheet/sheet/${wksID}/columns`
    for (const column of formulaColumnData) {
      await this.apiUtil.postAPI(endpoint, column, await this.jwtToken)
    }
    for (const column of blankColumnData) {
      await this.apiUtil.postAPI(endpoint, column, await this.jwtToken)
    }
  }
})

// When('I add {int} formula columns and {int} blank columns into the PD grid of all the sheets of the worksheet', async function (numberOfInventoryColumns, numberOfBlankColumns) {
//   const endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
//   const response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
//   this.worksheetIDsFetchedFromBE = response.Sheets.map(sheet => sheet.albertId)

//   const formulaColumnData = this.dataGenerator.generateRandomFormulaColumnData(numberOfInventoryColumns)
//   const blankColumnData = this.dataGenerator.generateRandomBlankColumnData(numberOfBlankColumns)

//   const allColumnData = [...formulaColumnData, ...blankColumnData]

//   await Promise.all(this.worksheetIDsFetchedFromBE.map(async (wksID) => {
//     const columnEndpoints = allColumnData.map(columnData =>
//       this.apiUtil.postAPI(`api/v3/worksheet/sheet/${wksID}/columns`, columnData, await this.jwtToken)
//     )
//     await Promise.all(columnEndpoints)
//   }))
// })

Then('I validate that the added formula columns are fetched sucessfully in search', async function () {
  for (const wksID of this.worksheetIDsFetchedFromBE) {
    endpoint = `api/v3/worksheet/search?sheetId=${wksID}&projectId=${this.responseMap.get('projectId')}&limit=500`
    const response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
    const addedFormulaColumns = response.Items.map(item => item.albertId)
    addedFormulaColumns.unshift('Details', 'Manufacturer', 'Name', 'Inventory ID')
    addedFormulaColumns.sort()
    this.columnNames.sort()
    await wksPage.assertionHandler.assertObjects(addedFormulaColumns, this.columnNames)
  }
})

Then('I validate that the index of formula columns in all the sheets is not broken', async function () {
  endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  await wksPage.sheetsModule.checkForFormulaSequenceAcrossSheets(response)
})

When('I resize the columns in all sheets to {string}', async function (resizeColumnTo) {
  this.sheetIDs = []
  endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  this.sheetIDs.push(response.Sheets.map(sheet => sheet.albertId))
})

Then('I validate that only the formulae which are part of sheet number {int} can be set in the inventory multi select dropdown', async function (sheetNumber) {
  endpoint = `api/v3/worksheet/?type=project&id=${this.responseMap.get('albertId')}`
  response = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  const expectedResults = response.Sheets[sheetNumber].Formulas.map(formula => formula.name)
  const actualResults = await wksPage.sheetsModule.fetchActiveInactiveFormulaeCheckboxes()
  const sortedActiveInventories = [...actualResults.activeInventories].sort()
  await wksPage.assertionHandler.assertWithToBe(sortedActiveInventories.join(), expectedResults.join())
})

Then('I validate that the user is in the sheets page', async function () {
  await wksPage.sheetsModule.isUserInSheetsPage()
})

When('I click on the action icon of sheet {int}', async function (sheetNumber) {
  await wksPage.sheetsModule.clickOnSheetsActionIcon(sheetNumber)
})

When('I search for sheet number {int}', async function (sheetNumber) {
  await wksPage.sheetsModule.searchForSheet(this.sheetNamesGenerated[sheetNumber])
  await wksPage.waitForURL('**/worksheet/WKS*')
})

Then('I validate that sheet number {int} is in focus', async function (sheetNumber) {
  const expectedActiveSheetName = this.sheetNamesGenerated[sheetNumber]
  const actualActiveSheetName = await wksPage.sheetsModule.fetchActiveSheet()
  await wksPage.assertionHandler.assertWithToBe(actualActiveSheetName, expectedActiveSheetName)
})

When('I create a sheet from scratch and name it as {string}', async function (sheetName) {
  await wksPage.sheetsModule.createSheetsFromScratch(1, [sheetName], await wksPage.createButton.last())
})

When('I set a random {int} character string as the name of the sheet being duplicated', async function (sheetNameLength) {
  this.duplicateSheetName = await wksPage.generateRandomStringsWithAlphaNumericCharacters(sheetNameLength)
  await wksPage.sheetsModule.elementHandler.fillInput(await wksPage.sheetsModule.duplicateSheetNameInput, this.duplicateSheetName)
})

Then(
  'I validates that {string} dialog is displayed',
  async function (dialogHeader) {
    await wksPage.validateDialogDisplayed(dialogHeader)
  }
)

When('I duplicate sheet number {int}', async function (sheetToDuplicate) {
  const sheetToClick = await wksPage.sheetsModule.sheetTabs.all()
  await elementHandler.click(await sheetToClick[sheetToDuplicate - 1])
  await wksPage.waitForDuration(1)
  const plusIconElement = await wksPage.sheetsModule.plusIcon
  await elementHandler.click(await plusIconElement)
  await elementHandler.click(await this.page.getByText('Duplicate current sheet'))
})

When('I fetch the {string} design ID of the active sheet in the worksheet', async function (gridType) {
  const worksheetIDToBeUsed = await this.initialResponseMap.get('albertId')
  this.activeSheetColumns = await this.backEndHelper.fetchAllColumnsFromSheet(gridType, worksheetIDToBeUsed, await wksPage.sheetsModule.fetchActiveSheet(), await this.jwtToken)
})

Then('I validate that columns displayed are {string}', async function (expectedColumns) {
  await wksPage.assertionHandler.assertObjects(this.activeSheetColumns, expectedColumns.split(','))
})
