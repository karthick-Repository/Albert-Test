const { expect } = require('@playwright/test')
const { getEnvironmentURL } = require('../../utilities/EnvironmentHelper')
const { NormalizeModule } = require('./modules/NormalizeModule')
const { ColumnsModule } = require('./modules/ColumnsModule')
const { CopyToNewModule } = require('./modules/CopyToNewModule')
const { RowModule } = require('./modules/RowModule')
const { RowGroupModule } = require('./modules/RowGroupModule')
const { FilterWKSModule } = require('./modules/FilterWKSModule')
const { CopyFromExistingModule } = require('./modules/CopyFromExistingModule')
const { LockUnLockModule } = require('./modules/LockUnLockModule')
const { SearchModule } = require('./modules/SearchModule')
const { BasePage } = require('../Common/BasePage')
const { SheetsModule } = require('./modules/Sheets/SheetsModule')
const logger = require('../../utilities/Logger')
const { CalculationHighlightsModule } = require('./modules/CalculationHighlightsModule')

class WorksheetPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.wksURLRegEx = '**/worksheet/**'
    this.leftPanelHomeIcon = page.locator('[ptooltip="Home"] svg')
    this.leftPanelWorksheetIcon = page.locator('[ptooltip="Worksheet"] svg')
    this.normalizeModule = new NormalizeModule(this.page)
    this.columnsModule = new ColumnsModule(this.page)
    this.copyToNewModule = new CopyToNewModule(this.page)
    this.rowModule = new RowModule(this.page)
    this.rowGroupModule = new RowGroupModule(this.page)
    this.filterModule = new FilterWKSModule(this.page)
    this.lockUnlockModule = new LockUnLockModule(this.page)
    this.searchModule = new SearchModule(this.page)
    this.copyFromExistingModule = new CopyFromExistingModule(this.page)
    this.sheetsModule = new SheetsModule(this.page)
    this.calculationHighlightsModule = new CalculationHighlightsModule(this.page)
    this.envURL = getEnvironmentURL() + 'projects'

    // Locators of WKS UI Elements
    this.defaultColumns = page.locator("[class='header-cell-space']")
    this.defaultRows = page.locator('.ag-full-width-container .heading3')
    this.headers = page.locator('.ag-header-cell')
    this.details = this.headers.nth(4)
    this.rowsBelowApps = page.locator(
      '.ag-pinned-left-cols-container div .cell-content'
    )
    this.worksheetGrid = page.locator("[ref='gridBody'] .ag-header")
    this.plusIcons = page.locator("[class*='plus-icon']")
    this.plusIconOptions = page.locator('.formula-addrow-dropdown a')

    this.rowInput = page.locator('[aria-label="Input Editor"]')
    this.ProductDesignRows = page.locator(
      "[ref='leftContainer'] div.cell-content"
    )
    this.leftContainer = page.locator("[ref='leftContainer']")
    this.rowEllipses = page.locator(
      "[ref='leftContainer'] div.add-row div span"
    )
    this.allRows = page.locator("[ref='leftContainer'] div.ag-row") // Locator added to fetch all rows from the WKS grid. DND

    this.inventorySearch = page.locator('#inventory-search-query')
    this.advancedSearch = page.locator('#inventory-advanced-search-btn')
    this.inventorySearchFilters = page.locator('.inventory-search-filter a')

    this.detailsCell = page.locator(
      "[ref='centerContainer'] .ag-row div:nth-of-type(3)"
    )
    this.detailsCellInput = page.locator("[ref='eInput']")

    this.rowGroupsInWKS = page.locator(
      "[class*='ag-row-group ag-row-group-indent-'] div.cell-content"
    )
    this.rowsInGroup = page.locator(
      '.ag-row-group-indent-2 div:nth-of-type(3)'
    )
    this.groupSelectionButton = page.getByRole('button', {
      name: 'Group SELECTION'
    })
    this.groupNameInput = page.locator("[id*='cell'] input[type='text']")

    this.cellDetailsLeftPane = page.locator(
      "[ref='leftContainer'] [col-id='COL4'] div span"
    )
    this.cellDetailsInput = page.locator("[ref='eInput']")

    this.columnNameInput = page.locator('.search-input')
    this.columnNames = page.locator(
      ".ag-header-viewport [class='cell-content cursor-text']"
    )

    this.rightPanelCells = page.locator(
      "div[ref='eContainer'] div[col-id*='COL']"
    )
    this.leftPanelCells = page.locator(
      "div[ref='leftContainer'] div[col-id*='COL4']"
    )
    this.leftPaneDetailCellInput = page.locator(
      "div[col-id*='COL4'] [ref='eInput']"
    )
    this.rowDeleteMessage_First = page
      .locator('.dropdown-confirm-popover span')
      .first()
    this.rowDeleteMessage_Last = page
      .locator('.dropdown-confirm-popover span')
      .last()
    this.removeRow = page.locator('.formula-addrow-dropdown a').last()
    this.wksSearch = page.locator('.wks-search-input')
    this.wksLoader = page.locator('.ag-grid-loader')
    this.productGridPlusIcon = page.locator('#add_product_design')
    this.appGridPlusIcon = page.locator('#add_apps')
    this.messageCloseImg = page.locator(
      "[class*='mat-icon-no-color ng-star-inserted']"
    )
    this.wksGrid = page.locator('[ref="gridBody"] .ag-header')
  }

  async gotoWorksheetpage (projectID) {
    await this.gotoPage(`${this.envURL}/${projectID}/worksheet/`)
    await this.checkLazyLoader()
    await this.waitForURL(this.wksURLRegEx)
    await this.webElementHandler.waitForVisible(await this.productGridPlusIcon)
  }

  async reloadPage () {
    await this.page.reload()
  }

  async gotoExistingWorksheet (string) {
    await this.page.goto(
      `${this.envURL}/${string}/worksheet/`,
      { timeout: 240 * 1000 }
    )
  }

  async waitForSearchBox () {
    await this.page.waitForSelector('.inventory-search-input-group', {
      timeout: 30000
    })
  }

  async isInWKSPage () {
    await this.waitForURL(this.wksURLRegEx)
    await this.page.waitForLoadState('domcontentloaded')
    await this.webElementHandler.waitForVisible(await this.wksGrid)
  }

  async fetchDefaultColumns () {
    await this.page.waitForTimeout(1000)
    this.defaultValues = await this.defaultColumns.allTextContents()
    await this.page.waitForTimeout(1000)
    this.trimmedValues = this.defaultValues.map((column) => column.trim())
    logger.info(
      `Columns as fetched from the WKS page are ${this.trimmedValues}`
    )
    return this.trimmedValues
  }

  async validateDefaultColumns (projectID) {
    this.expected = ['Name', 'Inventory ID', 'Manufacturer', 'Details']
    this.expected.push(projectID + '-001 ' + projectID + '-001')
    expect(await this.fetchDefaultColumns()).toEqual(this.expected)
  }

  async fetchDefaultRows () {
    this.defaultValues = await this.defaultRows.allTextContents()
    this.trimmedValues = this.defaultValues.map((row) => row.trim())
    logger.info(`Rows as fetched from the WKS page are ${this.trimmedValues}`)
    return this.trimmedValues
  }

  async validateDefaultRows () {
    this.expected = ['Product Design', 'Results', 'Apps']
    expect(await this.fetchDefaultRows()).toEqual(this.expected)
  }

  async clickFocusToView_DetailsColumn () {
    const clickToFocusView = await this.details.locator('a').first()
    await clickToFocusView.click()
  }

  async fetchChildRowsAfterExpandingApps () {
    await this.page.waitForTimeout(1000)
    await this.clickFocusToView_DetailsColumn()
    this.defaultValues = await this.rowsBelowApps.allTextContents()
    this.trimmedValues = this.defaultValues.map((row) => row.trim())
    logger.info(
      `Child rows under Apps as fetched from WKS are : ${this.trimmedValues}`
    )
    return this.trimmedValues
  }

  async validateAppsChildRows () {
    this.expected = [
      'Tags',
      'Pricing',
      'Average',
      'Predecessor',
      'Batches',
      'Purpose',
      'Result'
    ]
    expect(await this.fetchChildRowsAfterExpandingApps()).toEqual(
      this.expected
    )
  }

  async collapseDetailsColumnAndValidateRows () {
    await this.clickFocusToView_DetailsColumn()
    await this.page.waitForLoadState('domcontentloaded')
    await this.validateDefaultRows()
  }

  async fetchRowsAfterClickToFocusViewInDefaultFormula () {
    await this.headers.last().locator('a').nth(2).click()
    await this.page.waitForLoadState('load')
    this.defaultValues = this.fetchChildRowsAfterExpandingApps()
    this.trimmedValues = rowsFetched.map((row) => row.trim())
    return this.trimmedValues
  }

  async validateRowsAfterClickToFocusViewInDefaultFormula () {
    this.expected = ['Inventory Total', 'Pricing', 'Predecessor']
    expect(await this.fetchChildRowsAfterExpandingApps()).toEqual(
      this.expected
    )
  }

  async validateTotalNumberOfDefaultPlusIconsInWKS () {
    expect(await this.plusIcons).toHaveCount(3)
  }

  async validatePlusIconOptions (plusIconType) {
    switch (plusIconType) {
      case 'Product Design':
        this.expected = ['Add a Blank Row', 'Add an Inventory Row']
        await this.plusIcons.nth(1).click()
        break
      case 'Apps':
        this.expected = ['Add a Blank Row']
        await this.plusIcons.last().click()
        break
      case 'Formula':
        this.expected = [
          'Add a Blank Column',
          'Add a Product / Formula Column'
        ]
        await this.plusIcons.first().click()
        break
      default:
        throw new Error('Invalid plusIconType')
    }

    this.defaultValues = await this.plusIconOptions.allTextContents()
    this.trimmedValues = this.defaultValues.map((row) => row.trim())
    expect(await this.trimmedValues).toEqual(this.expected)
  }

  /**
   * Adds rows to a worksheet based on the specified icon type and row category.
   *
   * This function handles dynamic UI elements by clicking a specified plus icon
   * and then selecting an option from the resulting options. It includes a retry
   * mechanism to handle cases where UI elements may not render immediately or
   * consistently. The function attempts to click the plus icon and verify the
   * visibility of the option up to a maximum number of attempts.
   *
   * @param {string} plusIconType - Specifies the type of plus icon to click. Accepts
   *                                "Product Design" or other values to determine
   *                                which plus icon to interact with.
   * @param {string} blankOrInventory - Determines the category of the row to add.
   *                                    Accepts "Blank" or other values to select
   *                                    the appropriate option after clicking the plus icon.
   *
   * @throws Will throw an error if the plusIconOption is not visible after the specified
   *         number of attempts.
   *
   * Usage example:
   *    await addRowsToWKS("Product Design", "Blank");
   *
   * Note: This function assumes that `this.page` is a Playwright Page object and
   *       `this.productGridPlusIcon`, `this.appGridPlusIcon`, and `this.plusIconOptions`
   *       are appropriate selectors within the context of the page.
   */
  async addRowsToWKS (plusIconType, blankOrInventory) {
    await this.page.waitForTimeout(2000) // Initial wait for any page loading

    const plusIcon =
      plusIconType === 'Product Design'
        ? this.productGridPlusIcon
        : this.appGridPlusIcon
    const plusIconOption =
      blankOrInventory === 'Blank'
        ? this.plusIconOptions.first()
        : this.plusIconOptions.last()

    const clickPlusIconAndCheckOption = async (maxAttempts) => {
      await this.page.waitForTimeout(1 * 1000)
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        logger.info(`Attempt ${attempt} to click plus icon and check option.`)
        await plusIcon.click()
        try {
          await plusIconOption.waitFor({ state: 'visible', timeout: 3 * 1000 })
          return true
        } catch {
          if (attempt === maxAttempts) {
            throw new Error(
              `plusIconOption not visible after ${maxAttempts} attempts`
            )
          }
          await this.page.waitForTimeout(1000)
        }
      }
    }

    if (await clickPlusIconAndCheckOption(3)) {
      await plusIconOption.click() // Click the option once it becomes visible
    }
  }

  /**
   * Adds a specified number of blank rows to the current page.
   *
   * @param {number} numberOfBlankRows - The number of blank rows to add.
   * @returns {Array<string>} An array of names of the rows added.
   *
   * @throws {Error} If the row input element is not visible.
   *
   * @example
   * const rows = await addBlankRows(5);
   * logger.info(rows); // ["Test Automation Row 12345", ...]
   */
  async addBlankRows (numberOfBlankRows) {
    const rowsAdded = []
    const rowInput = await this.rowInput
    for (let i = 0; i < numberOfBlankRows; i++) {
      const rowName =
        'Test Automation Row ' + Math.floor(Math.random() * 99999 + 1)
      await this.webElementHandler.fillInputWithType(await rowInput, rowName)
      await this.webElementHandler.pressUsingKey(await rowInput, 'Enter')
      await this.page.waitForLoadState('domcontentloaded')
      await this.waitForDuration(1)
      logger.info(`Added blank row ${rowName} to WKS`)
      rowsAdded.push(rowName)
    }
    await this.webElementHandler.pressUsingKey(await rowInput, 'Escape')
    return rowsAdded
  }

  async fetchAddedRowsFromWKS () {
    this.defaultValues = await this.ProductDesignRows.allTextContents()
    this.trimmedValues = this.defaultValues.map((pdRow) => pdRow.trim())
    this.trimmedValues = this.trimmedValues.filter(
      (value) => !value.includes('Inventory Total')
    )
    logger.info(`The rows as fetched from the UI are : ${this.trimmedValues}`)
    return this.trimmedValues
  }

  async validateRows (addedRows) {
    logger.info(`Expected rows are : ${addedRows}`)
    expect(await this.fetchAddedRowsFromWKS()).toEqual(addedRows)
  }

  async validateInventorySearchUI () {
    await expect(
      this.inventorySearch,
      'The inventory search input is not displayed'
    ).toBeVisible()
    const advancedSearchText = await this.advancedSearch.textContent()
    expect(
      advancedSearchText.trim(),
      'The advanced search button text does not match with the expected'
    ).toContain('Advanced Search')
    this.expected = ['All', 'Raw Materials', 'Consumables', 'Products']
    this.defaultValues = await this.inventorySearchFilters.allTextContents()
    this.trimmedValues = this.defaultValues.map((invTypes) => invTypes.trim())
    expect(
      this.expected,
      'The inventory types displayed in the inventory seach control is not right'
    ).toEqual(this.trimmedValues)
  }

  async addInventoryRows (inventoryData) {
    const rowsAdded = []
    for (let i = 0; i <= inventoryData.length - 1; i++) {
      const inv = inventoryData[i].albertId
      // if (process.env.EXECUTION_ENVIRONMENT === "staging" && i === 0) {
      //   await this.page.waitForTimeout(3 * 1000);
      // } else {
      //   await this.page.waitForTimeout(1 * 1000);
      // }
      // await this.page.waitForLoadState("domcontentloaded");
      await this.page
        .locator('inventory-list')
        .first()
        .waitFor({ state: 'visible', timeout: 10 * 2 * 6000 })
      await this.webElementHandler.type('#inventory-search-query', inv, {
        delay: 100
      })
      await this.webElementHandler.click(`//span[text()=" ${inv} "]`)
      rowsAdded.push(inv)
    }
    await this.inventorySearch.press('Escape')
    await this.page.waitForLoadState('domcontentloaded')
    return rowsAdded
  }

  async addDetailCellValues (numberOfValues) {}

  async enterGroupName () {
    this.groupNames = []
  }

  async groupRows (rowsToGroupTogether) {
    const groupNames = [] // Array variable to collect all the row groups created
    const rowElements = await this.allRows
    const rowsInWKS = await this.fetchAddedRowsFromWKS()
    for (let i = 0; i <= rowsToGroupTogether.length - 1; i++) {
      for (let j = 0; j <= rowsInWKS.length - 1; j++) {
        if (rowsToGroupTogether[i] === rowsInWKS[j]) {
          const checkbox = await rowElements
            .nth(j)
            .locator('.ag-group-checkbox input')
          await checkbox.check()
          break
        }
      }
    }

    await this.groupSelectionButton.click()
    const groupName =
      'Test Automation Group ' +
      (Math.floor(Math.random() * 99999) + 1).toString()
    await this.groupNameInput.type(groupName, { delay: 70 })
    groupNames.push(groupName) // Array of all the row groups created
    await this.groupNameInput.press('Enter')
    return groupNames
  }

  async fetchWKSGroups () {
    const rowGroups = await this.rowGroupsInWKS.allTextContents()
    const trimmedRowGroups = rowGroups.map((group) => group.trim())
    logger.info(`Row groups as fetched from the WKS are : ${trimmedRowGroups}`)
    return trimmedRowGroups
  }

  async validateWKSGroups (expectedRowGroups) {
    logger.info(`Expected Row Groups are : ${expectedRowGroups}`)
    expect(await this.fetchWKSGroups()).toEqual(expectedRowGroups)
  }

  async fetchGroupedRows () {
    try {
      const rowGroups = await this.rowGroupsInWKS // Make sure rowGroupsInWKS returns an array
      if (!Array.isArray(rowGroups)) {
        throw new Error('rowGroupsInWKS should return an array of row groups')
      }

      return await Promise.all(
        rowGroups.map(async (rowGroup) => {
          await rowGroup.click()
          const defaultValues = await this.rowsInGroup.allTextContents()
          const trimmedValues = defaultValues.map((groupedRows) =>
            groupedRows.trim()
          )
          await rowGroup.click()
          return trimmedValues
        })
      )
    } catch (error) {
      console.error('An error occurred:', error)
      throw error // Rethrow the error for the caller to handle
    }
  }

  async validateAddedRowGroups () {
    expect(await this.fetchGroupedRows()).toEqual(this.groupNames)
  }

  getRandomColumnName (prefix) {
    return `${prefix} - ${Math.floor(Math.random() * 99999 + 1)}`
  }

  async addColumnsToWKS (numberOfColumns, typeOfColumn) {
    const columnNames = []
    let plusElement
    await this.page.locator('#pinnedPlusDropdown').getByRole('img').click()
    if (typeOfColumn === 'blank') {
      plusElement = await this.plusIconOptions.first()
      await plusElement.waitFor({ state: 'attached', timeout: 10 * 1000 })
      await plusElement.click()
    } else {
      plusElement = await this.plusIconOptions.last()
      await plusElement.waitFor({ state: 'attached', timeout: 10 * 1000 })
      await plusElement.click()
    }
    for (let i = 0; i < numberOfColumns; i++) {
      const columnName = this.getRandomColumnName(
        typeOfColumn === 'blank' ? 'BC' : 'PC'
      )
      await this.columnNameInput.type(columnName, { delay: 100 })
      await this.columnNameInput.press('Enter')
      columnNames.push(columnName)
    }

    await this.columnNameInput.press('Escape')
    return columnNames
  }

  async enterColumnName (colName) {
    await this.webElementHandler.fillInputWithType(await this.columnNameInput, colName)
    await this.webElementHandler.pressUsingKey(await this.columnNameInput, 'Enter')
    await this.webElementHandler.click(await this.wksSearch)
  }

  async validateObjects (actualColumns, expectedColumns) {
    expect(actualColumns, ' Actual does not match with Expected').toMatchObject(
      expectedColumns
    )
  }

  /**
   * Asynchronously adds details to cells within a specified panel.
   *
   * @async
   * @param {string} panel - The panel to which details will be added ("left" or "right").
   * @param {string} actionType - The type of action to perform ("edit" or any other string for default behavior).
   * @returns {Promise<number[]>} - A promise that resolves to an array of entered cell values.
   */
  async addCellDetails (panel, actionType, valuesToEnter) {
    let panelCells = []
    // Fetch the appropriate panel cells

    if (panel === 'left') {
      panelCells = await this.leftPanelCells.all()
    } else {
      panelCells = await this.rightPanelCells.all()
    }
    panelCells.pop()

    // Perform cell modifications
    return await this.enterCellValues(
      panelCells,
      actionType,
      valuesToEnter
    )
  }

  /**
   * Asynchronously enters random values into the specified cells.
   *
   * @async
   * @param {Array} cells - The cells into which random values will be entered.
   * @param {string} actionType - The type of action to perform ("edit" or any other string for default behavior).
   * @returns {Promise<number[]>} - A promise that resolves to an array of the random values entered.
   */
  async enterCellValues (cells, actionType, valuesToEnter) {
    const enteredValues = []

    for (const element of cells) {
      const cell = await element

      // Clear the cell if the actionType is "edit"
      if (actionType === 'edit') {
        await cell.dblclick()
        await this.leftPaneDetailCellInput.clear()
      } else {
        await cell.dblclick()
      }

      let valueToEnter

      // Check if valuesToEnter is defined and not empty
      if (typeof valuesToEnter !== 'undefined' && valuesToEnter.length > 0) {
        // Use the provided value
        valueToEnter = valuesToEnter.shift()
      } else {
        // Generate a random value
        valueToEnter = Math.floor(Math.random() * 99999 + 1)
      }

      await this.leftPaneDetailCellInput.type(valueToEnter.toString(), {
        delay: 50
      })
      await this.leftPaneDetailCellInput.press('Enter')

      // Store the entered value
      enteredValues.push(valueToEnter)
    }

    return enteredValues
  }

  /**
   * Asynchronously edits the names of all rows in the table, appending '_Edited' to each.
   *
   * @async
   * @returns {Promise<string[]>} A promise that resolves to an array of the new row names.
   * @throws {Error} Propagates any errors that occur during the operation to the caller.
   *
   */
  async editRowNames () {
    // Fetch the ellipses and existing row names
    const rowEllipses = await this.rowEllipses
    const initialRowNames = (
      await this.ProductDesignRows.allTextContents()
    ).map((value) => value.trim())

    // Drop Inventory Total from the fetched data
    const rowsToEdit = initialRowNames.slice(0, -1)

    // Iterate over each row to edit its name
    for (let i = 0; i < rowsToEdit.length; i++) {
      const currentRowName = rowsToEdit[i]
      await rowEllipses.nth(i).click()
      await this.page.getByText('Edit Name').click()

      const newName = `${currentRowName}_Edited`
      await this.ProductDesignRows.nth(i).type(newName, { delay: 100 })
      await this.ProductDesignRows.nth(i).press('Enter')
    }

    // Wait for all edits to apply
    await this.page.waitForTimeout(2000)

    // Return the new names
    return rowsToEdit.map((row) => `${row}_Edited`)
  }

  /**
   * Asynchronously deletes a specified number of rows from the table.
   * Rows are randomly selected for deletion.
   *
   * @async
   * @param {number} numberOfRowsToDelete - The number of rows to delete.
   * @param {string} rowType - Type of the row ("blank" or other types).
   * @param {boolean} withData - Whether the row has data or not.
   * @returns {Promise<number[]>} - A promise that resolves to an array of the deleted row indices, sorted in descending order.
   * @throws {Error} Throws an error if the number of rows to delete exceeds the total number of available rows.
   */
  async deleteRows (numberOfRowsToDelete, rowType, withData) {
    // Fetch the ellipsis for rows and count the total number of rows
    const rowEllipses = await this.rowEllipses.all()
    rowEllipses.pop()
    const totalRowCount = rowEllipses.length

    // Validate the number of rows to delete
    if (numberOfRowsToDelete > totalRowCount) {
      throw new Error(
        'Number of rows to delete exceeds the total number of available rows'
      )
    }

    // Generate random unique indices for deletion
    const uniqueRandomIndices = new Set()
    while (uniqueRandomIndices.size < numberOfRowsToDelete) {
      const randomIndex = Math.floor(Math.random() * totalRowCount)
      uniqueRandomIndices.add(randomIndex)
    }

    // Initialize an empty array to store indices that will actually get deleted
    const actualDeletedIndices = []

    /**
     * Helper function to check row deletion messages.
     *
     * @param {string} firstMessage - The message expected in rowDeleteMessage_First.
     * @param {string} expectedLastMessage - The message expected in rowDeleteMessage_Last.
     * @returns {Promise<string>} - The actual last message that appeared.
     */
    const checkRowTypeAndData = async (firstMessage, expectedLastMessage) => {
      await expect(await this.rowDeleteMessage_First).toContainText(
        firstMessage
      )
      const lastMessage = await this.rowDeleteMessage_Last
      await expect(lastMessage).toContainText(expectedLastMessage)
      return lastMessage
    }

    // Delete rows based on generated indices
    for (const index of Array.from(uniqueRandomIndices).sort((a, b) => b - a)) {
      await rowEllipses[index].click()
      const removeRowElement = await this.removeRow
      await removeRowElement.waitFor({ state: 'attached', timeout: 30 * 1000 })
      await removeRowElement.click()
      // await this.removeRow.click({ force: true, delay: 1000 });

      let lastMessage
      // Convert the string 'withData' to boolean
      const withDataBoolean = withData === 'true'
      if (rowType === 'blank') {
        lastMessage = await checkRowTypeAndData(
          withDataBoolean
            ? 'This Row has data. Are you sure?'
            : 'This is an empty Row. Are you sure?',
          'Confirm'
        )
      } else {
        lastMessage = await checkRowTypeAndData(
          withDataBoolean
            ? 'This inventory row has data and cannot be removed'
            : 'This is an empty Row. Are you sure?',
          withDataBoolean ? 'Got It' : 'Confirm'
        )
      }
      const lastMessageText = await lastMessage.textContent()
      if (lastMessageText.trim() == 'Confirm') {
        actualDeletedIndices.push(index)

        await this.rowDeleteMessage_Last.click()

        // Wait for the operation to complete
        await this.page.waitForTimeout(1000)
      }
    }

    return actualDeletedIndices.sort((a, b) => b - a)
  }

  async fetchInventoryTotal (panel) {
    let inventoryTotal = []
    const panelCells =
      panel === 'left' ? this.leftPanelCells : this.rightPanelCells
    if (panel === 'left') {
      inventoryTotal = await panelCells.last().textContent()
    } else {
      inventoryTotal = await await panelCells.last().allTextContents()
    }
    return inventoryTotal
  }

  async validateMessageInWKS (message) {
    expect(await this.page.getByText(message).first()).toBeVisible()
    // expect(await this.page.getByText(message).first()).toHaveCount(1)

    // Check if messageCloseImg is visible and present
    const closeImgCount = await this.messageCloseImg.count()
    if (closeImgCount === 1 && (await this.messageCloseImg.isVisible())) {
      // If the close image is visible and there is only one, click it
      await this.messageCloseImg.click()
    }
  }

  async validateMessageWithoutClose (message) {
    const noRecordFoundElement = await this.page.getByText(message)
    await noRecordFoundElement.waitFor({
      state: 'visible',
      timeout: 10 * 1000
    })
    expect(await noRecordFoundElement).toBeVisible()
  }
}

module.exports = { WorksheetPage }
