const logger = require('../utilities/Logger')
const { expect } = require('@playwright/test')

class RowModule {
  constructor (page) {
    this.page = page
    this.rowInput = page.locator('blank-row-renderer input')
    this.ProductDesignRows = page.locator(
      "[ref='leftContainer'] div.cell-content"
    )
    this.appsGridPlusIcon = page.locator('#add_apps')
  }

  async addRowsToWKS (plusIconType, blankOrInventory) {
    switch (plusIconType) {
      case 'Product Design':
        await this.plusIcons.nth(1).click()
        break
      case 'Apps':
        await this.plusIcons.last().click()
        break
      default:
        throw new Error('Invalid plusIconType')
    }
    if (blankOrInventory === 'Blank') {
      await this.plusIconOptions.first().click()
    } else if (blankOrInventory === 'Inventory') {
      await this.plusIconOptions.last().click()
    } else {
      throw new Error('Invalid row type passed as an argument')
    }
  }

  async addBlankRows (numberOfBlankRows) {
    this.rowsAdded = []
    for (let i = 0; i < numberOfBlankRows; i++) {
      const rowName =
        'Test Automation Row ' + Math.floor(Math.random() * 99999 + 1)
      expect(await this.rowInput).toBeVisible()
      await this.rowInput.click()
      await this.page.waitForLoadState('domcontentloaded')
      await this.rowInput.type(rowName, { delay: 100 })
      logger.info(`Added blank row ${rowName} to WKS`)
      await this.rowInput.press('Enter')
      await this.page.waitForLoadState('domcontentloaded')
      this.rowsAdded.push(rowName)
    }
    await this.rowInput.press('Escape')
    await this.page.waitForTimeout(2000)
  }
}

module.exports = { RowModule }
