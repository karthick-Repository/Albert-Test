const { When, Then, Before } = require('@cucumber/cucumber')

let wksPage, elementHandler, duplicateSheetsModule, sheetsModule
// let elementHandler, response, endpoint

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
  sheetsModule = await wksPage.sheetsModule
  duplicateSheetsModule = await wksPage.sheetsModule.duplicateSheetsModule
  elementHandler = await wksPage.webElementHandler
})

Then('I validate the initial state of all the grid panels in the duplicate sheets dialog', async function () {
  // eslint-disable-next-line quotes
  const expectedProductDesignGridListItems = ["Copy all rows0 rows will be copied with their row structure", "Copy pinned columns (4 of 4 selected)Name, Inventory ID, Manufacturer, 1 blank", "Copy unpinned columns (0 of 1 selected)1 product columns"]
  // eslint-disable-next-line quotes
  const expectedResultsDesignGridListItems = ["Copy property tasks linked to selected columns (0 of 0 selected)You can link these tasks to the products/formulas in your new sheet", "Copy other property tasks (0 of 0 selected)You can link these tasks to the products/formulas in your new sheet"]
  // eslint-disable-next-line quotes
  const expectedAppsDesignGridListItems = ["All rows will be copied with their data, except batches"]
  await duplicateSheetsModule.validateInitialStateOfGridsInDuplicateSheetDialog(expectedProductDesignGridListItems, expectedResultsDesignGridListItems, expectedAppsDesignGridListItems)
})

When('I validate that the header details in the duplicate sheets dialog', async function () {
  this.activeSheet = await sheetsModule.fetchActiveSheet()
  const expectedHeader = `Create a Sheet (Copy of ${this.responseMap.get('projectId')}, ${this.activeSheet})`
  await duplicateSheetsModule.assertionHandler.assertActualAndExpectedText(await sheetsModule.sheetsCreationheader, expectedHeader)
})

Then('I validate that the new sheet is added in the first position', async function () {
  const newActiveSheetAfterAddition = await sheetsModule.fetchActiveSheet()
  await duplicateSheetsModule.assertionHandler.assertActualAndExpectedText(await sheetsModule.sheetTabs.first(), newActiveSheetAfterAddition)
})

When('I {string} the checkbox number {int} in the {string} section', async function (checkUnCheck, checkboxNumber, gridSection) {
  const gridSections = {
    'Product Design Grid': duplicateSheetsModule.productDesignGridPanelCheckboxes,
    'Results Grid': duplicateSheetsModule.resultGridPanelCheckboxes
  }

  const allCheckBoxes = await gridSections[gridSection].all()
  const action = checkUnCheck === 'check' ? 'checkCheckbox' : 'uncheckCheckbox'
  await elementHandler[action](allCheckBoxes[checkboxNumber - 1])
})

When('I click on icon {int} of type > in the {string}', async function (iconNumber, gridType) {
  const arrowIconElements = gridType === 'Product Design Grid' ? await duplicateSheetsModule.productDesignGridPanelArrowIcons.all() : await duplicateSheetsModule.resultsGridPanelArrowIcons.all()
  const arrowIconToClick = await arrowIconElements[iconNumber - 1]
  await duplicateSheetsModule.webElementHandler.click(await arrowIconToClick)
})

Then('I validate that the grouped rows state is preserved after user duplicates the sheet', async function () {
  const allRowElementsInPDGrid = await wksPage.rowModule.allRowsInPDGrid
  await wksPage.assertionHandler.assertObjects(this.allRowsInPDGrid, await wksPage.webElementHandler.getAllTexts(await allRowElementsInPDGrid))
})

When('I check {int} checkboxes in the Other Columns section', async function (numberOfCheckboxesToCheck) {
  await duplicateSheetsModule.checkOtherColumnsToBeIncludedInTheSheet(numberOfCheckboxesToCheck)
})

When('I check checkbox number {int} in the Other Columns section', async function (checkBoxNumber) {
  await duplicateSheetsModule.checkOtherColumnCheckbox(checkBoxNumber)
})

When('I uncheck checkbox number {int} in the Other Columns section', async function (checkBoxNumber) {
  await duplicateSheetsModule.uncheckOtherColumnCheckbox(checkBoxNumber)
})


Then("I validate the initial contents of the Select Columns To Copy dialog for {string} rows and {string} columns with the following calculation references {string} in the sheet", async function (numberOfRows, numberOfColumns, calculationReferenceColumns) {
  const expectedSearchTitles = ['Pinned Columns (4 of 4 selected)', `Other Columns (0 of ${numberOfColumns} selected)`]
  const expectedPinnedSectionText = ['A. NameAll copied rows show name', 'B. Inventory IDAll copied rows show inventory ID', 'C. ManufacturerAll copied rows show manufacturer', `D. DetailsHas Data in ${numberOfRows} rows`]
  const urlItemsPostSplit = await wksPage.fetchPageURL().split('/')
  const allColumns = await this.backEndHelper.fetchAllColumnsFromSheet('products', await this.responseMap.get('albertId'), urlItemsPostSplit[7], await this.jwtToken)
  const actualFormulaColumns = await allColumns.Items[0].Values
    .map(item => ({ name: item.name, id: item.id }))
    .slice(4) // Remove the first four entries
    .sort((a, b) => a.name.localeCompare(b.name))
  const expectedTitles = this.backEndHelper.reorderBasedOnDefaultColumnFetched(actualFormulaColumns)
  this.buildExpectedOtherColumnsArray(actualFormulaColumns)
  const expectedSubTitles = [`Has Data in ${numberOfRows} rows`, `Has Data in ${numberOfRows} rowsCalculation reference other columns - ${calculationReferenceColumns}`, `Has Data in ${numberOfRows} rowsCalculation reference other columns - ${calculationReferenceColumns}`]
  await duplicateSheetsModule.validateInitialStateOfSelectColumnsToCopyDialog(expectedSearchTitles, expectedPinnedSectionText)
})

Then('I validate that the pinned columns section title is {string} and the text displayed in the section is {string}', async function (expectedPinnedColumnTitle, expectedPinnedColumnDetails) {
  await duplicateSheetsModule.validateThePinnedColumnsSection(expectedPinnedColumnTitle, expectedPinnedColumnDetails)
})

Then('I validate that the other columns section title is {string} and the number of checkboxes displayed are {int}', async function (expectedOtherColumnsTitle, expectedNumberOfCheckboxes) {
  await duplicateSheetsModule.validateTheOtherColumnsSection(expectedOtherColumnsTitle, expectedNumberOfCheckboxes)
})