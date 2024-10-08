const { expect } = require('@playwright/test')
const { WebElementHandler } = require('../../../utilities/WebElementHandler')
const { AssertionHandler } = require('../../../utilities/AssertionHandler')
const logger = require('../../../utilities/Logger')

class ColumnsModule {
  constructor (page) {
    this.page = page
    this.webElementHandler = new WebElementHandler(this.page)
    this.assertionhandler = new AssertionHandler(this.page)
    this.cellInput = page.locator("[ref='eInput'][aria-label='Input Editor']")
    this.allEllipses = page.locator('.headcell-edit a')
    this.formulaDropDownOptions = page.locator('.formula-addrow-dropdown a')
    this.subMenu = page.locator('.formula-addrow-dropdown').last().locator('a')
    this.columnHeaders = page.locator(".ag-header-row [role='columnheader']")
    this.columnIndexes = page.locator('.active-calc-column')
    this.rowHeaders = page.locator('.active-calc-row')
    this.cancelButton = page.locator('.tippy-content button').first()
    this.doneButton = page.locator('.tippy-content button').last()
    this.columnFocusCount = page.locator('.wks-focus-filter')
    this.cellFillHandle = page.locator('.ag-fill-handle')
    this.columnNameInput = page.locator("input[class*='search-input']")
    this.columnNames = page.locator('.header-cell-space')
    this.focusIcon = page.locator('.product-design-filter button').last()
    this.tippyContentParent = page.locator('.tippy-content')
    this.secondTextInMessage = this.tippyContentParent.locator('span').last()
    this.editIcon = this.page.locator('.edit-icon')
    this.tagsSearchInput = this.page.locator('[placeholder="Search..."]')
    this.searchInput = this.page.locator('[placeholder="Search"]')
    this.tagsSelectionCancelLink = page.locator('span a[class*="text"]')
  }

  async clickColumnOption (option) {
    await this.page.getByText(option).click()
  }

  async clickEllipses (columnType) {
    const ellipsesToClick =
      columnType === 'Default Formula'
        ? this.allEllipses.last()
        : this.allEllipses.nth(10)
    await ellipsesToClick.click()
  }

  async validateColumnOptionsForBlankColumn () {
    const expectedOptions = [
      'Add a Blank Column',
      'Add a Product / Formula Column',
      'Add a Lookup Column',
      'Edit Name',
      'Lock',
      'Pin Column',
      'Remove Column'
    ]

    const fetchedValues = await this.formulaDropDownOptions.allTextContents()
    const trimmedValues = fetchedValues.map((entry) => entry.trim())
    logger.info(`Options listed in the dropdown: ${trimmedValues}`)
    expect(expectedOptions).toEqual(trimmedValues)
  }

  async addCellDetails (panel, actionType, valuesToEnter) {
    const panelSelector =
      panel === 'left' ? this.leftPanelCells : this.rightPanelCells
    const panelCells = await panelSelector.all()
    panelCells.pop()

    return this.enterCellValues(panelCells, actionType, valuesToEnter)
  }

  async enterCellValues (cells, actionType, valuesToEnter) {
    const enteredValues = []

    for (const cell of cells) {
      await cell.dblclick()

      // Clear the cell for "edit" actionType
      if (actionType === 'edit') {
        await this.leftPaneDetailCellInput.clear()
      }

      const valueToEnter =
        valuesToEnter && valuesToEnter.length > 0
          ? valuesToEnter.shift()
          : Math.floor(Math.random() * 99999 + 1).toString()

      await this.leftPaneDetailCellInput.type(valueToEnter)
      await this.leftPaneDetailCellInput.press('Enter')
      enteredValues.push(valueToEnter)
    }

    return enteredValues
  }

  /**
   * Sets values in a specific column of a table/grid.
   * This function assumes that the first and last cells in the column are non-editable.
   * It fetches all cells in the specified column, then clicks on each editable cell and types in the corresponding value from the provided array.
   *
   * @async
   * @function
   * @param {string} colID - The ID of the column in which values are to be set.
   * @param {string[]} values - An array of string values that are to be typed into the cells.
   * @throws Will throw an error if the page element is not found or if there's a Playwright error.
   * @returns {Promise<void>}
   *
   * @example
   * // Assuming an initialized page
   * await setColumnValues('COL6', ['value1', 'value2', 'value3']);
   */
  async setColumnValues (colID, values) {
    // Get all the cells for the specific column
    await this.page.waitForTimeout(1000)
    const cells = await this.page
      .locator(`[role="row"] > div[col-id="${colID}"]`)
      .all()
    const editableCells = await cells.slice(1, -1)
    for (let i = 0; i <= editableCells.length - 1; i++) {
      logger.info(`The formula to be entered is : ${values[i]}`)
      await this.webElementHandler.doubleClick(await editableCells[i])
      await this.webElementHandler.fillInput(await this.cellInput.last(), values[i])
      await this.webElementHandler.pressUsingKey(await this.cellInput.last(), 'Enter')
      if (i === values.length - 1) {
        break
      }
    }
  }

  /**
   * Fetches values from a specific column of a table/grid.
   *
   * @async
   * @function
   * @param {string} colID - The ID of the column from which values are to be fetched.
   * @returns {Promise<string[]>} - An array of string values fetched from the cells.
   *
   * @example
   * // Assuming an initialized page
   * const values = await getColumnValues('COL6');
   * logger.info(values); // Prints the fetched values
   */
  async getColumnValues (colID) {
    // Get all the cells for the specific column
    await this.page.waitForTimeout(2000)
    const allCells = await this.page
      .locator(`[role="row"] > div[col-id="${colID}"]`)
      .all()
    // Excluding the first and the last cell from the list
    const cellValuesToFetch = await allCells.slice(1, -1)

    const cellTexts = []
    for (const cell of await cellValuesToFetch) {
      const cellText = await cell.textContent()
      cellTexts.push(cellText.trim())
    }
    return cellTexts
  }

  /**
   * Fetches values from a specific column of a table/grid.
   *
   * @async
   * @function
   * @param {string} colID - The ID of the column from which values are to be fetched.
   * @returns {Promise<string[]>} - An array of string values fetched from the cells.
   *
   * @example
   * // Assuming an initialized page
   * const values = await getColumnValues('COL6');
   * logger.info(values); // Prints the fetched values
   */
  async getColumnValuesyByDoubleClicking (colID) {
    // Get all the cells for the specific column
    await this.page.waitForTimeout(2000)
    const trimmedValues = []
    const cells = await this.page
      .locator(`.ag-body div[col-id="${colID}"]`)
      .all()
    cells.pop()
    for (let i = 0; i <= cells.length - 1; i++) {
      await cells[i].dblclick()
      const cellValue = await this.page
        .locator("[ref='eInput']")
        .last()
        .inputValue()
      trimmedValues.push(cellValue.trim())
      await this.page.locator("[ref='eInput']").last().press('Escape')
    }
    return trimmedValues
  }

  /**
   * Fetches values from a specific column of a table/grid.
   *
   * @async
   * @function
   * @param {string} colID - The ID of the column from which values are to be fetched.
   * @returns {Promise<string[]>} - An array of string values fetched from the cells.
   *
   * @example
   * // Assuming an initialized page
   * const values = await getColumnValues('COL6');
   * logger.info(values); // Prints the fetched values
   */
  async getCellValuesyByDoubleClicking (rowIndexes, colID) {
    await this.page.waitForTimeout(2000)
    const cell = await this.page.locator(
      `[row-index='${rowIndexes}'] [col-id='${colID}']`
    )
    await cell.dblclick()
    const elementHandle = await this.page.locator("[ref='eInput']").last()
    const tagType = await elementHandle.evaluate(ele => ele.tagName)
    const cellValue = (tagType.toLowerCase() === 'div') ? await this.webElementHandler.getText(await elementHandle) : await this.webElementHandler.getInputValue(await elementHandle)
    await cell.press('Enter')
    return cellValue.trim()
  }

  async justDoubleClickAndEscape (rowIndex, colID) {
    const cellElement = await this.performDoubleClickOnCell(rowIndex, colID)
    await cellElement.press('Escape')
  }

  async performDoubleClickOnCell (rowIndex, colID) {
    await this.page.waitForTimeout(2000)
    const cell = await this.page.locator(
      `[row-index='${rowIndex}'] [col-id='${colID}']`
    )
    await cell.dblclick()
    await this.page.waitForTimeout(1000)
    return cell
  }

  /**
   * Fetches the inventory total (assumed to be the last value) from a specific column of a table/grid.
   *
   * @async
   * @function
   * @param {string} colID - The ID of the column from which the total is to be fetched.
   * @returns {Promise<string|null>} - The inventory total as a string, or null if no value is found.
   *
   * @example
   * // Assuming an initialized page
   * const total = await getInventoryTotal('COL6');
   * logger.info(total); // Prints the total value
   */
  async getInventoryTotal (colID) {
    // Get all the cells for the specific column
    const cell = await this.page
      .locator(`[role="row"] > div[col-id="${colID}"]`)
      .last()

    if (cell.length === 0) {
      return null // No values found
    }

    // Extract text from the last cell
    return await cell.textContent()
  }

  /**
   * Clicks on the element specified by the column ID.
   *
   * @async
   * @function clickElementByColumnID
   * @param {string} colID - The ID of the column (e.g., "COL7").
   * @throws {Error} Throws an error if the element is not found or any other issue occurs during the click action.
   * @returns {Promise<void>} Resolves when the click action is completed.
   */
  async clickActionIconByColumnID (colID) {
    try {
      await this.page.waitForTimeout(500)
      const actionIconElement = await this.page.locator(`a#${colID}`)
      await this.webElementHandler.click(await actionIconElement)
      await this.page.waitForTimeout(500)
    } catch (error) {
      throw new Error(
        `Failed to click on element with column ID ${colID}. Error: ${error.message}`
      )
    }
  }

  /**
   * Clicks on the element specified by its displayed text (action).
   *
   * @async
   * @function clickOnAction
   * @param {string} action - The displayed text of the element you wish to click on.
   * @throws {Error} Throws an error if the element is not found or any other issue occurs during the click action.
   * @returns {Promise<void>} Resolves when the click action is completed.
   */
  async clickOnAction (action) {
    let clickElement
    try {
      // Locate the element using its displayed text and click on it
      if (action === 'Edit Name') {
        clickElement = await this.page.getByText(action).last()
      } else {
        clickElement = await this.page.getByText(action).first()
      }
      await this.page.waitForTimeout(1)
      await this.webElementHandler.click(await clickElement)
    } catch (error) {
      throw new Error(
        `Failed to click on element with text "${action}". Error: ${error.message}`
      )
    }
  }

  /**
   * Validates the presence of the "headcell-name locked" element for a given column ID.
   *
   * @async
   * @function isLockedHeaderPresent
   * @param {string} colID - The column ID you wish to check the locked header for.
   * @returns {Promise<boolean>} Returns true if the locked header is present, otherwise false.
   * @throws {Error} Throws an error if there's an issue locating the element or any other unexpected error.
   */
  async isLockedHeaderPresent (colID) {
    try {
      // Locate the parent element using the provided colID
      const parentElement = await this.page.locator(`div[col-id="${colID}"]`)

      // Check for the presence of the "headcell-name locked" element within the located parent
      const lockedHeader = await parentElement.locator('.headcell-name.locked')

      expect(await lockedHeader.isVisible()).toBeTruthy()
    } catch (error) {
      throw new Error(
        `Failed to validate the presence of locked header for column "${colID}". Error: ${error.message}`
      )
    }
  }

  async validateColumnValuesInWKS (actualValues, expectedValues) {
    logger.info(
      `The actual column values as fetched from the UI are : ${actualValues}`
    )
    logger.info(`The expected column values are : ${expectedValues}`)
    expect(actualValues).toEqual(expectedValues)
  }

  /**
   * Fetches column indexes from the UI. It specifically targets and matches uppercase letters
   * which are at the end of a word in the text content of these elements,
   * representing probable column indexes or labels.
   *
   * @async
   * @function fetchColumnIndexes
   * @throws {Error} If there's an issue fetching the column indexes.
   * @returns {Promise<Array>} Resolves with an array of the column indexes. The last matched index is removed from the list.
   */
  async fetchColumnIndexes () {
    const columnIndexes = await this.columnIndexes.allTextContents()
    // const columnIndexList = []
    logger.info(
      `The actual row indexes as fetched from the UI is : ${columnIndexes}`
    )
    return columnIndexes
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

  async clickFocusIcon (columnID) {
    await this.page
      .locator(`[col-id='${columnID}'] [mattooltip='Click to focus view']`)
      .click()
  }

  async fetchFocusCount () {
    let focusCount
    await this.columnFocusCount.waitFor({
      state: 'visible',
      timeout: 2 * 1000
    })
    // eslint-disable-next-line prefer-const
    focusCount = await this.columnFocusCount.textContent()
    return focusCount
  }

  /**
   * Gets the center coordinates of a given element.
   * This helper method is particularly useful for interaction-based tasks,
   * like drag and drop, where center coordinates can provide a precise target.
   *
   * @param {Locator} element - The Playwright Locator of the desired element.
   * @returns {Promise<{x: number, y: number}>} - Center coordinates of the element.
   * @throws {Error} Throws an error if unable to retrieve the bounding box of the element.
   */
  async getCenterCoordinates (element) {
    const boundingBox = await element.boundingBox()
    if (!boundingBox) {
      throw new Error('Failed to get the bounding box of the element.')
    }
    return {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y + boundingBox.height / 2
    }
  }

  /**
   * Moves a column from one position to another within the grid.
   * This is accomplished via a drag-and-drop operation, simulating
   * user behavior for reordering columns in a data grid UI.
   *
   * @param {string} fromColID - The column identifier for the column to be moved.
   * @param {string} toColID - The destination column identifier where the column should be moved.
   * @returns {Promise<void>} - No return value; method carries out a UI operation.
   * @throws {Error} Throws an error if unable to locate the column handles.
   */
  async moveColumnsAcrossWKS (fromColID, toColID) {
    const fromColumnHandle = await this.page.locator(
      `[col-id='${fromColID}'] [mattooltip='Drag to move']`
    )
    const toColumnHandle = await this.page.locator(
      `[col-id='${toColID}'] [mattooltip='Drag to move']`
    )

    if (!fromColumnHandle || !toColumnHandle) {
      console.error('Unable to locate column handles.')
      return
    }

    const fromCoords = await this.getCenterCoordinates(fromColumnHandle)
    const toCoords = await this.getCenterCoordinates(toColumnHandle)

    await this.page.waitForTimeout(500)
    // Execute the drag and drop sequence
    await this.page.mouse.move(fromCoords.x, fromCoords.y)
    await this.page.mouse.down()
    await this.page.waitForTimeout(1000) // Allow time for the drag to be recognized by the UI.
    await this.page.mouse.move(toCoords.x, toCoords.y)
    await this.page.waitForTimeout(1000) // Add a brief pause before the drop to ensure smooth transition.
    await this.page.mouse.up()
  }

  /**
   * Helper method to fetch a cell based on its row and column number.
   *
   * @param {number} rowNum - Zero-indexed row number.
   * @param {number} colNum - Zero-indexed column number.
   * @returns {Promise<Locator|null>} - Returns the cell Locator or null if not found.
   */
  async getCell (rowNum, colNum) {
    const row = await this.page.locator(
      `.ag-center-cols-container > [row-index="${rowNum}"]`
    )
    if (!row) {
      console.error(`Row with index ${rowNum} not found.`)
      return null
    }
    const cell = await row.locator(`[role="gridcell"]:nth-child(${colNum})`)
    if (!cell) {
      console.error(
        `Cell with column index ${colNum} not found in row ${rowNum}.`
      )
      return null
    }
    return cell
  }

  /**
   * Sets the value in a cell defined by its row and column number.
   *
   * @param {number} rowNum - Zero-indexed row number.
   * @param {number} colNum - Zero-indexed column number.
   * @param {string} value - Value to be set in the cell.
   * @returns {Promise<void>} - Resolves when the operation completes.
   */
  async setValueInCell (rowNum, colNum, value) {
    const cell = await this.getCell(rowNum, colNum)
    if (!cell) return

    let attemptCount = 0
    // let cellContent = await cell.textContent();
    await cell.dblclick()
    let cellInputEle = await this.cellInput
    let cellInputCount = await cellInputEle.count()
    while (attemptCount < 3 && cellInputCount !== 1) {
      await this.page.waitForTimeout(0.5 * 1000)
      await cell.dblclick()
      cellInputEle = await this.cellInput // Re-fetch after double-click
      cellInputCount = await cellInputEle.count()
      attemptCount++

      if (cellInputCount !== 1) {
        console.error('Failed to display cellInput after 3 attempts')
        return
      }

      await cell.press('Control+A')
      await cell.press('Delete')
    }

    if (value === '=') {
      await cellInputEle.clear()
      await cellInputEle.type(value, { delay: 100 })
      // await cell.fill(value, { delay: 100 });
    } else {
      await cellInputEle.clear()
      await cellInputEle.fill(value, { delay: 100 })
    }

    await cell.press('Enter')
  }

  /**
   * Copies the formula from a source cell and pastes it into a destination cell.
   *
   * @param {number} fromRowNum - Zero-indexed row number of the source cell.
   * @param {number} fromColNum - Zero-indexed column number of the source cell.
   * @param {number} toRowNum - Zero-indexed row number of the destination cell.
   * @param {number} toColNum - Zero-indexed column number of the destination cell.
   * @returns {Promise<void>} - Resolves when the operation completes.
   */
  async copyAndPasteFormula (fromRowNum, fromColNum, toRowNum, toColNum) {
    const fromCell = await this.getCell(fromRowNum, fromColNum)
    if (!fromCell) return

    await fromCell.click()
    await fromCell.press('Control+C')

    const toCell = await this.getCell(toRowNum, toColNum)
    if (!toCell) return

    await toCell.click()
    await toCell.press('Control+V')
  }

  async copyAndPasteDataToFromColumn (fromColID, toColID) {
    const sourceColElement = await this.page
      .locator(`.ag-center-cols-container [col-id='${fromColID}']`)
      .all()
    const destinationColElement = await this.page
      .locator(`.ag-center-cols-container [col-id='${toColID}']`)
      .all()
    const sourceColElementsWithoutLast = sourceColElement.slice(0, -1)
    const destinationColElementsWithoutLast = destinationColElement.slice(
      0,
      -1
    )
    await this.page.waitForTimeout(1000)
    await sourceColElementsWithoutLast[0].click()
    await this.page.keyboard.down('Shift')
    for (let i = 0; i <= sourceColElementsWithoutLast.length - 2; i++) {
      await this.page.keyboard.down('ArrowDown')
    }
    await this.page.keyboard.up('Shift')
    await this.page.keyboard.press('Control+C')
    await this.page.waitForTimeout(1500)
    await destinationColElementsWithoutLast[0].click()
    await this.page.keyboard.press('Control+V')
    await this.page.waitForTimeout(1500)
  }

  /**
   * Retrieves the value/content of a cell defined by its row and column number.
   *
   * @param {number} rowNum - Zero-indexed row number.
   * @param {number} colNum - Zero-indexed column number.
   * @returns {Promise<string|null>} - Returns the content of the cell or null if not found.
   */
  async getCellValue (rowNum, colNum) {
    const cell = await this.getCell(rowNum, colNum)
    if (!cell) return null

    return await cell.textContent()
  }

  async dragFormula (fromRowNum, fromColNum, toRowNum, toColNum) {
    // Click the cell with the formula to select it
    const fromCell = await this.getCell(fromRowNum, fromColNum)
    if (!fromCell) return
    await fromCell.click()

    // Find the fill handle of the selected cell
    const fillHandle = await this.cellFillHandle
    await fillHandle.hover()

    // Perform the mouse down action on the fill handle
    const handleBox = await fillHandle.boundingBox()
    await this.page.mouse.move(
      handleBox.x + handleBox.width / 2,
      handleBox.y + handleBox.height / 2
    )
    await this.page.mouse.down()

    // Calculate the target position based on the toRowNum and toColNum
    const toCell = await this.getCell(toRowNum, toColNum)
    if (!toCell) {
      // If there's no target cell, release the mouse to avoid getting stuck
      await this.page.mouse.up()
      return
    }
    const targetBox = await toCell.boundingBox()

    // Move the mouse to the target cell and then release the mouse
    await this.page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height / 2
    )
    await this.page.mouse.up()
  }

  async editColumName (nameToSet) {
    const editNameElement = await this.columnNameInput.last()
    await editNameElement.waitFor({ state: 'visible', timeout: 3 * 1000 })
    await editNameElement.clear()
    await editNameElement.fill(nameToSet, { delay: 100 })
    await editNameElement.press('Enter')
    await this.page.waitForTimeout(1000)
  }

  /**
   * Validates that the specified option is not displayed in the list of formula drop-down options.
   * @param {string} option - The option you want to check for absence.
   */
  async validateThatThisOptionIsNotDisplayed (option) {
    // Fetch all the text contents of formula drop-down options
    const fetchedValues = await this.formulaDropDownOptions.allTextContents()

    // Trim the fetched values to remove any leading or trailing white spaces
    const trimmedValues = fetchedValues.map((entry) => entry.trim())

    await expect(trimmedValues).not.toContain(option)
  }

  async fetchColumnNames () {
    const columns = await this.columnNames.allTextContents()
    return columns.map((column) => {
      if (column === 'Inventory ID') {
        return column
      } else {
        const parts = column.split(' ')
        return parts[1] || parts[0]
      }
    })
  }

  async hoverOnFocus () {
    await this.focusIcon.waitFor({ state: 'visible', timeout: 3 * 1000 })
    await this.focusIcon.hover()
  }

  async validateFocusHoverMessage (message) {
    const hoverMessage = await this.page
      .locator('.mdc-tooltip__surface')
      .last()
      .textContent()
    expect(hoverMessage).toBe(message)
  }

  async clicksOn (clickItem) {
    await this.page.locator(`//*[text()='${clickItem}']`).last().click()
  }

  async validateThatMenuActionsAreGrayed () {
    const menuActions = await this.formulaDropDownOptions.all()
    for (let i = 0; i <= menuActions.length - 1; i++) {
      const classContent = await menuActions[i].getAttribute('class')
      expect(classContent).toContain('disabled-not')
    }
  }

  async validateNonProductColumnFilterStatus (status) {
    const headersElements = await this.columnHeaders
      .locator("a[mattooltip='Click to filter view']")
      .all()
    for (let i = 0; i <= headersElements.length - 1; i++) {
      const filterElement = await headersElements[i]
      await filterElement.waitFor({ state: 'visible', timeout: 10 * 1000 })
      await filterElement.hover()
      expect(
        await this.page.getByText('Click to filter view').nth(i + 1)
      ).toBeVisible()
      if (status === 'disabled') {
        expect(await filterElement).toHaveAttribute(
          'class',
          'mat-mdc-tooltip-trigger filter-icon ng-star-inserted disabled-not'
        )
      } else {
        expect(await filterElement).toHaveAttribute(
          'class',
          'mat-mdc-tooltip-trigger filter-icon'
        )
      }
    }
  }

  /**
   * Checks if a specific menu option is displayed or not displayed in the dropdown.
   * @param {string} menuOption - The menu option to check.
   * @param {string} status - Expected visibility status ('displayed' or 'not displayed').
   */
  async checkMenuOptionDisplayStatus (menuOption, status) {
    const menuOptions = await this.formulaDropDownOptions
    const menuOptionsArray = await this.webElementHandler.getAllTexts(await menuOptions)
    logger.info(`Menu options as seen in the UI: ${menuOptionsArray}`)
    const isDisplayed = menuOptionsArray.includes(menuOption)
    const shouldBeDisplayed = status === 'displayed'
    expect(isDisplayed).toBe(shouldBeDisplayed)
  }

  async fetchTheCellSize (colID) {
    const cells = await this.page
      .locator(`[role="row"] > div[col-id="${colID}"]`)
    return await this.webElementHandler.getSizeOfElement(await cells.first())
  }

  async doubleClickCellsAndFetchSize (colID) {
    const cellSizes = []
    const cells = await this.page
      .locator(`[role="row"] > div[col-id="${colID}"]`)
      .all()
    const editableCells = await cells.slice(1, -1)
    for (let i = 0; i <= editableCells.length - 1; i++) {
      const editableCell = await editableCells[i]
      await this.webElementHandler.doubleClick(await editableCell)
      const cs = await this.webElementHandler.getSizeOfElement(await this.cellInput)
      cellSizes.push(await cs.width)
      await this.webElementHandler.pressUsingKey(await editableCell, 'Escape')
    }
    return cellSizes
  }

  async deleteAllLookUpColumns (_fromColID, _toColID) {
    const generatedColumns = (_fromColID, _toColID) => Array.from(
      { length: parseInt(_toColID.match(/\d+$/)[0], 10) - parseInt(_fromColID.match(/\d+$/)[0], 10) + 1 },
      (_, i) => `COL${i + parseInt(_fromColID.match(/\d+$/)[0], 10)}`
    )
    for (const column of generatedColumns(_fromColID, _toColID)) {
      await this.deleteSpecificLookUpColumn(column)
    }
  }

  async deleteSpecificLookUpColumn (columnIDToBeDeleted) {
    await this.clickActionIconByColumnID(columnIDToBeDeleted)
    const textElementToClickOn = await this.page.getByText('Remove Column').first()
    await this.webElementHandler.click(await textElementToClickOn)
    const removeLink = await this.secondTextInMessage
    await this.webElementHandler.click(await removeLink)
  }

  async addThisLookUpColumnUsingReference (lookUpColumn, referenceColumnID) {
    await this.clickActionIconByColumnID(referenceColumnID)
    const textElementToClickOn = await this.page.getByText('Add a Lookup Column').first()
    await this.webElementHandler.click(await textElementToClickOn)
    const elementToClickOn = await this.page.locator(`//a[text()='${lookUpColumn}']`)
    await this.webElementHandler.click(await elementToClickOn)
  }

  async validateMenuOptionsForTheseColumns (_fromColID, _toColID, expectedMenuOptions) {
    const generatedColumns = (_fromColID, _toColID) => Array.from(
      { length: parseInt(_toColID.match(/\d+$/)[0], 10) - parseInt(_fromColID.match(/\d+$/)[0], 10) + 1 },
      (_, i) => `COL${i + parseInt(_fromColID.match(/\d+$/)[0], 10)}`
    )
    for (const columnID of generatedColumns(_fromColID, _toColID)) {
      await this.clickActionIconByColumnID(columnID)
      await this.assertionhandler.assertActualAndExpectedAllTexts(await this.tippyContentParent.locator('a'), expectedMenuOptions)
    }
  }

  async addAllLookUpColumnsFromThisColumn (referenceColumnID, lookUpColumnsToAdd) {
    let startingReference = parseInt(referenceColumnID.match(/\d+$/)[0], 10)
    for (const lookUpColumn of lookUpColumnsToAdd) {
      const currentReferenceColumnID = `COL${startingReference++}`
      await this.addThisLookUpColumnUsingReference(lookUpColumn, currentReferenceColumnID)
    }
  }

  async validateThatCellContentsAreNot (colID, incorrectCellValues) {
    const actualValues = await this.getColumnValues(colID)
    const expectedIncorrectValues = incorrectCellValues.split(',').map(String)
    actualValues.forEach(value => {
      expect(expectedIncorrectValues).not.toContain(value)
    })
  }

  async addTagsToAppsGrid (rowIndex, columnIndex, tagsToAdd) {
    const focusCell = this.page.locator(`[row-index='${rowIndex}'] [col-id='${columnIndex}']`)
    const editIcon = await focusCell.locator(await this.editIcon)
    await this.webElementHandler.click(await editIcon)
    await this.page.waitForTimeout(1000)
    for (const tag of tagsToAdd) {
      await this.webElementHandler.fillInputWithType(await this.searchInput, tag, { delay: 200 })
      const checkBoxToTick = await this.page.locator(`label[for='${tag}']`)
      await this.webElementHandler.checkCheckbox(await checkBoxToTick)
    }
    await this.webElementHandler.click(await this.tagsSelectionCancelLink.last())
  }

  async addPredecessorToAppsGrid (rowIndex, columnIndex, predecessorColumn) {
    const focusCell = this.page.locator(`[row-index='${rowIndex}'] [col-id='${columnIndex}']`)
    const editIcon = await focusCell.locator(await this.editIcon)
    await this.webElementHandler.click(await editIcon)
    await this.page.waitForTimeout(2000)
    await this.webElementHandler.fillInputWithType(await this.searchInput, predecessorColumn, { delay: 200 })
    const predecessorElementToSet = await this.page.locator(`//li//div[text()='${predecessorColumn}']`)
    await this.webElementHandler.click(await predecessorElementToSet)
  }
}

module.exports = { ColumnsModule }
