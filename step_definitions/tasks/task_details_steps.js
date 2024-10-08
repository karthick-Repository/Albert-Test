const { Before, When, Then } = require('@cucumber/cucumber')
const {CreateTask} = require('../../page_objects/Task/CreateTask')
let taskDetailsPage
let wksPage
let createTask

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
  taskDetailsPage = await this.poManager.fetchTaskDetailsPage()
  createTask = new CreateTask(this.page)
})

Then('I validate that the user is in the details page of the the created task', async function () {
  await taskDetailsPage.isInTaskDetailsPage()
})

Then('I validate that the status of the task is {string}', async function (taskStatus) {
  await taskDetailsPage.validateTaskStatus(taskStatus)
})

Then('I validate the inventories displayed in the left pane of the task details page', async function () {
  const inventoryNameElements = await taskDetailsPage.leftPaneInventoryNames
  const expectedFormulanames = this.allFormulasInWKS.formulaNames
  await taskDetailsPage.assertionHandler.assertActualContainsExpected(await inventoryNameElements, expectedFormulanames)
})

Then('I validate that the label {string} is displayed in the left pane', async function (expectedLabel) {
  const inventoryLabelElement = await taskDetailsPage.leftPaneInventoryLabel
  await taskDetailsPage.assertionHandler.assertActualAndExpectedText(await inventoryLabelElement, expectedLabel)
})

When('I change the status of the task to {string}', async function (statusToSet) {
  await taskDetailsPage.changeTaskStatus(statusToSet)
})

When('User select {string} inventory select {string} as unit and {string} as quantity and click on create button', async (numberOfInventory,unit,quantity)=> {
  await taskDetailsPage.provideBatchTaskDetails(numberOfInventory,unit,quantity)
})

When('Verify {string} should be shown in cell corresponding to row {string} and column {string}', async (taskName,rowId,colId)=> {
  const cellValue = await wksPage.columnsModule.getCellValueOfWorksheet(rowId,colId)
  await wksPage.assertionHandler.assertWithToBe(taskName,cellValue)
})

When('Verify {string} should be shown after double click in cell corresponding to row {string} and column {string}', async (taskName,rowId,colId)=> {
  const cellValue = await wksPage.columnsModule.getCellValuesyByDoubleClicking(rowId,colId)
  await wksPage.assertionHandler.assertWithToBe(taskName,cellValue)
})

