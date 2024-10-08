/* eslint-disable camelcase */
const { expect } = require('@playwright/test')
const { RowModule } = require('../modules/RowModule')
const { SearchModule } = require('../modules/SearchModule')
const { WebElementHandler } = require('../../../utilities/WebElementHandler')
const logger = require('../../../utilities/Logger')

class RowGroupModule {
  constructor (page) {
    this.page = page
    this.searchModule = new SearchModule(this.page)
    this.webElementHandler = new WebElementHandler(this.page)
    this.rowModule = new RowModule(this.page)
    this.groupRowsElement = page.locator('.group-rows')
    this.groupSelectionButton = this.groupRowsElement.locator(
      "[class*='btn btn-group']"
    )
    this.groupCheckCount = this.groupRowsElement.locator('div').first()
    this.rowCheckBoxes = page.locator(
      "[class='ag-pinned-left-cols-container'] [type='checkbox']"
    )
    this.groupNameInput = page.locator('[aria-label="Input Editor"]')
    this.wksSearch = page.locator("[placeholder='Search']")
    this.groupTreeIcon = page.locator('.ag-group-contracted .ag-icon')
  }

  async checkGroupRowsVisibility () {
    const groupButton = await this.groupSelectionButton
    await groupButton.waitFor({ state: 'visible', timeout: 30 * 1000 })
    expect(groupButton).toBeVisible()
  }

  async enterGroupName (groupName) {
    await this.webElementHandler.fillInput(await this.groupNameInput, groupName)
    if (groupName === ' ') {
      await this.webElementHandler.pressUsingKey(await this.groupNameInput, 'Tab')
    } else {
      await this.webElementHandler.pressUsingKey(await this.groupNameInput, 'Enter')
    }
  }

  async groupTheseRowsTogether (rowNumbers) {
    for (const element of rowNumbers) {
      const indexToNum = Number(element - 1)
      const checkboxToCheck = await this.rowCheckBoxes.nth(indexToNum)
      await this.webElementHandler.checkCheckbox(await checkboxToCheck)
    }
  }

  async unGroupTheseRows (rowNumbers) {
    for (const element of rowNumbers) {
      const indexToNum = Number(element - 1)
      await this.rowCheckBoxes.nth(indexToNum).uncheck()
    }
  }

  async clickOnGroupSelectionButton () {
    await this.groupSelectionButton.click()
  }

  async validateGroupedRowsCount (rowsGrouped) {
    expect(await this.groupCheckCount).toHaveText(rowsGrouped)
  }

  async expandGroupAtIndex (rowIndex) {
    const rowGroupTreeIcons = await this.groupTreeIcon
    const rowGroupTreeIcon = await rowGroupTreeIcons.nth(Number(rowIndex) - 1)
    // await rowGroupTreeIcon[rowIndex - 1].waitFor({state: 'visible', timeout: 10 * 1000});
    await this.webElementHandler.click(await rowGroupTreeIcon)
    logger.info(
      `Clicked the row group icon at index ${rowIndex} in the worksheet`
    )
  }

  async checkTheActiveRowStatus (rowIndex) {
    const activeRow = await this.page.locator(`row-index=${rowIndex}]`)
    await activeRow.waitFor({ state: 'visible', timeout: 10 * 1000 })
    const activeRow_Class = await activeRow.getAttribute('class')
    const activeRow_Style = await activeRow.getAttribute('style')
    expect(activeRow_Class).toContain('ag-row-focus ag-row-group-expanded')
    expect(activeRow_Style).toContain(
      'border-top: 1.5px solid rgb(0, 101, 222); border-bottom: 1.5px solid rgb(0, 101, 222);'
    )
  }

  /**
   * Asserts the checkbox status for specified rows.
   * @param {string} status - The expected status of the checkboxes ('checked' or other).
   * @param {string} rowIndexes - Comma-separated string of row indices.
   */
  async assertCheckboxStatusForRows (rowIndexes, status) {
    const rowIndexesToCheck = rowIndexes.split(',')
    for (const element of rowIndexesToCheck) {
      const indexToNum = Number(element) - 1
      if (isNaN(indexToNum)) {
        throw new Error(`Invalid row index: ${element}`)
      }

      if (status === 'checked') {
        await expect(this.rowCheckBoxes.nth(indexToNum)).toBeChecked()
      } else {
        await expect(this.rowCheckBoxes.nth(indexToNum)).not.toBeChecked()
      }
    }
  }
}

module.exports = { RowGroupModule }
