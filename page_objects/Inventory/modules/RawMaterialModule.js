const { expect } = require('@playwright/test')
const { InventoryPage } = require('../InventoryPage')

class RawMaterialModule extends InventoryPage {
  constructor (page) {
    super(page)
  }

  /**
   * Validates the contents of the Raw Material dialog.
   * @async
   * @returns {Promise<void>}
   */
  async validateRawMaterialDialogContents () {
    await this.validateCommonDialogContents()
    await this.validateSDSUpload()
  }

  /**
   * Creates a new Raw Material Inventory entry using pre-filled data.
   * The function will:
   * 1. Enter a generated name or use provided one.
   * 2. Select a manufacturer.
   * 3. Enter a description or use a default one.
   * 4. Click the 'Create' button.
   *
   * @async
   * @returns {Promise<Object>} An object containing the inventory name (`invName`), manufacturer (`manu`), and description (`desc`).
   */
  async createRawMaterialInventoryWithPreFilledData () {
    const name = await this.enterName()
    const manufacturer = await this.enterManufacturer()
    const description = await this.enterDescription()
    return {
      invName: name,
      manu: manufacturer,
      desc: description
    }
  }
}

module.exports = { RawMaterialModule }
