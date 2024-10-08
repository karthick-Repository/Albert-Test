const { When, Then, Before } = require('@cucumber/cucumber')

let wksPage, cellFormattingModule

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
  cellFormattingModule = await wksPage.cellFormattingModule
})

When('I format the cells between columns with aria-indexes {int} and {int} and in rows with aria-indexes between {int} and {int} with {string}', async function (fromColumn, toColumn, fromRow, toRow, textFormatOptions) {
  await cellFormattingModule.applyTextFormatOptions(fromColumn, toColumn, fromRow, toRow, textFormatOptions)
})

Then('I validate that the cells between columns with aria-indexes {int} and {int} and in rows with aria-indexes between {int} and {int} have the {string} attributes {string}', async function (fromCol, toCol, fromRow, toRow, attributeToCheck, attributeValueToCheck) {
  await cellFormattingModule.validateFormatsApplied(fromCol, toCol, fromRow, toRow, attributeToCheck, attributeValueToCheck)
})

When('I {string} the decimal value by {int} between columns with aria-indexes {int} and {int} and in rows with row-indexes between {int} and {int}', async function (increaseOrDecrease, increaseOrDecreaseBy, fromColumn, toColumn, fromRow, toRow) {
  await cellFormattingModule.increaseDecreaseDecimals(increaseOrDecrease, increaseOrDecreaseBy, fromColumn, toColumn, fromRow, toRow)
})

When('I format the cells with the following details:', async function (dataTable) {
  const actions = dataTable.hashes()

  for (const action of actions) {
    const fromColumn = parseInt(action.fromColumn)
    const toColumn = parseInt(action.toColumn)
    const fromRow = parseInt(action.fromRow)
    const toRow = parseInt(action.toRow)
    const backgroundColor = action.backgroundColor
    await cellFormattingModule.applyBackGroundColorFormatting(fromRow, toRow, fromColumn, toColumn, backgroundColor)
  }
})

Then('I validate that the cells have the following attributes:', async function (dataTable) {
  const attributes = dataTable.hashes()

  for (const attribute of attributes) {
    const fromCol = parseInt(attribute.fromColumn)
    const toCol = parseInt(attribute.toColumn)
    const fromRow = parseInt(attribute.fromRow)
    const toRow = parseInt(attribute.toRow)
    const attributeToCheck = attribute.attributeToCheck
    const attributeValueToCheck = attribute.attributeValueToCheck
    await cellFormattingModule.validateFormatsApplied(fromCol, toCol, fromRow, toRow, attributeToCheck, attributeValueToCheck)
  }
})
