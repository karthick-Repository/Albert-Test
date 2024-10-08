const { expect } = require('@playwright/test')
const { WebElementHandler } = require('./WebElementHandler')
const logger = require('./Logger')

class AssertionHandler {
  constructor (page) {
    this.page = page
    this.webElementHandler = new WebElementHandler(this.page)
  }

  /**
 * Helper function to get and log element texts
 * @param {Locator} actualLocator - Locator for elements to fetch text from
 * @returns {Array} - Texts from found elements
 */
  async fetchAndLogElementTexts (actualLocator) {
    const elements = await actualLocator
    const actualValues = await this.webElementHandler.getAllTexts(elements)
    logger.info(`Actual values from UI: ${actualValues}`)
    return actualValues
  }

  /**
 * Asserts that all texts from a list of elements match the expected texts.
 * @param {Locator} actualLocator - The locator of the elements to check.
 * @param {string} expectedText - A comma-separated string of expected texts.
 */
  async assertActualAndExpectedAllTexts (actualLocator, expectedText) {
    try {
      const expectedValues = typeof expectedText === 'string' ? expectedText.split(',').map(item => item.trim()) : expectedText
      logger.info(`Expected values: ${expectedValues}`)
      const elements = await actualLocator
      const actualValues = await this.webElementHandler.getAllTexts(await elements)
      logger.info(`Actual values from UI: ${actualValues}`)
      expect(actualValues).toMatchObject(expectedValues)
    } catch (error) {
      console.error('Error in assertActualAndExpectedAllTexts:', error)
      throw error
    }
  }

  /**
 * Asserts that all texts from a list of elements match the expected texts.
 * @param {Locator} actualLocator - The locator of the elements to check.
 * @param {string} expectedText - A comma-separated string of expected texts.
 */
  async assertActualAndExpectedInputValues (actualLocator, expectedText) {
    try {
      const expectedValues = typeof expectedText === 'string' ? expectedText.split(',').map(item => item.trim()) : expectedText
      logger.info(`Expected values: ${expectedValues}`)
      const actualValues = await this.webElementHandler.getAllInputValues(await actualLocator)
      logger.info(`Actual values from UI: ${actualValues}`)
      expect(actualValues).toMatchObject(expectedValues)
    } catch (error) {
      console.error('Error in assertActualAndExpectedAllTexts:', error)
      throw error
    }
  }

  /**
 * Asserts that actual texts contain expected texts.
 * @param {Locator} actualLocator - The locator of the elements to check.
 * @param {string} expectedText - A comma-separated string of expected texts.
 */
  async assertActualContainsExpectedAllTexts (actualLocator, expectedText) {
    try {
      const expectedValues = typeof expectedText === 'string' ? expectedText.split(',').map(item => item.trim()) : expectedText
      logger.info(`Expected values: ${expectedValues}`)
      const actualValues = await this.fetchAndLogElementTexts(await actualLocator)

      expectedValues.forEach((expectedValue, index) => {
        if (!actualValues[index].includes(expectedValue)) {
          throw new Error(`Mismatch at index ${index}: expected '${expectedValue}' to be part of '${actualValues[index]}'`)
        }
      })
    } catch (error) {
      console.error('Error in assertActualContainsExpectedAllTexts:', error)
      throw error
    }
  }

  /**
 * Asserts that all texts from a list of elements contain the expected texts.
 * @param {Locator} actualLocator - The locator of the elements to check.
 * @param {string} expectedText - A comma-separated string of expected texts.
 */
  async assertActualContainsExpected (actualLocator, expectedText) {
    try {
      const expectedValues = typeof expectedText === 'string' ? expectedText.split(',').map((item) => item.trim()) : expectedText
      logger.info(`Expected values: ${expectedValues}`)
      const elements = await actualLocator
      const actualValues = await this.webElementHandler.getAllTexts(elements)
      logger.info(`Actual values from UI: ${actualValues}`)
      expect(actualValues).toEqual(expect.arrayContaining(expectedValues))
    } catch (error) {
      console.error('Error in assertActualAndExpectedAllTexts: ', error)
      throw error
    }
  }

  async assertWithToBe (actualText, expectedText) {
    logger.info(`The actual text is : ${actualText}`)
    logger.info(`The expected text is : ${expectedText}`)
    expect(actualText).toBe(expectedText)
  }

  /**
   * Asserts that the text of an element matches the expected text.
   * @param {Locator} actualLocator - The locator of the element to check.
   * @param {string} expectedText - The expected text to compare against.
   */
  async assertActualAndExpectedText (actualLocator, expectedText) {
    try {
      logger.info(`Expected value: ${expectedText}`)
      const actualValue = await this.webElementHandler.getText(await actualLocator)
      logger.info(`Actual value from UI: ${actualValue}`)
      expect(actualValue).toBe(expectedText)
    } catch (error) {
      console.error('Error in assertActualAndExpectedText: ', error)
      throw error
    }
  }

  /**
   * Asserts that an element's attribute has a specific value.
   * @param {Locator} actualLocator - The locator of the element to check.
   * @param {string} expectedAttribute - The name of the attribute to check.
   * @param {string} expectedAttributeValue - The expected value of the attribute.
   */
  /**
   * Asserts the value of an attribute of an element. It can check for an exact match or if the attribute value contains a specific substring.
   *
   * @param {Locator} actualLocator - The Playwright locator for the element whose attribute is to be checked.
   * @param {string} expectedAttribute - The name of the attribute to check.
   * @param {string} expectedAttributeValue - The expected value (or substring) of the attribute.
   * @param {boolean} [checkContains=false] - Optional. If true, checks if the attribute value contains the expectedAttributeValue as a substring. Defaults to false, which checks for an exact match.
   *
   * @throws Will throw an error if the assertion fails or if an error occurs during execution.
   */
  async assertForAttributeValues (
    actualLocator,
    expectedAttribute,
    expectedAttributeValue,
    checkContains = false
  ) {
    try {
      const element = await actualLocator
      await this.webElementHandler.waitForVisible(element)
      const actualAttributeValue = await element.getAttribute(
        expectedAttribute
      )

      if (checkContains) {
        // Check if actual attribute value contains the expected value
        expect(actualAttributeValue.includes(expectedAttributeValue)).toBe(
          true
        )
      } else {
        // Check if actual attribute value matches the expected value exactly
        expect(actualAttributeValue).toBe(expectedAttributeValue)
      }
    } catch (error) {
      console.error('Error in assertForAttributeValues: ', error)
      throw error
    }
  }

  /**
   * Waits for the URL to match a specific regular expression.
   * @param {RegExp|string} urlRegex - The regular expression or string to match the URL.
   */
  async assertForURL (urlRegex) {
    const currentURL = await this.page.url()
    expect(currentURL).toContain(urlRegex)
  }

  /**
   * Asserts that two objects match.
   * @param {Object} actualObject - The actual object to compare.
   * @param {Object} expectedObject - The expected object to match against.
   */
  async assertObjects (actualObject, expectedObject) {
    logger.info(`The actual object is : ${actualObject}`)
    logger.info(`The expected object is : ${expectedObject}`)
    expect(actualObject).toMatchObject(expectedObject)
  }

  /**
   * Asserts that the result of `assertObjects` is falsy, indicating a mismatch between the actual and expected objects.
   * @param {Object} actualObject - The actual object to compare.
   * @param {Object} expectedObject - The expected object to match against.
   */
  async assertObjectsFalsy (actualObject, expectedObject) {
    expect(this.assertObjects(actualObject, expectedObject)).toBeFalsy()
  }

  /**
   * Asserts that an element is visible.
   * @param {Locator} element - The locator of the element to check for visibility.
   */
  async assertForVisibility (element) {
    expect(await element).toBeVisible()
  }

  async assertForTextContains (element, expectedTest) {
    expect(await element).toContainText(expectedTest)
  }

  async assertCheckBoxStatus (targetElement, checkStatus) {
    checkStatus === 'checked' ? expect(await targetElement).toBeChecked() : expect(await targetElement.isChecked()).toBeFalsy()
  }

  async assertForContains (actualText, expectedText) {
    logger.info(`The actual text is : ${actualText}`)
    logger.info(`The expected text is : ${expectedText}`)
    expect(actualText.includes(expectedText)).toBeTruthy()
  }
}

module.exports = { AssertionHandler }
