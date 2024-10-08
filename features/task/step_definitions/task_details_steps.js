const { Before, When, Then } = require('@cucumber/cucumber')

let taskDetailsPage

Before(async function () {
  taskDetailsPage = await this.poManager.fetchTaskDetailsPage()
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
