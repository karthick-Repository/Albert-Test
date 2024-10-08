const { Before, Then } = require('@cucumber/cucumber')

let allocateInventoryDetails

Before(async function () {
  allocateInventoryDetails = await this.poManager.fetchTaskPage()
    .allocateInventoryDialog
})

Then('I validate the contents of the allocate inventory dialog', async function () {
  const verbatim = 'All Products/Formulas, Raw Materials, Consumables and Equipments used in this Property task are listed below. Selecting a lot and assigning inventory subtracts it from the items selected.'
  await allocateInventoryDetails.validateDialogHeader('Allocate Inventory and Assign Lot')
  await allocateInventoryDetails.validateDialogVerbatimText(verbatim)
  await allocateInventoryDetails.validateTableHeaders()
})

Then('I validate the inventories in the task against the inventories in the allocate inventory dialog', async function () {
  await allocateInventoryDetails.validateTheInventoriesInDialog(this.allFormulasInWKS)
})

Then('I validate that all columns in table {int} of allocate inventory dialog are disbaled except for 1 except for the Inventory Used column', async function (tableNumber) {
  await allocateInventoryDetails.validateDisabledColumnsInAllocateInventoryDialog(tableNumber)
})

Then('Enter the values {string} for inventories used in allocation pop-up', async function (inventoriesValues) {
  this.inventoryUsedValues = inventoriesValues.split(',')
  await allocateInventoryDetails.fillLotValueinAllocatePopup(this.inventoryUsedValues)
})

Then('I validate {string} message if no lots for formula in allocate inventory dialog', async function (expectedMessage) {
  let allocateInventoryLotText =this.page.getByRole('cell', { name: 'There are no lots in your location with Inventory.' }).first()
  await allocateInventoryDetails.assertionHandler.assertActualAndExpectedText(
    await allocateInventoryLotText,
    expectedMessage
  )
})

Then('I validate the inventory used values in the allocate inventory dialog', async function () {
  let allocateInventoryUsed = this.page.locator('app-allocate-inventory-block table tbody tr td:nth-of-type(5) input')
  await allocateInventoryDetails.assertionHandler.assertActualAndExpectedInputValues(await allocateInventoryUsed, this.inventoryUsedValues)
})