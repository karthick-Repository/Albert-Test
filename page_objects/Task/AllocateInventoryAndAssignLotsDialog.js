const { expect } = require('@playwright/test')
const { Dialog } = require('../Common/Dialog')

class AllocateInventoryAndAssignLotsDialog extends Dialog {
  constructor (page) {
    super(page)
    this.page = page
    // this.assertionHandler = new AssertionHandler(this.page)
    // this.webElementHandler = new WebElementHandler(this.page)
    this.allocateInventoryDialog = page.locator('app-allocate-inventory-block')
    this.allocateInventoryDialogHeading = page.locator('.allocatedHeadingText')
    this.allocateInventoryTextVerbatim = page.locator(
      '.p-dialog-content .allocatedetail'
    )
    this.assignLotsParent = page.locator('.allocatedPopupContentPadding')
    this.labelsInDialog = this.assignLotsParent
      .last()
      .locator('div.pn-subheading span')
    this.allocateInventoryTables = this.assignLotsParent.locator('table')
    this.allocateInventoryTableHeaders =
      this.allocateInventoryTables.locator('thead th')
    this.defaultInventoryTable = this.allocateInventoryTables.first()
    this.defaultInventoryTableRows = this.defaultInventoryTable.locator('tr')
  }

  async validateDialogHeader (expectedHeader) {
    await this.assertionHandler.assertActualAndExpectedText(
      await this.allocateInventoryDialogHeading,
      expectedHeader
    )
  }

  async validateDialogVerbatimText (expectedVerbatim) {
    await this.assertionHandler.assertActualAndExpectedText(
      await this.allocateInventoryTextVerbatim,
      expectedVerbatim
    )
  }

  async validateTableHeaders () {
    const tablesInDialog = await this.allocateInventoryTables.all()
    for (const table of tablesInDialog) {
      const tableHeaders = await table.locator('thead th')
      await this.assertionHandler.assertActualAndExpectedAllTexts(
        await tableHeaders,
        ['Inventory', 'Lot Number', 'Storage', 'On Hand', 'Inventory Used']
      )
    }
  }

  async fetchTableDetails (tableRows) {
    const inventoryDetails = []
    for (const row of tableRows) {
      const rowEntryToAdd = []
      const cellsInRow = await row.locator('td').all()
      for (const cell of cellsInRow) {
        rowEntryToAdd.push(await this.webElementHandler.getText(await cell))
      }
      inventoryDetails.push(rowEntryToAdd)
    }
    return inventoryDetails
  }

  async validateTheInventoriesInDialog (expectedInventories) {
    const actualInventories = []
    const defaultInventoryTableRows = await this.fetchTableDetails(await this.defaultInventoryTableRows.all())
    const firstColumnValues = defaultInventoryTableRows.map(row => row[0])
    firstColumnValues.shift()
    for (let i = 0; i < expectedInventories.formulaNames.length; i++) {
      const inventoryToBuild = expectedInventories.formulaNames[i]
      actualInventories.push(inventoryToBuild + inventoryToBuild)
    }
    await this.assertionHandler.assertObjects(actualInventories, firstColumnValues)
  }
}

module.exports = { AllocateInventoryAndAssignLotsDialog }
