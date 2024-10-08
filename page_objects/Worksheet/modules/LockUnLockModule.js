const { expect } = require('@playwright/test')
const { AssertionHandler } = require('../../../utilities/AssertionHandler')

/**
 * Module to handle Lock and Unlock operations on in WKS.
 */
class LockUnLockModule {
  /**
   * Initializes a new instance of the LockUnLockModule class.
   * @param {object} page - The Playwright page instance.
   */
  constructor (page) {
    this.page = page
    this.lockProductFormula = page.getByText('Lock Product / Formula')
    this.unlockProductFormula = page.getByText('Unlock Product / Formula')
    this.lockBlankColumn = page.getByText('Lock')
    this.unlockBlankColumn = page.getByText('Unlock')
    this.lockMessage = page.getByText('This column is locked. Unlock to edit')
    this.gotItLink = page.getByText('Got it')
    this.assertionHandler = new AssertionHandler(this.page)
  }

  async isElementVisible (element) {
    try {
      await element.waitFor({ state: 'visible', timeout: 1000 })
      return true
    } catch {
      return false
    }
  }

  /**
   * Locks the column on the page.
   */
  async lockColumn () {
    let lockElement
    if (await this.isElementVisible(this.lockProductFormula)) {
      lockElement = this.lockProductFormula
    } else if (await this.isElementVisible(this.lockBlankColumn)) {
      lockElement = this.lockBlankColumn
    }

    if (lockElement) {
      await lockElement.waitFor({ state: 'visible', timeout: 1 * 1000 })
      await lockElement.click()
    }
  }

  /**
   * Unlocks the column on the page.
   */
  async unlockColumn () {
    let unlockElement
    if (await this.isElementVisible(this.unlockProductFormula)) {
      unlockElement = this.unlockProductFormula
    } else if (await this.isElementVisible(this.unlockBlankColumn)) {
      unlockElement = this.unlockBlankColumn
    }

    if (unlockElement) {
      await unlockElement.waitFor({ state: 'visible', timeout: 1 * 1000 })
      await unlockElement.click()
    }
  }

  /**
   * Validates the presence of a lock icon on a specified column header.
   * @param {string} colId - The ID of the column to validate.
   */
  async validateLockIconForColumn (colId) {
    const columnHeader = await this.page.locator(
      `[col-id='${colId}'] .headcell-name`
    )
    await columnHeader.waitFor({ state: 'visible', timeout: 3 * 1000 })
    const actualClassAttribute = await columnHeader.getAttribute('class')
    expect(actualClassAttribute.includes('locked')).toBeTruthy()
  }

  /**
   * Validates the presence of a lock icon on all cells within a specified column.
   * @param {string} colId - The ID of the column to validate.
   */
  async validateLockIconForAllCellsInLockedColumn (colId) {
    const columnCells = await this.page
      .locator(
        `[ref='eBodyViewport'] [col-id='${colId}'] ng-component div[class*='cell']`
      )
      .all()

    for (let index = 0; index < columnCells.length; index++) {
      const cellElement = columnCells[index]
      expect(
        await cellElement,
        `Cell at index ${index} in column ${colId} is not visible`
      ).toBeVisible()
      expect(
        await cellElement.getAttribute('class'),
        `Cell at index ${index} in column ${colId} does not have the expected class`
      ).toContain('lock-cell-click-overlay')
    }
  }

  async validateLockedMessageAllCellsInLockedColumn (colID) {
    const columnCells = await this.page
      .locator(
        `[ref='eBodyViewport'] [col-id='${colID}'] ng-component div[class*='cell']`
      )
      .all()

    for (let index = 0; index < columnCells.length; index++) {
      const cellElement = columnCells[index]
      await cellElement.click()
      expect(await this.lockMessage).toHaveCount(1)
      expect(await this.gotItLink).toHaveCount(1)
      expect(await this.lockMessage).toBeVisible()
      expect(await this.gotItLink).toBeVisible()
    }
  }
}

module.exports = { LockUnLockModule }
