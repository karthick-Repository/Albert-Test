const { expect } = require('@playwright/test')
const { ColumnsModule } = require('./ColumnsModule')
const logger = require('../../../utilities/Logger')

class NormalizeModule {
  constructor (page) {
    this.page = page
    this.allEllipses = page.locator('.headcell-edit a')
    this.normalize = page.getByText('Normalize')
    this.columnsModule = new ColumnsModule(this.page)
    this.normalizationPopUp = page
      .locator('div')
      .filter({ hasText: /^CancelDone$/ })
      .nth(1)
    this.normalizeInput = page.locator('.normalize-calc-form input')
    this.normalizeError = page.locator('.error-text')
    this.cancel = page.getByRole('link', { name: 'Cancel' })
    this.done = page.getByRole('link', { name: 'Done' })
    this.normalizeCheckBoxes = page.locator(
      "[role='gridcell'] .checkbox-label label"
    )
    this.rightPanel = page.locator("[ref='eContainer']")
    this.normalizeCellGroups = this.rightPanel.locator(
      '.normalize-calc-cell .flex-block'
    )
    this.normalizeCheckboxes =
      this.normalizeCellGroups.locator("[type='checkbox']")
    this.focusButton = page.locator('.product-design-filter button').last()
    this.normalizeMessagePopOver = page.locator(
      '.dropdown-confirm-popover span'
    )
  }

  async clickColumnOption (option) {
    await this.page.getByText(option).click()
  }

  async validateNormalizePopUpUI () {
    expect(await this.normalizationPopUp).toBeVisible()
    expect(await this.normalizeInput).toBeVisible()
    expect(await this.normalizeInput).toBeEditable()
    expect(await this.cancel).toBeVisible()
    expect(await this.done).toBeVisible()
  }

  async validateNormalizeInputBoundaries () {
    await this.normalizeInput.clear()
    expect(await this.normalizeError).toHaveText('Min 0 and Max 100,000,000')
    expect(await this.done).toHaveAttribute(
      'class',
      'm-l-10 text-primary disabled-not'
    )
    await this.enterNomalizeValue('1000000000')
    expect(await this.normalizeError).toHaveText('Min 0 and Max 100,000,000')
    expect(await this.done).toHaveAttribute(
      'class',
      'm-l-10 text-primary disabled-not'
    )
  }

  async fetchDefaultNormalizeValue () {
    return await this.normalizeInput.inputValue()
  }

  async validateDefaultNormalizeValue (defaultValue) {
    expect(defaultValue).toBe('100')
  }

  async enterNormalizationValue (normalizeValue) {
    await this.normalizeInput.type(normalizeValue)
  }

  async checkWhetherNormalizePopUpIsDisplayed () {
    return await this.normalizationPopUp.isVisible()
  }

  async clickCancel () {
    await this.cancel.click()
  }

  async clickDone () {
    await this.done.click()
  }

  async fetchAllCheckBoxes () {
    return await this.normalizeCheckBoxes.all()
  }

  async validateNumberOfCheckBoxes (expectedNumberOfCheckBoxes) {
    const actualCheckBoxes = this.fetchAllCheckBoxes.count()
    expect(actualCheckBoxes).toBeLessThanOrEqual(expectedNumberOfCheckBoxes)
  }

  async validateNormalizeMessage (message) {
    expect(await this.page.getByText(message)).toBeVisible()
    expect(await this.page.getByText('Got It')).toBeVisible()
  }

  async enterNomalizeValue (value) {
    await this.normalizeInput.clear()
    await this.normalizeInput.type(value.toString(), { delay: 70 })
  }

  async checkTheCheckbox (checkBoxIndex) {
    await this.normalizeCheckBoxes.nth(checkBoxIndex - 1).check()
  }

  async validateTotalNumberOfCheckboxes (expectedCheckboxes) {
    expect(await this.normalizeCheckBoxes).toHaveCount(expectedCheckboxes)
  }

  /**
   * Asynchronously checks if the last 'focusButton' has been hovered over
   * and verifies if the text 'No focused view applied' is visible on the page.
   *
   * @async
   * @param {string} focusOrNot - A string which determines what text to expect, either "should not" or anything else.
   * @returns {Promise<void>} - A promise that resolves when the check is complete.
   * @throws {Error} Throws an error if 'No focused view applied' text is not visible or any issues related to hovering over the `focusButton`.
   * @note Ensure that the page and all its elements are properly initialized and loaded before calling this method.
   */
  async checkFocus (focusOrNot) {
    await this.focusButton.last().hover()
    if (focusOrNot === 'should not') {
      await expect(
        this.page.getByText('No focused view applied').last()
      ).toBeVisible()
    } else {
      await expect(
        this.page.getByText('Click to clear all focused views').last()
      ).toBeVisible()
    }
  }

  /**
   * Asynchronously checks the count on the last 'focusButton' and expects it to match the given count.
   *
   * @async
   * @param {number} count - The expected count to be compared with the actual count on the 'focusButton'.
   * @returns {Promise<void>} - A promise that resolves when the check is complete.
   * @throws {Error} Throws an error if the expected count does not match the actual count on the 'focusButton'.
   * @note Ensure that the page and all its elements are properly initialized and loaded before calling this method.
   */
  async checkFocusCount (count) {
    const focusCount = await this.focusButton
      .last()
      .locator('.count')
      .textContent()
    logger.info(`The focus count as fetched from the UI is : ${focusCount}`)
    logger.info(`The expected focus count is : ${count}`)
    expect(focusCount).toBe(count)
  }

  /**
   * Asynchronously fetches all checkbox elements within a specified column.
   *
   * @async
   * @param {string} colID - The ID of the column to find checkboxes in.
   * @returns {Promise<Array>} - A promise that resolves to an array of checkbox elements found within the specified column.
   * @throws {Error} - Throws an error if the column with the given colID doesn't exist or any other issues related to locating the checkboxes.
   * @note - Ensure that the page and all its elements are properly initialized and loaded before calling this method.
   */
  // eslint-disable-next-line no-dupe-class-members
  async fetchAllCheckBoxes (colID) {
    try {
      const columnElement = await this.page.locator(`div[col-id="${colID}"]`)
      return await columnElement
        .locator(".normalize-calc-cell [type='checkbox']")
        .all()
    } catch (error) {
      throw new Error(
        `Failed to fetch checkboxes for column ID "${colID}". Original error: ${error.message}`
      )
    }
  }

  /**
   * Asynchronously ticks checkboxes in a specified column based on the provided indexes.
   *
   * @async
   * @param {string} colID - The ID of the column containing the checkboxes.
   * @param {string} indexes - Comma separated string of checkbox indexes (1-based) to be ticked.
   * @returns {Promise<void>} - A promise that resolves once the checkboxes have been ticked.
   * @throws {Error} - Throws an error if there are any issues related to locating or ticking the checkboxes.
   * @note - Ensure that the page and all its elements are properly initialized and loaded before calling this method.
   * @note - The provided indexes are 1-based. For example, '1,3' would mean tick the first and third checkbox.
   */
  async tickCheckBoxesForColumn (colID, indexes) {
    try {
      const checkboxes = await this.fetchAllCheckBoxes(colID)
      const checkIndexes = indexes.split(',').map(Number)
      for (const index of checkIndexes) {
        const checkbox = await checkboxes[index - 1]
        const checkStatus = await checkbox.isChecked()
        if (!checkStatus) {
          logger.info(`Checking the ${index} checkbox`)
          await checkbox.check()
        }
      }
    } catch (error) {
      throw new Error(
        `Failed to tick checkboxes for column ID "${colID}" based on provided indexes. Original error: ${error.message}`
      )
    }
  }

  /**
   * Asynchronously fetches the values of all `.slate-b5` elements within a specified column.
   *
   * @async
   * @param {string} colID - The ID of the column to fetch values from.
   * @returns {Promise<string[]>} - A promise that resolves to an array of strings representing the values of `.slate-b5` elements.
   * @throws {Error} - Throws a custom error message if there's an issue during the fetch process. The original error message from Playwright is included.
   * @note - Ensure that the page and all its elements are properly initialized and loaded before calling this method.
   */
  async fetchSlateValuesForColumn (colID) {
    try {
      return await this.page.$$eval(
        `div[col-id="${colID}"] .slate-b5`,
        (elements) => {
          return elements.map((element) => element.textContent.trim())
        }
      )
    } catch (error) {
      throw new Error(
        `Failed to fetch values for column ID "${colID}". Original error: ${error.message}`
      )
    }
  }

  /**
   * Asynchronously fetches the values of all `.value` elements within a specified column.
   *
   * @async
   * @param {string} colID - The ID of the column to fetch values from.
   * @returns {Promise<string[]>} - A promise that resolves to an array of strings representing the values of `.value` elements.
   * @throws {Error} - Throws a custom error message if there's an issue during the fetch process. The original error message from Playwright is included.
   * @note - Ensure that the page and all its elements are properly initialized and loaded before calling this method.
   */
  async fetchNormalizedValuesForColumn (colID) {
    await this.page.waitForTimeout(2000)
    const valueElements = await this.page
      .locator(`//div[@col-id='${colID}']//div[@class='value']`)
      .allTextContents()
    return valueElements.map((value) => value.trim())
  }

  /**
   * Calculates normalized values based on given column values, an inventory total, and a normalization value.
   *
   * The formula for normalization is:
   *   normalizedValue = (value from columnValues) * (normalizeValue / inventoryTotal)
   *
   * Each resulting normalized value is rounded to 8 decimal places.
   *
   * @param {number[]|string[]} columnValues - An array of values that need to be normalized. Can be numbers or strings that are parseable to numbers.
   * @param {number|string} inventoryTotal - The total inventory value. Can be a number or a string that's parseable to a number.
   * @param {number|string} normalizeValue - The value to which the column values should be normalized. Can be a number or a string that's parseable to a number.
   *
   * @returns {number[]} An array of normalized values rounded to 8 decimal places.
   *
   * @example
   * const colValues = [10, 20, 30];
   * const invTotal = 100;
   * const normValue = 200;
   * const normalized = calculateNormalizedValues(colValues, invTotal, normValue);
   * logger.info(normalized);  // Outputs: [20, 40, 60]
   */
  async calculateNormalizedValues (
    columnValues,
    inventoryTotal,
    normalizeValue
  ) {
    const multiplierValue =
      parseFloat(normalizeValue) / parseFloat(inventoryTotal)
    const expectedNormalizedValues = []
    for (let i = 0; i <= columnValues.length - 1; i++) {
      let valueToPush = columnValues[i] * multiplierValue
      valueToPush = parseFloat(valueToPush.toFixed(9)) // Rounding to 8 decimals
      expectedNormalizedValues.push(valueToPush)
    }
    logger.info(
      `The expected normalized values after performing the calculations are ${expectedNormalizedValues}`
    )
    return expectedNormalizedValues
  }

  /**
   * Normalizes a set of values so that their combined total equals a specified normalization total.
   * If specific indices are checked (provided in checkIndexes), the values at these indices remain unchanged.
   * The remaining values are then adjusted so that their combined total, along with the unchecked values,
   * meets the normalization total.
   * If the combined value of the checked indices exceeds the normalization total, all unchecked values are set to 0.
   *
   * @param {number[]} values - The array of original values to be normalized.
   * @param {number[]} checkIndexes - Indices of the values that should remain unchanged.
   * @param {number} [normalizeTotal=100] - The combined total to which values should be normalized. Defaults to 100.
   * @returns {Object} An object containing:
   *   - normalizedValues: The array of values after normalization.
   *   - total: The combined total of the normalized values.
   *
   * @example
   * const values = [95, 96, 97, 98];
   * const checked = [0, 1, 2];
   * const result = normalizationWithConstant(values, checked, 200);
   * logger.info(result.normalizedValues);  // Outputs: [95, 96, 97, 0]
   * logger.info(result.total);  // Outputs: 288
   */
  normalizationWithConstant (values, checkIndexes, normalizeTotal = 100) {
    // Convert string input to arrays only if necessary
    if (typeof values === 'string') {
      values = values.split(',').map((val) => Number(val.trim()))
    }
    if (typeof checkIndexes === 'string') {
      checkIndexes = checkIndexes
        .split(',')
        .map((index) => Number(index.trim()) - 1)
    }

    const total = values.reduce((sum, val) => sum + val, 0)

    // Calculate the total of checked values
    let checkedTotal = 0
    for (const index of checkIndexes) {
      checkedTotal += values[index]
    }

    const remainingTotal = normalizeTotal - checkedTotal

    if (remainingTotal <= 0) {
      return {
        normalizedValues: values.map((val, i) =>
          checkIndexes.includes(i) ? val : 0
        ),
        total: checkedTotal
      }
    }

    // Calculate the sum of values excluding the checked values.
    const uncheckedSum = total - checkedTotal

    // Normalize the values
    const normalizedValues = values.map((val, i) => {
      if (checkIndexes.includes(i)) {
        return val
      } else {
        return (val / uncheckedSum) * remainingTotal
      }
    })

    // Calculate the new total
    const newTotal = normalizedValues.reduce((sum, val) => sum + val, 0)

    return {
      normalizedValues,
      total: newTotal
    }
  }

  async fetchCalculatedNormalizedValues (colID) {
    // Locate all elements matching the selector and get their text contents
    const texts = await this.page
      .locator(`[role="row"] > div[col-id="${colID}"] .value`)
      .allTextContents()

    // Trim the text of each remaining element
    return texts.map((text) => text.trim())
  }

  // eslint-disable-next-line no-dupe-class-members
  async validateNormalizeMessage (message) {
    const normMessage = await this.normalizeMessagePopOver
      .first()
      .waitFor({ state: 'attached', timeout: 3 * 1000 })
    const normalizeMessage = await normMessage.textContent()
    expect(normalizeMessage).toBe(message)
  }

  async clickGotIt () {
    await this.normalizeMessagePopOver.last().click()
  }
}

module.exports = { NormalizeModule }
