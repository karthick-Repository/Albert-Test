const { When, Then, Before } = require('@cucumber/cucumber')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When('I delete all the look up columns with IDs from {string} to {string}', async function (fromColID, toColID) {
  await wksPage.columnsModule.deleteAllLookUpColumns(fromColID, toColID)
})

When('I delete the look up column with ID {string}', async function (colID) {
  await wksPage.columnsModule.deleteSpecificLookUpColumn(colID)
})

When('I add the look up column {string} to the WKS by using column with {string}', async function (lookUpColumnToAdd, columnIDReference) {
  await wksPage.columnsModule.addThisLookUpColumnUsingReference(lookUpColumnToAdd, columnIDReference)
})

Then('I validate that all the look up columns have with column IDs between {string} to {string} have {string} as the menu options', async function (fromColID, toColID, expectedMenuOptions) {
  await wksPage.columnsModule.validateMenuOptionsForTheseColumns(fromColID, toColID, expectedMenuOptions)
})

When('I add all available look up columns to the worksheet to the left of the column with column ID {string} as reference', async function (referenceColumnID) {
  const defaultLookUpColumns = [' Alias ', ' Description ', ' Tags ', ' RSN ', ' RSNe ', ' IDH ']
  await wksPage.columnsModule.addAllLookUpColumnsFromThisColumn(referenceColumnID, defaultLookUpColumns)
})
