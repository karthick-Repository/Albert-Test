const { Before, Given, When, Then } = require('@cucumber/cucumber')

let ntbPage, tableModule

Before(async function () {
    ntbPage = await this.poManager.fetchNotebookPage()
    tableModule = await ntbPage.tableModule
})

When('The user adds {int} table and enters {int} values of length {int} into cells of the table {int} in the notebook', async function (numberOfTables, cellValuesToEnter, lenghtOfCellValues, tableInContext) {
    await tableModule.addTablesToNotebook(numberOfTables)
    this.tableValuesInNotebook = await tableModule.enterValuesIntoCells(tableInContext, cellValuesToEnter, lenghtOfCellValues, this.dataGenerator)
})