const { InventoryPage } = require('../InventoryPage')

class ConsumableModule extends InventoryPage {
  constructor(page) {
    super(page)
  }    

  /**
   * Validates the contents of the Consumable dialog.
   * @async
   * @returns {Promise<void>}
   */
  async validateConsumableDialogContents() {
    await this.validateCommonDialogContents()
    await this.validateRadioButtons()
    await this.validateSDSUpload()
  }

  /**
   * Creates a new Consumable Inventory entry using pre-filled data.
   * The function will:
   * 1. Enter a generated name or use provided one.
   * 2. Select a manufacturer.
   * 3. Select the inventory tracking is in mass or units.
   * 4. Enter a description or use a default one.
   * 5. Click the 'Create' button.
   *
   * @async
   * @returns {Promise<Object>} An object containing the inventory name (`invName`), manufacturer (`manu`), inventorytracking (`invtrack`), and description (`desc`).
   */
  async createConsumableInventoryWithPreFilledData() {
    const name = await this.enterName()
    const manufacturer = await this.enterManufacturer()
    const inventorytracking = await this.selectInventoryUnit('Units')
    const description = await this.enterDescription()
    return {
      invName: name,
      manu: manufacturer,
      invtrack: inventorytracking,
      desc: description
    }
  }
}

module.exports = { ConsumableModule }
