/**
 * Provides enhanced interactions with web elements using Playwright.
 */
class WebElementHandler {
  constructor (page) {
    this.page = page
    this.defaultElementTimeout = 1 * 60 * 1000 // 1-minute timeout
  }

  /**
   * Merges default options with provided options.
   * @private
   * @param {Object} [options={}] - Optional configurations.
   * @returns {Object} - Merged options.
   */
  _getDefaultOptions (options = {}) {
    return { timeout: this.defaultElementTimeout, ...options }
  }

  /**
   * Asynchronously returns an element handle after evaluating the provided locator string.
   * @param {string} locatorString - The CSS selector string used to locate the elements.
   * @param {number} [indexOfElement=0] - The index of the element to be returned from the list of matched elements.
   * @returns {Promise<ElementHandle>} - A promise that resolves to the element handle.
   * @throws {Error} - Throws an error if the element is not found.
   */
  async returnElementAfterEvaluation (locatorString, indexOfElement = 0) {
    const evaluatedElementHandle = await this.page.evaluateHandle(
      ({ locator, index }) => {
        const elements = document.querySelectorAll(locator)
        return elements[index] || null // Return the element or null if not found
      },
      { locator: locatorString, index: indexOfElement }
    )

    const elementHandle = evaluatedElementHandle.asElement()
    if (!elementHandle) {
      await evaluatedElementHandle.dispose() // Clean up memory if no element was found
      throw new Error(`Element with locator "${locatorString}" and index "${indexOfElement}" was not found.`)
    }

    return elementHandle // Return the element handle for further use
  }

  /**
   * Checks if an element is visible on the page.
   * @param {Locator} locator - Element locator.
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
   * @param {Locator} locator - Element locator.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the element is clickable.
   */
  async waitForClickable (locator, options = {}) {
    await this.waitForVisible(locator, options)
    await locator.waitFor({
      state: 'attached',
      ...this._getDefaultOptions(options)
    })
  }

  /**
   * Clicks on a visible and clickable element.
   * @param {Locator} locator - Element locator.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the click action is completed.
   */
  async click (locator, options = {}) {
    await this.waitForClickable(locator, options)
    await locator.click(this._getDefaultOptions(options))
  }

  /**
   * Fills an input box with specified text.
   * @param {Locator} locator - Element locator for the input box.
   * @param {string} text - The text to fill into the input box.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the input box is filled with the specified text.
   */
  async fillInput (locator, text, options = {}) {
    const fillOptions = this._getDefaultOptions(options)
    await this.waitForVisible(locator, options)
    await locator.clear()
    await locator.fill(text, fillOptions)
  }

  /**
   * Fills an input without clearing it first.
   * @param {Locator} locator - Element locator.
   * @param {string} text - Text to fill.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the input is filled.
   */
  async fillInputWithoutClear (locator, text, options = {}) {
    const fillOptions = this._getDefaultOptions(options)
    await this.waitForVisible(locator, options)
    await this.click(locator)
    await locator.fill(text, fillOptions)
  }

  /**
   * Fills an input box with specified text using typing.
   * @param {Locator} locator - Element locator.
   * @param {string} text - Text to type.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the text is typed.
   */
  async fillInputWithType (locator, text, options = {}) {
    const defaultOptions = this._getDefaultOptions(options)
    const fillOptions = { ...defaultOptions, delay: 30, ...options }
    await this.waitForVisible(locator, options)
    await this.click(locator)
    await locator.clear()
    await locator.type(text, fillOptions)
  }

  /**
   * Presses a key on an element.
   * @param {Locator} locator - Element locator.
   * @param {string} keyToPress - The key to press.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the key is pressed.
   */
  async pressUsingKey (locator, keyToPress, options = {}) {
    const fillOptions = this._getDefaultOptions(options)
    await this.waitForVisible(locator, options)
    await locator.press(keyToPress, fillOptions)
  }

  /**
   * Presses a key multiple times on an element.
   * @param {Locator} locator - Element locator.
   * @param {string} keyToPress - The key to press.
   * @param {number} numberOfTimes - Number of times to press the key.
   * @returns {Promise<void>} - Resolves when the key is pressed the specified number of times.
   */
  async pressKeyMultipleTimes (locator, keyToPress, numberOfTimes, options = {}) {
    const fillOptions = this._getDefaultOptions(options)
    while (numberOfTimes > 0) {
      await this.pressUsingKey(locator, keyToPress, fillOptions)
      numberOfTimes--
    }
  }

  /**
   * Selects a radio button.
   * @param {Locator} locator - Element locator for the radio button.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the radio button is selected.
   */
  async selectRadio (locator, options = {}) {
    await this.waitForClickable(locator, options)
    await locator.check(this._getDefaultOptions(options))
  }

  /**
   * Selects an option from a dropdown.
   * @param {Locator} locator - Element locator for the dropdown.
   * @param {string} valueToSet - The value to select from the dropdown.
   * @returns {Promise<void>} - Resolves when the option is selected.
   */
  async selectDropDown (locator, valueToSet) {
    await this.click(locator)
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
    await this.waitForClickable(locator, options)
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
    await this.waitForClickable(locator, options)
    if (await locator.isChecked()) {
      await locator.uncheck(this._getDefaultOptions(options))
    }
  }

  /**
   * Types text into an auto-complete field.
   * @param {Locator} locatorToType - Element locator for the auto-complete field.
   * @param {string} text - Text to type into the auto-complete field.
   * @param {Locator} locatorToClickOn - Element locator for the auto-complete suggestion.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the text is typed into the field.
   */
  async autoCompleteSelect (locatorToType, text, locatorToClickOn, options = {}) {
    await this.waitForVisible(locatorToType, options)
    await this.click(locatorToType)
    await this.fillInput(locatorToType, text)
    await this.waitForVisible(locatorToClickOn, options)
    await this.click(locatorToClickOn, this._getDefaultOptions(options))
  }

  /**
 * Performs a double-click on an element.
 * @param {Locator} locator - Element locator for the element to double-click.
 * @param {Object} [options={}] - Optional configurations, including timeout.
 * @returns {Promise<void>} - Resolves when the double-click action is completed.
 */
  async doubleClick (locator, options = {}) {
    await this.waitForClickable(locator, options)
    await locator.dblclick(this._getDefaultOptions(options))
  }

  /**
 * Clears the text in an input field.
 * @param {Locator} locator - Element locator for the input field.
 * @param {Object} [options={}] - Optional configurations, including timeout.
 * @returns {Promise<void>} - Resolves when the input field is cleared.
 */
  async clearInput (locator, options = {}) {
    await this.waitForVisible(locator, options)
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
    await this.waitForVisible(locator, options)
    const elementText = await locator.textContent(this._getDefaultOptions(options))
    return elementText ? elementText.trim() : ''
  }

  /**
 * Gets the value of an input field.
 * @param {Locator} locator - Element locator or selector string.
 * @param {Object} [options={}] - Optional configurations, including timeout.
 * @returns {Promise<string>} - Resolves with the input value.
 */
  async getInputValue (locator, options = {}) {
    await this.waitForVisible(locator, options)
    const inputValue = await locator.inputValue(this._getDefaultOptions(options))
    return inputValue.trim()
  }

  /**
 * Gets all input values from elements matching the locator.
 * @param {Locator} locator - Element locator or selector string.
 * @param {Object} [options={}] - Optional configurations, including timeout.
 * @returns {Promise<string[]>} - Resolves with an array of input values.
 */
  async getAllInputValues (locator, options = {}) {
    const actualInputValues = []
    const allMatchingLocators = await locator.all()
    for (const loc of allMatchingLocators) {
      await this.waitForVisible(loc, options)
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
    return allTexts.map((text) => text.trim())
  }

  /**
 * Gets all selected texts from a multi-select element.
 * @param {Locator} locator - Locator for the multi-select element.
 * @returns {Promise<string[]>} - Resolves with an array of selected text values.
 */
  async getAllSelectedTextsFromMultiSelect (locator) {
    const allTexts = []
    const allMatchingLocators = await locator.all()
    for (const loc of allMatchingLocators) {
      allTexts.push(await loc.textContent())
    }
    return allTexts
  }

  /**
 * Gets all elements matching a locator.
 * @param {Locator} locator - Element locator or selector string.
 * @returns {Promise<ElementHandle[]>} - Resolves with an array of element handles.
 */
  async getAllMatchingElements (locator) {
    return await locator.all()
  }

  /**
 * Gets an attribute value from an element.
 * @param {Locator} locator - Element locator or selector string.
 * @param {string} attribute - The attribute name to retrieve the value from.
 * @param {Object} [options={}] - Optional configurations, including timeout.
 * @returns {Promise<string|null>} - Resolves with the attribute value, or null if not found.
 */
  async getAttributeValue (locator, attribute, options = {}) {
    await this.waitForVisible(locator, options)
    return await locator.getAttribute(attribute)
  }

  /**
 * Scrolls down a list entirely.
 * @param {Locator} targetOptions - The target locator options to scroll through.
 */
  async scrollDownListEntirely (targetOptions) {
    const options = await targetOptions
    const optionsSize = await options.count()
    if (optionsSize > 0) {
      const lastItem = options.nth(optionsSize - 1)
      await this.page.waitForTimeout(500)
      await lastItem.scrollIntoViewIfNeeded()
    }
  }

  /**
 * Gets the size of an element.
 * @param {Locator} element - Element locator or selector string.
 * @returns {Promise<Object>} - Resolves with the size of the element.
 */
  async getSizeOfElement (element) {
    return await element.boundingBox()
  }

  /**
 * Gets the total count of elements matching a locator.
 * @param {Locator} locator - Element locator or selector string.
 * @returns {Promise<number>} - Resolves with the count of matching elements.
 */
  async getTotalMatchingLocator (locator) {
    return await locator.count()
  }

  /**
 * Performs a scroll operation on an element.
 * @param {string} scrollType - The direction of the scroll ('up', 'down', 'left', 'right').
 * @param {number} pixelSize - The number of pixels to scroll.
 * @param {Locator} locator - Element locator or selector string.
 * @returns {Promise<void>} - Resolves when the scroll action is completed.
 */
  async performScroll (scrollType, pixelSize, locator) {
    await this.page.evaluate(
      ({ scrollType, pixelSize, locator }) => {
        const element = document.evaluate(
          locator,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue

        if (element) {
          if (scrollType === 'right') {
            element.scrollLeft += pixelSize
          } else if (scrollType === 'left') {
            element.scrollLeft -= pixelSize
          } else if (scrollType === 'down') {
            element.scrollTop += pixelSize
          } else if (scrollType === 'up') {
            element.scrollTop -= pixelSize
          }
        }
      },
      { scrollType, pixelSize, locator }
    )
  }

  /**
 * Extracts a number from a string.
 * @param {string} str - The string to extract the number from.
 * @returns {Promise<number|null>} - Resolves with the extracted number, or null if not found.
 */
  async extractNumber (str) {
    const match = str.match(/\d+(\.\d+)?/)
    return match ? parseFloat(match[0]) : null
  }

  /**
 * Performs a mouse wheel scroll.
 * @param {number} scrollHorizontalPixels - Number of pixels to scroll horizontally.
 * @param {number} scrollVerticalPixels - Number of pixels to scroll vertically.
 * @returns {Promise<void>} - Resolves when the scroll action is completed.
 */
  async mouseWheelScroll (scrollHorizontalPixels, scrollVerticalPixels) {
    await this.page.mouse.wheel(scrollHorizontalPixels, scrollVerticalPixels)
  }

  /**
   * Clicks an element inside a shadow DOM.
   * @returns {Promise<void>} - Resolves when the click action is completed.
   */
  async clickUsingEvaluate () {
    await this.page.evaluate(() => {
      const shadowHost = document.querySelector('maya-list[operationid="validateEmail"]')
      const button = shadowHost.shadowRoot.querySelector('[operationid="removeUser"]')
      button.click()
    })
  }

  /**
   * Extracts all matching locators.
   * @param {Locator} locator - Element locator.
   * @returns {Promise<ElementHandle[]>} - Resolves with an array of element handles.
   */
  async getAllMatchingLocators (locator) {
    const allLocs = await locator.all()
    return allLocs
  }

  /**
   * Scrolls to the bottom of a list to load all elements.
   * @param {Locator} locator - The locator of the list or container element.
   * @param {Object} [options={}] - Optional configurations.
   * @returns {Promise<void>} - Resolves when all elements are loaded.
   */
  async scrollToEnd (locator, options = {}) {
    const mergedOptions = this._getDefaultOptions(options)
    let lastHeight = await this.page.evaluate('document.body.scrollHeight')
    while (true) {
      await this.page.mouse.wheel(0, lastHeight)
      await this.page.waitForTimeout(200)
      const newHeight = await this.page.evaluate('document.body.scrollHeight')
      if (newHeight === lastHeight) break
      lastHeight = newHeight
    }
  }

  /**
   * Checks if an element is present in the DOM.
   * @param {Locator} locator - Element locator or selector string.
   * @returns {Promise<boolean>} - Resolves with true if the element is present, otherwise false.
   */
  async isElementPresent (locator) {
    const elementsCount = await locator.count()
    return elementsCount > 0
  }

  /**
   * Selects an option by text from a dropdown.
   * @param {Locator} locator - The dropdown locator.
   * @param {string} text - The text to select.
   * @returns {Promise<void>} - Resolves when the option is selected.
   */
  async selectOptionByText (locator, text) {
    const elementHandle = await this.returnElementAfterEvaluation(locator)
    await this.page.evaluate(
      (element, text) => {
        const options = Array.from(element.options)
        const optionToSelect = options.find(option => option.text === text)
        if (optionToSelect) {
          optionToSelect.selected = true
        }
      },
      elementHandle,
      text
    )
  }

  /**
   * Performs a mouse hover over an element.
   * @param {Locator} locator - The element locator.
   * @param {Object} [options={}] - Optional configurations, including timeout.
   * @returns {Promise<void>} - Resolves when the hover action is completed.
   */
  async hoverOverElement (locator, options = {}) {
    const elementHandle = await this.returnElementAfterEvaluation(locator)
    await elementHandle.hover(this._getDefaultOptions(options))
  }

  async typeHashAndSpace(headerPlaceHolder, headingName)  {
    const specialCharatcter = headingName.split('+')[0]
    await this.page.keyboard.type(specialCharatcter);
    // Press "Space"
    await this.page.keyboard.press('Space');
  };
}

module.exports = { WebElementHandler }
