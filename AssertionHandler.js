const { expect } = require('@playwright/test')
const { WebElementHandler } = require('./WebElementHandler')
const logger = require('./Logger')

class AssertionHandler {
  constructor (page) {
    this.page = page
    this.webElementHandler = new WebElementHandler(this.page)
  }

  /**
   * Helper function to get and log element texts.
   * @param {import('playwright').Locator} actualLocator - Locator for elements to fetch text from.
   * @returns {Promise<string[]>} Texts from found elements.
   */
  async fetchAndLogElementTexts (actualLocator) {
    const actualValues = await this.webElementHandler.getAllTexts(actualLocator)
    logger.info(`Actual values from UI: ${actualValues}`)
    return actualValues
  }

  /**
   * Asserts that all texts from a list of elements match the expected texts.
   * @param {import('playwright').Locator} actualLocator - The locator of the elements to check.
   * @param {string | string[]} expectedText - A comma-separated string or an array of expected texts.
   */
  async assertActualAndExpectedAllTexts (actualLocator, expectedText) {
    try {
      const expectedValues = Array.isArray(expectedText) ? expectedText : expectedText.split(',').map(item => item.trim())
      logger.info(`Expected values: ${expectedValues}`)
      const actualValues = await this.fetchAndLogElementTexts(actualLocator)
      expect(actualValues).toEqual(expectedValues)
    } catch (error) {
      logger.error('Error in assertActualAndExpectedAllTexts:', error)
      throw error
    }
  }

  /**
   * Asserts that all input values from a list of elements match the expected texts.
   * @param {import('playwright').Locator} actualLocator - The locator of the elements to check.
   * @param {string | string[]} expectedText - A comma-separated string or an array of expected texts.
   */
  async assertActualAndExpectedInputValues (actualLocator, expectedText) {
    try {
      const expectedValues = Array.isArray(expectedText) ? expectedText : expectedText.split(',').map(item => item.trim())
      logger.info(`Expected values: ${expectedValues}`)
      const actualValues = await this.webElementHandler.getAllInputValues(await actualLocator)
      logger.info(`Actual values from UI: ${actualValues}`)
      expect(actualValues).toEqual(expectedValues)
    } catch (error) {
      logger.error('Error in assertActualAndExpectedInputValues:', error)
      throw error
    }
  }

  /**
   * Asserts that actual texts contain expected texts.
   * @param {import('playwright').Locator} actualLocator - The locator of the elements to check.
   * @param {string | string[]} expectedText - A comma-separated string or an array of expected texts.
   */
  async assertActualContainsExpectedAllTexts (actualLocator, expectedText) {
    try {
      const expectedValues = Array.isArray(expectedText) ? expectedText : expectedText.split(',').map(item => item.trim())
      logger.info(`Expected values: ${expectedValues}`)
      const actualValues = await this.fetchAndLogElementTexts(actualLocator)

      expectedValues.forEach((expectedValue, index) => {
        if (!actualValues[index].includes(expectedValue)) {
          throw new Error(`Mismatch at index ${index}: expected '${expectedValue}' to be part of '${actualValues[index]}'`)
        }
      })
    } catch (error) {
      logger.error('Error in assertActualContainsExpectedAllTexts:', error)
      throw error
    }
  }

  /**
   * Asserts that all texts from a list of elements contain the expected texts.
   * @param {import('playwright').Locator} actualLocator - The locator of the elements to check.
   * @param {string | string[]} expectedText - A comma-separated string or an array of expected texts.
   */
  async assertActualContainsExpected (actualLocator, expectedText) {
    try {
      const expectedValues = Array.isArray(expectedText) ? expectedText : expectedText.split(',').map(item => item.trim())
      logger.info(`Expected values: ${expectedValues}`)
      const actualValues = await this.fetchAndLogElementTexts(actualLocator)
      expect(actualValues).toEqual(expect.arrayContaining(expectedValues))
    } catch (error) {
      logger.error('Error in assertActualContainsExpected:', error)
      throw error
    }
  }

  /**
   * Asserts that the actual text is equal to the expected text.
   * @param {string} actualText - The actual text.
   * @param {string} expectedText - The expected text.
   */
  async assertWithToBe (actualText, expectedText) {
    logger.info(`The actual text is: ${actualText}`)
    logger.info(`The expected text is: ${expectedText}`)
    expect(actualText).toBe(expectedText)
  }

  /**
   * Asserts that the text of an element matches the expected text.
   * @param {import('playwright').Locator} actualLocator - The locator of the element to check.
   * @param {string} expectedText - The expected text to compare against.
   */
  async assertActualAndExpectedText (actualLocator, expectedText) {
    try {
      logger.info(`Expected value: ${expectedText}`)
      const actualValue = await this.webElementHandler.getText(await actualLocator)
      logger.info(`Actual value from UI: ${actualValue}`)
      expect(actualValue).toBe(expectedText)
    } catch (error) {
      logger.error('Error in assertActualAndExpectedText:', error)
      throw error
    }
  }

  /**
   * Asserts the value of an attribute of an element.
   * @param {import('playwright').Locator} actualLocator - The locator of the element to check.
   * @param {string} expectedAttribute - The name of the attribute to check.
   * @param {string} expectedAttributeValue - The expected value of the attribute.
   * @param {boolean} [checkContains=false] - Optional. If true, checks if the attribute value contains the expectedAttributeValue as a substring.
   */
  async assertForAttributeValues (actualLocator, expectedAttribute, expectedAttributeValue, checkContains = false) {
    try {
      const actualAttributeValue = await actualLocator.getAttribute(expectedAttribute)
      logger.info(`Actual attribute value is  : ${actualAttributeValue}`)
      logger.info(`Expected attribute value is  : ${expectedAttributeValue}`)
      if (checkContains) {
        expect(actualAttributeValue.includes(expectedAttributeValue)).toBeTruthy()
        // expect(new RegExp(expectedAttributeValue).test(actualAttributeValue)).toBe(true)
      } else {
        await expect(actualLocator).toHaveAttribute(expectedAttribute, expectedAttributeValue)
      }
    } catch (error) {
      logger.error('Error in assertForAttributeValues:', error)
      throw error
    }
  }

  async assertForAttributeValuesContains (actualLocator, expectedAttribute, expectedAttributeValue) {
    try {
      const actualAttributeValue = await actualLocator.getAttribute(expectedAttribute)
      logger.info(`Actual attribute value is  : ${actualAttributeValue}`)
      logger.info(`Expected attribute value is  : ${expectedAttributeValue}`)
      expect(actualAttributeValue.includes(expectedAttributeValue)).toBeTruthy()
    } catch (error) {
      logger.error('Error in assertForAttributeValues:', error)
      throw error
    }
  }

  /**
   * Waits for the URL to match a specific regular expression.
   * @param {RegExp | string} urlRegex - The regular expression or string to match the URL.
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
    logger.info(`The actual object is: ${JSON.stringify(actualObject)}`)
    logger.info(`The expected object is: ${JSON.stringify(expectedObject)}`)
    expect(actualObject).toMatchObject(expectedObject)
  }

  /**
   * Asserts that the result of `assertObjects` is falsy, indicating a mismatch between the actual and expected objects.
   * @param {Object} actualObject - The actual object to compare.
   * @param {Object} expectedObject - The expected object to match against.
   */
  async assertObjectsFalsy (actualObject, expectedObject) {
    logger.info(`The actual object is: ${JSON.stringify(actualObject)}`)
    logger.info(`The expected object is: ${JSON.stringify(expectedObject)}`)
    expect(this.assertObjects(actualObject, expectedObject)).toBeFalsy()
  }

  /**
   * Asserts that an element is visible.
   * @param {import('playwright').Locator} element - The locator of the element to check for visibility.
   */
  async assertForVisibility (element) {
    expect(await element.isVisible()).toBe(true)
  }

  /**
   * Asserts that an element's text contains the expected text.
   * @param {import('playwright').Locator} element - The locator of the element.
   * @param {string} expectedText - The expected text to be contained.
   */
  async assertActualAndExpectedText_M (actualLocator, expectedText) {
    try {
      console.log(`Expected value: ${expectedText}`)
      const actualValue = await actualLocator.textContent()
      console.log(`Actual value from UI: ${actualValue.trim()}`)
      expect(actualValue.trim()).toBe(expectedText)
    } catch (error) {
      console.error('Error in assertActualAndExpectedText: ', error)
      throw error
    }
  }

  async assertForTextContains (element, expectedText) {
    const elementText = await element.textContent()
    const normalizedElementText = elementText.replace(/\s+/g, ' ').trim()
    const normalizedExpectedText = expectedText.replace(/\s+/g, ' ').trim()

    expect(normalizedElementText).toContain(normalizedExpectedText)
  }

  /**
   * Asserts the checkbox status (checked or unchecked).
   * @param {import('playwright').Locator} targetElement - The locator of the checkbox element.
   * @param {string} checkStatus - The expected status ('checked' or 'unchecked').
   */
  async assertCheckBoxStatus (targetElement, checkStatus) {
    checkStatus === 'checked' ? expect(await targetElement.isChecked()).toBe(true) : expect(await targetElement.isChecked()).toBe(false)
  }

  /**
   * Asserts that the actual text contains the expected text.
   * @param {string} actualText - The actual text.
   * @param {string} expectedText - The expected text to be contained.
   */
  async assertForContains (actualText, expectedText) {
    logger.info(`The actual text is: ${actualText}`)
    logger.info(`The expected text is: ${expectedText}`)
    expect(actualText.includes(expectedText)).toBe(true)
  }

  async assertForElementCount (expectedElement, expectedCount) {
    expect(await expectedElement).toHaveCount(expectedCount)
  }
}

module.exports = { AssertionHandler }
