/**
 * Provides enhanced interactions with web elements using Playwright.
 */
class WebElementHandler {
  constructor (page) {
    this.page = page
    this.defaultElementTimeout = 1 * 60 * 1000
  }

  /**
   * Merges default options with provided options.
   * @private
   * @param {Object} [options={}] - Optional configurations.
   * @returns {Object} - Merged options.
   */
  _getDefaultOptions (options = {}) {
    return { timeout: this.defaultTimeout, ...options }
  }

  /**
   * Checks if an element is visible on the page.
   * @param {Locator} locator - Element locator
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<boolean>} - Resolves with true if the element is visible, otherwise false.
   */
  async waitForVisible (locator, options = {}) {
    try {
      const mergedOptions = this._getDefaultOptions(options)
      await locator.waitFor({ state: 'visible', ...mergedOptions })
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Waits for an element to be visible and clickable on the page.
   * @param {Locator} locator - Element locator
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the element is clickable.
   */
  async waitForClickable (locator, options = {}) {
    await this.waitForVisible(await locator, options)
    await locator.waitFor({
      state: 'attached',
      ...this._getDefaultOptions(options)
    })
  }

  /**
   * Clicks on a visible and clickable element.
   * @param {Locator} locator - Element locator
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the click action is completed.
   */
  async click (locator, options = {}) {
    await this.waitForClickable(await locator, options)
    await locator.click(this._getDefaultOptions(options))
  }

  /**
   * Fills an input box with specified text. This method sets the value of the field directly and does not simulate keystrokes.
   * @param {Locator} locator - Element locator for the input box.
   * @param {string} text - The text to fill into the input box.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the input box is filled with the specified text.
   */
  async fillInput (locator, text, options = {}) {
    const defaultOptions = this._getDefaultOptions(options)
    const fillOptions = { ...defaultOptions, delay: 100, ...options }
    await this.waitForVisible(await locator, options)
    await locator.clear()
    await locator.fill(text, fillOptions)
  }

  async fillInputWithoutClear (locator, text, options = {}) {
    const defaultOptions = this._getDefaultOptions(options)
    const fillOptions = { ...defaultOptions, delay: 100, ...options }
    await this.waitForVisible(await locator, options)
    await this.click(await locator)
    await locator.fill(text, fillOptions)
  }

  async fillInputWithType (locator, text, options = {}) {
    const defaultOptions = this._getDefaultOptions(options)
    const fillOptions = { ...defaultOptions, delay: 100, ...options }
    await this.waitForVisible(await locator, options)
    await this.click(await locator)
    await locator.clear()
    await locator.type(text, fillOptions)
  }

  /**
   * Fills an input box with specified text. This method sets the value of the field directly and does not simulate keystrokes.
   * @param {Locator} locator - Element locator for the input box.
   * @param {string} text - The text to fill into the input box.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the input box is filled with the specified text.
   */
  async pressUsingKey (locator, keyToPress, options = {}) {
    const defaultOptions = this._getDefaultOptions(options)
    const fillOptions = { ...defaultOptions, ...options }
    await this.waitForVisible(await locator, options)
    await locator.press(keyToPress, fillOptions)
  }

  /**
   * Selects a radio button.
   * @param {Locator} locator - Element locator for the radio button.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the radio button is selected.
   */
  async selectRadio (locator, options = {}) {
    await this.waitForClickable(await locator, options)
    await locator.check(this._getDefaultOptions(options))
  }

  async selectDropDown (locator, valueToSet, options = {}) {
    await this.click(await locator)
    const elementToSelect = await this.page.getByText(valueToSet)
    await this.click(elementToSelect)
  }

  /**
   * Checks a checkbox if it is not already checked.
   * @param {Locator} locator - Element locator for the checkbox.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the checkbox is checked.
   */
  async checkCheckbox (locator, options = {}) {
    await this.waitForClickable(await locator, options)
    if (!(await locator.isChecked())) {
      await locator.hover()
      await locator.check(this._getDefaultOptions(options))
    }
  }

  /**
   * Unchecks a checkbox if it is currently checked.
   * @param {Locator} locator - Element locator for the checkbox.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the checkbox is unchecked.
   */
  async uncheckCheckbox (locator, options = {}) {
    await this.waitForClickable(await locator, options)
    if (await locator.isChecked()) {
      await locator.uncheck(this._getDefaultOptions(options))
    }
  }

  /**
   * Types text into an auto-complete field. Additional logic may be needed
   * to handle the selection from auto-complete suggestions.
   * @param {Locator} locator - Element locator for the auto-complete element.
   * @param {string} text - Text to type into the auto-complete field.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when text is typed into the field.
   */
  async autoCompleteSelect (
    locatorToType,
    text,
    locatorToClickOn,
    options = {}
  ) {
    await this.waitForVisible(await locatorToType, options)
    await this.click(await locatorToType)
    await this.fillInput(await locatorToType, text)
    await this.waitForVisible(await locatorToClickOn, options)
    await this.click(await locatorToClickOn, this._getDefaultOptions(options))
  }

  /**
   * Performs a double-click on an element.
   * @param {Locator} locator - Element locator for the element to double-click.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the double-click action is completed.
   */
  async doubleClick (locator, options = {}) {
    await this.waitForClickable(await locator, options)
    await locator.dblclick(this._getDefaultOptions(options))
  }

  /**
   * Clears the text in an input field.
   * @param {Locator} locator - Element locator for for the input field.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the input field is cleared.
   */
  async clearInput (locator, options = {}) {
    await this.waitForVisible(await locator, options)
    await locator.clear()
  }

  /**
   * Performs a drag-and-drop operation from a source element to a target element.
   * @param {Locator} sourceLocator - Element locator for the source element.
   * @param {Locator} targetLocator - Element locator for the target element.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the drag-and-drop operation is completed.
   */
  async dragAndDrop (sourceLocator, targetLocator, options = {}) {
    await this.waitForVisible(sourceLocator, options)
    await this.waitForVisible(targetLocator, options)

    const sourceBoundingBox = await sourceLocator.boundingBox()
    const targetBoundingBox = await targetLocator.boundingBox()

    await this.page.mouse.move(
      sourceBoundingBox.x + sourceBoundingBox.width / 2,
      sourceBoundingBox.y + sourceBoundingBox.height / 2
    )
    await this.page.mouse.down()

    await this.page.mouse.move(
      targetBoundingBox.x + targetBoundingBox.width / 2,
      targetBoundingBox.y + targetBoundingBox.height / 2,
      { steps: 10, ...this._getDefaultOptions(options) }
    )

    await this.page.mouse.up()
  }

  /**
   * Extracts text from a specified element.
   * @param {Locator} locator - Locator of the element whose text needs to be extracted.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<string>} - Resolves with the text content of the element.
   */
  async getText (locator, options = {}) {
    await this.waitForVisible(await locator, options)
    const elementText = await locator.textContent(this._getDefaultOptions(options))
    return elementText.trim()
  }

  async getInputValue (locator, options = {}) {
    await this.waitForVisible(await locator, options)
    const elementText = await locator.inputValue(this._getDefaultOptions(options))
    return elementText.trim()
  }

  async getAllInputValues (locator, options = {}) {
    const actualInputValues = []
    const allMatchingLocators = await locator.all()
    for (const loc of allMatchingLocators) {
      await this.waitForVisible(await loc, options)
      actualInputValues.push(await this.getInputValue(loc))
    }
    return actualInputValues
  }

  /**
   * Extracts text from all elements matching the specified locator.
   * @param {Locator} locator - Element locator of all matching locators.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<string[]>} - Resolves with an array of text contents from all matching elements.
   */
  async getAllTexts (locator, options = {}) {
    const mergedOptions = this._getDefaultOptions(options)
    await locator.first().waitFor(mergedOptions)
    const allTexts = await locator.allTextContents()
    return allTexts.map(text => text.trim())
  }

  async getAllSelectedTextsFromMultiSelect (locator) {
    const allTexts = []
    const allMatchingLocators = await locator.all()
    for (const loc of allMatchingLocators) {
      allTexts.push(await loc.textContent())
    }
    return allTexts
  }

  async getAllMatchingElements (locator) {
    return await locator.all()
  }

  async getAttributeValue (locator, attribute, options = {}) {
    await this.waitForVisible(await locator, options)
    return await locator.getAttribute(attribute)
  }

  async scrollDownListEntirely (targetOptions) {
    const options = await targetOptions
    const optionsSize = await options.count()
    if (optionsSize > 0) {
      const lastItem = options.nth(optionsSize - 1)
      await this.page.waitForTimeout(500)
      await lastItem.scrollIntoViewIfNeeded()
    }
  }

  async getSizeOfElement (element) {
    return await element.boundingBox()
  }

  async getTotalMatchingLocator (locator) {
    return (await locator.count())
  }

  async getAllMatchingLocators (locator) {
    return (await locator.all())
  }
}

module.exports = { WebElementHandler }
