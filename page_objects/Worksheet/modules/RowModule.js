const { AssertionHandler } = require('../../../utilities/AssertionHandler')
const { WebElementHandler } = require('../../../utilities/WebElementHandler')
const { expect } = require('@playwright/test')
const logger = require('../../../utilities/Logger')

class RowModule {
  constructor (page) {
    this.page = page
    this.webElementHandler = new WebElementHandler(this.page)
    this.assertionHandler = new AssertionHandler(this.page)
    this.plusIcons = page.locator("[class*='plus-icon']")
    this.rowInput = page.locator('[aria-label="Input Editor"]')
    this.ProductDesignRows = page.locator(
      "[ref='leftContainer'] div.cell-content"
    )
    this.rowHeaders = page.locator('.active-calc-row')
    this.rowActionIcons = page.locator(
      '.ag-pinned-left-cols-container .ag-row .edit-icon'
    )
    this.allRows = page.locator("[ref='leftContainer'] div.ag-row") // Locator added to fetch all rows from the WKS grid. DND
    this.allRowsInPDGrid = page.locator('add-row-menu-plugin-renderer .cell-content')
    this.allRowsByPluginRender = page.locator('add-row-menu-plugin-renderer')
    this.removeRowLink = page.getByText('Remove Row')
    this.confirmLink = page.getByText('Confirm')
    this.rowNameCells = page.locator("div[class*='ag-cell-wrapper']")
    this.rowDragHandles = page.locator('.ag-cell-wrapper .ag-drag-handle')
    this.advancedSearchButton = page.locator('#inventory-advanced-search-btn')
    this.advancedSearchContainer = page.locator(
      '#inventory-advanced-search-container'
    )
    this.advancedInventorySearchFullDetailDialog = page.locator(
      '.inventory-search-fulldetail'
    )
    this.advancedInventorySearchInput = this.advancedSearchContainer.locator(
      "input[placeholder='Search']"
    )
    this.advancedInventoryClose = this.page.locator(
      '.inventory-search-advanced-close'
    )
    this.appsGrid_Icon = page.locator('.APPS-ALBERT-GRID-SECTION')
    this.productDesignGridArrowIcon = page.locator('[row-index="0"] svg')
    this.appsGridAllRows = page.locator('[class*="cell-content pricing-cell"]')
    this.intermediateRows_Contracted_Icons = page.locator('[ref="eContracted"]')
    this.intermediateRows_Expanded_Icons = page.locator('[ref="eExpanded"]')
    this.intermediateRowExpand_Message = page.locator('.wks-full-block-loader')
    this.tippyBox = page.locator('.tippy-box')
    this.intermediateRowsIcons = page.locator('[class^="ag-group-contracted"]:not([aria-hidden="true"]) [class$="ag-icon-tree-closed"]')
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

  async checkPlusIconStatus (gridType, visibilityState) {
    let icon
    if (gridType === 'Product Design') {
      icon = await this.plusIcons.nth(1)
    } else if (gridType === 'Apps') {
      icon = await this.plusIcons.last()
    } else {
      throw new Error(`Unknown gridType: ${gridType}`)
    }

    if (visibilityState === 'not visible') {
      expect(await icon).not.toBeVisible()
    } else {
      expect(await icon).toBeVisible()
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

  async deleteBlankRowFromWKS (rowNumber) {
    const rowActionToClick = await this.rowActionIcons.all()
    await rowActionToClick[rowNumber - 1].click()
    await this.removeRowLink.click()
    await this.confirmLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async clickActionIconOfRowInLeftContainer (rowNumber) {
    const rowElement = await this.page.locator(`[row-index='${rowNumber}']`)
    const actionIconElement = await rowElement.locator('.edit-icon').first()
    await this.webElementHandler.click(await actionIconElement)
  }

  async clickBasedOnRowIndex (rowIndex) {
    const rowActionIcon = await this.page.locator(`[row-index=${rowIndex}] .cell-hover-btn`)
    await rowActionIcon.click()
  }

  async getCenterCoordinates (element) {
    const boundingBox = await element.boundingBox()
    if (!boundingBox) {
      throw new Error('Failed to get the bounding box of the element.')
    }
    return {
      x: await boundingBox.x + await boundingBox.width / 2,
      y: await boundingBox.y + await boundingBox.height / 2
    }
  }

  async moveRowsAcrossWKS (fromRowIndex, toRowIndex) {
    const fromRowHandle = await this.page.locator(
      `div:nth-child(${fromRowIndex}) > div > div > .ag-drag-handle >.ag-icon`
    )
    const toRowHandle = await this.page.locator(
      `div:nth-child(${toRowIndex}) > div > div > .ag-drag-handle >.ag-icon`
    )

    const fromCoords = await this.getCenterCoordinates(fromRowHandle)
    const toCoords = await this.getCenterCoordinates(toRowHandle)

    // Execute the drag and drop sequence
    await this.page.mouse.move(await fromCoords.x, await fromCoords.y)
    await this.page.mouse.down()
    await this.page.waitForTimeout(1000)
    await this.page.mouse.move(await toCoords.x, await toCoords.y)
    await this.page.waitForTimeout(1000)
    await this.page.mouse.up()
    await this.page.waitForTimeout(2000)
  }

  async clickInventoryAdvancedSearch () {
    await this.webElementHandler.click(await this.advancedSearchButton)
    await this.webElementHandler.waitForVisible(await await this.advancedInventorySearchFullDetailDialog)
  }

  /**
   * Adds multiple inventories in bulk based on the provided data.
   * This function iterates through each inventory item in the provided array,
   * searches for it using the advanced inventory search, and selects it.
   * It ensures that the advanced inventory search dialog is visible before and
   * after each search and selection.
   *
   * @param {Array<Object>} inventoryData - An array of inventory items to be added.
   * Each item should have an 'albertId' property.
   *
   * Usage example:
   * await addInventoriesInBulk([{ albertId: '123' }, { albertId: '456' }]);
   */
  async addInventoriesInBulk (inventoryData) {
    // Initial wait for the dialog to be visible
    await this.ensureDialogVisibility()

    for (const inventoryItem of inventoryData) {
      const inv = inventoryItem.albertId
      await this.searchAndSelectInventory(inv)
      await this.ensureDialogVisibility()
    }

    await this.advancedInventoryClose.click()
  }

  /**
   * Ensures the visibility of the advanced inventory search full detail dialog.
   * If the dialog is not visible, it triggers the clickInventoryAdvancedSearch
   * function to display the dialog. This function uses a timeout to wait for
   * the dialog's visibility and is used to handle dynamic UI elements that may
   * not be immediately visible.
   *
   * Usage example:
   * await ensureDialogVisibility();
   */
  async ensureDialogVisibility () {
    // Check if the dialog is visible, if not, call clickInventoryAdvancedSearch
    if (
      !(await this.advancedInventorySearchFullDetailDialog.isVisible({
        timeout: 5000
      }))
    ) {
      await this.clickInventoryAdvancedSearch()
    }
  }

  /**
   * Searches for and selects an inventory item based on its ID.
   * This function fills the advanced inventory search input with the provided
   * inventory ID, waits for the corresponding element to be visible, and then
   * clicks it. It handles UI updates and clears the search input after selection.
   *
   * @param {string} inventoryId - The ID of the inventory item to be searched and selected.
   *
   * Usage example:
   * await searchAndSelectInventory('123');
   */
  async searchAndSelectInventory (inventoryId) {
    await this.advancedInventorySearchInput.clear()
    await this.advancedInventorySearchInput.fill(inventoryId, { delay: 100 })
    await this.advancedInventorySearchInput.press('Enter')
    await this.page.waitForTimeout(1000)

    const toClick = await this.page
      .locator(`//span[text()=' ${inventoryId} ']`)
      .first()
    await toClick.waitFor({ state: 'visible', timeout: 60 * 1000 })
    await toClick.click()

    await this.page.waitForTimeout(500) // Wait briefly for any UI updates
    await this.page.waitForLoadState('domcontentloaded')
  }

  /**
   * Fetches row indexes from the UI elements.
   *
   * @async
   * @function fetchRowIndexes
   * @throws {Error} If there's an issue fetching the row indexes.
   * @returns {Promise<Array>} Resolves with an array of the row indexes.
   */
  async fetchRowIndexes () {
    await this.page.waitForTimeout(2000)
    const rowIndexes = await this.rowHeaders.allTextContents()
    logger.info(
      `The actual row indexes as fetched from the UI is : ${rowIndexes}`
    )
    return rowIndexes
  }

  /**
   * Deletes all data in the worksheet starting from a specified row and column.
   *
   * @async
   * @param {number} fromRowID - The starting row index from which data deletion will begin.
   * @param {string} fromColID - The column ID corresponding to the starting point of deletion.
   * @throws Will throw an error if the number of rows to process is invalid.
   */
  async deleteAllDataInTheWKS (fromRowID, fromColID) {
    try {
      const rowsCount = await this.allRows.count()
      let pressArrowDownCount = rowsCount - 2

      if (!Number.isFinite(pressArrowDownCount)) {
        throw new Error('Invalid row count.')
      }

      const deleteDataFrom = await this.page.locator(
        `[row-index='${fromRowID}'] [col-id='${fromColID}']`
      )
      await deleteDataFrom.click()
      await deleteDataFrom.press('Control+Shift+ArrowRight')

      while (pressArrowDownCount-- > 0) {
        await deleteDataFrom.press('Shift+ArrowDown')
      }

      await this.page.keyboard.press('Delete')
    } catch (error) {
      console.error('Error in deleteAllDataInTheWKS: ', error)
    }
  }

  /**
   * Fetches all rows in the worksheet and returns their names, excluding the last row.
   *
   * @async
   * @returns {Promise<Array<string>>} A promise that resolves to an array of trimmed row names.
   */
  async fetchAllRowsInTheWorksheet () {
    await this.page.waitForTimeout(1 * 1000)
    const allRowElements = await this.allRows.allTextContents()
    const trimmedRowTexts = allRowElements.map((text) => text.trim())
    trimmedRowTexts.pop()
    return trimmedRowTexts
  }

  /**
   * Checks if a specified row name exists in the provided worksheet rows.
   *
   * @async
   * @param {Array<string>} allRowsInWKS - An array of all row names in the worksheet.
   * @param {string} rowName - The name of the row to check for.
   * @throws Will assert failure if the row name is not found in the worksheet rows.
   */
  async checkThatThisRowExists (allRowsInWKS, rowName) {
    expect(allRowsInWKS).toContain(rowName)
  }

  async checkThatThisRowDoesNotExists (allRowsInWKS, rowName) {
    expect(allRowsInWKS).not.toContain(rowName)
  }

  async clickOnActionIcon (actionIconIndex) {
    await this.rowActionIcons.nth(actionIconIndex - 1).click()
  }

  async renameGroupTo (rowIndex, editedRowName) {
    await this.page.getByText('Edit Name').click()
    const allRows = await this.ProductDesignRows.all()
    const rowToRename = await allRows[rowIndex - 2]
    await rowToRename.press('Control' + 'A' + 'Delete')
    await rowToRename.fill(editedRowName, { delay: 100 })
    await rowToRename.press('Enter')
  }

  async fetchDefaultAppGridRows () {
    let appGridRows = []
    await this.page.waitForTimeout(1000)
    appGridRows = await this.webElementHandler.getAllTexts(await this.appsGridAllRows)
    return appGridRows
  }

  async fetchDesignIDsAndConstructEndpoint (apiUtil, sheetNumber, albertId, jwtToken) {
    const endpoint = `api/v3/worksheet/?type=project&id=${albertId}`
    const response = await apiUtil.getAPI(endpoint, jwtToken)
    const designIDsFetchedFromBE = response.Sheets.flatMap(sheet => sheet.Designs.map(design => design.albertId))
      .reduce((acc, id, i, arr) => i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc, [])
    return `api/v3/worksheet/design/${designIDsFetchedFromBE[sheetNumber - 1]}/rows`
  }

  async addBlankRowsToSheetFromBE (apiUtil, numberOfBlankRows, sheetNumber, albertId, jwtToken) {
    const blankRowsAddedToSheets = []
    const randomBlankRowPayLoad = this.dataGenerator.generateRandomBlankRowData(numberOfBlankRows)
    const endPoint = await this.fetchDesignIDsAndConstructEndpoint(sheetNumber, albertId, jwtToken)
    for (let i = 0; i < numberOfBlankRows; i++) {
      const response = await apiUtil.postAPI(endPoint, randomBlankRowPayLoad[i], await this.jwtToken)
      blankRowsAddedToSheets.push(...response.map(row => row.name))
    }
    return blankRowsAddedToSheets
  }

  async addInventoryRowsToSheetFromBE (apiUtil, numberOfInventoryRows, inventoryType, sheetNumber, albertId, jwtToken) {
    const inventoryRowsAddedToSheets = []
    const endPoint = await this.fetchDesignIDsAndConstructEndpoint(sheetNumber, albertId, jwtToken)
    const randomInventoryRowPayload = await this.dataGenerator.generateRandomInventoryRowData(numberOfInventoryRows, inventoryType, jwtToken)
    const response = await apiUtil.postAPI(endPoint, randomInventoryRowPayload, jwtToken)
    inventoryRowsAddedToSheets.push(...response.map(row => row.name))
    return inventoryRowsAddedToSheets
  }

  async addAllLookUpRowsToAppsGrid () {
    const defaultLookUpRows = ['Description', 'Alias']
    const appsGridPlusIcon = await this.plusIcons.last()
    for (const lookUpRow of defaultLookUpRows) {
      await this.webElementHandler.click(appsGridPlusIcon)
      const addALookUpRowElement = await this.page.getByText('Add a Lookup Row')
      await this.webElementHandler.click(addALookUpRowElement)
      const lookUpRowsOptions = await this.tippyBox.last().locator('a')
      await this.webElementHandler.click(lookUpRowsOptions.nth(0))
    }
  }

  async deleteLookupRowsAtIndexes (indexes) {
    const rowIndexes = indexes.split(',').map(Number)
    for (const num of rowIndexes) {
      await this.clickActionIconOfRowInLeftContainer(num)
      const removeRowElement = await this.page.getByText('Remove Row')
      await this.webElementHandler.click(removeRowElement)
      const expectedMessageElement = await this.tippyBox.locator('span.text-dark')
      await this.assertionHandler.assertActualAndExpectedText(expectedMessageElement, 'Are you sure you want to remove this  row? You can add it back at any time.')
      const removeLink = await this.page.getByText('Remove', { exact: true }).first()
      await this.webElementHandler.click(removeLink)
      await this.page.waitForTimeout(1000)
    }
  }

  async deleteBlankRowsFromWKS (rowNumber) {
    const rowIndexes = rowNumber.split(',').map(Number)
    for (const num of rowIndexes) {
      await this.clickActionIconOfRowInLeftContainer(num)
      const removeRowElement = await this.page.getByText('Remove Row')
      await this.webElementHandler.click(removeRowElement)
      const expectedMessageElement = await this.tippyBox.locator('span.text-dark')
      await this.assertionHandler.assertActualAndExpectedText(expectedMessageElement, 'This is an empty Row. Are you sure?')
      const removeLink = await this.page.getByText('Confirm', { exact: true }).first()
      await this.webElementHandler.click(removeLink)
      await this.page.waitForTimeout(1000)
    }
  }

  /**
 * Deletes rows based on the given indexes, confirmation message, and confirmation button text.
 * @param {string | number[]} indexes - The indexes of the rows to delete, either as a comma-separated string or an array of numbers.
 * @param {string} confirmationMessage - The message displayed when a row is about to be removed.
 * @param {string} confirmationButtonText - The text of the button to confirm row removal.
 */
  async deleteRowsByIndexes (indexes, confirmationMessage, confirmationButtonText) {
    const rowIndexes = typeof indexes === 'string' ? indexes.split(',').map(Number) : indexes

    for (const num of rowIndexes) {
      await this.clickActionIconOfRowInLeftContainer(num)
      const removeRowElement = await this.page.getByText('Remove Row')
      await this.webElementHandler.click(removeRowElement)

      const expectedMessageElement = await this.tippyBox.locator('span.text-dark')
      await this.assertionHandler.assertActualAndExpectedText(expectedMessageElement, confirmationMessage)

      const removeLink = await this.page.getByText(confirmationButtonText, { exact: true }).first()
      await this.webElementHandler.click(removeLink)

      await this.page.waitForTimeout(1000)
    }
  }
}

module.exports = { RowModule }
