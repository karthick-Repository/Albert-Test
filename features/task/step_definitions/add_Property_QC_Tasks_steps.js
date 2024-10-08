const { Before, When, Then } = require('@cucumber/cucumber')

let taskPage, addPropertyQCTasksDialog

Before(async function () {
  taskPage = await this.poManager.fetchTaskPage()
  addPropertyQCTasksDialog = await taskPage.addPropertyQCTasksDialog
})

Then('I validate that the Add Property QC Tasks dialog is displayed', async function () {
  await addPropertyQCTasksDialog.validateThatDialogIsDisplayed()
})

Then('I validate that the headers in the Add PropertyQA Tasks dialog for column containing index {string}', async function (columnIndex) {
  const filteredFormulaName = this.allFormulasInWKS.formulaNames.filter(name => name.includes(columnIndex))
  await addPropertyQCTasksDialog.validateAddPropertyQCTaskDialogHeaders(filteredFormulaName)
})
