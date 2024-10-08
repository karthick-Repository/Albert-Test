const { WebElementHandler } = require('../../utilities/WebElementHandler')
const { getEnvironmentURL } = require('../../utilities/EnvironmentHelper')
const { expect } = require('@playwright/test')
const { AssertionHandler } = require('../../utilities/AssertionHandler')
const logger = require('../../utilities/Logger')

/**
 * BasePage class as a foundation for all page objects.
 * This class provides common functionality that can be used across different pages.
 */
class BasePage {
  /**
   * Constructs the BasePage object.
   * @param {object} page - The Playwright page object.
   */
  constructor (page) {
    this.page = page
    this.envURL = getEnvironmentURL()
    this.defaultTimeout = 2 * 60 * 1000
    this.assertionHandler = new AssertionHandler(this.page)
    this.webElementHandler = new WebElementHandler(this.page)
    this.nameInput = page.locator('#name')
    this.dialog = page.locator(
      "[role='dialog'][class*='p-dialog p-dynamic-dialog']"
    )
    this.dialogHeading = this.dialog.locator("[class*='pp-heading']")
    this.createButton = page.getByRole('button', { name: 'Create' })
    this.cancelButton = page.getByRole('button', { name: 'Cancel' })
    this.saveButton = page.getByRole('button', { name: 'Save' })
    this.editButton = page.getByRole('button', { name: 'Edit' })
    this.closeButton = page.getByRole('button', { name: 'Close' })
    this.add_Button = page.getByRole('button', { name: 'Add' })
    this.searchInput = page.locator('[placeholder="Search"]')
    this.closeIcon = page.locator('.sop-head-icon')
    this.pageHeading = page.locator('.heading-tab')
    this.addButton = page.getByRole('button', { name: 'Add' })
    this.yesButon = page.getByRole('button', { name: 'Yes' })
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.addNew = page.getByText('Add New:')
    this.optionsList = page.locator("li[role='option']")
    this.tabs = page.locator("[class*='tab']")
    this.name_Input = page.locator('#name')
    this.defaultOwner_Text = page.locator('.p-autocomplete-token-label')
    this.note_TextArea = page.locator('[placeholder="Add a note"]')
    this.allNotes = page.locator('#formatted')
    this.radioButtons = page.locator('input[type="radio"]')
    this.inputEditor = page.getByLabel('Input Editor')
    this.listBox = page.locator('[role="listbox"]')
    this.dropdownOptions = this.listBox.locator('li[role="option"]')
    this.tippyMessages = page.locator('.tippy-message')
    this.snackBarContainer = page.locator('mat-snack-bar-container')
    this.snackBarContainerCloseIcon = this.snackBarContainer.locator('mat-icon').last()
    this.agGridLoader = page.locator('.ag-grid-loader')
  }

  /**
   * Reloads the page and waits until it is fully loaded.
   */
  async reloadPage () {
    await this.page.reload({ timeout: this.defaultTimeout, waitUntil: 'load' })
  }

  /**
   * Navigates to the specified URL and waits until it is fully loaded.
   * @param {string} url - The URL to navigate to.
   */
  async gotoPage (url) {
    await this.page.goto(url, { timeout: this.defaultTimeout, waitUntil: 'load' })
  }

  /**
   * Fetches the current page URL.
   * @returns {Promise<string>} - The current page URL.
   */
  async fetchPageURL () {
    return await this.page.url()
  }

  /**
   * Waits for the URL to match a specific regular expression or string.
   * @param {RegExp|string} urlRegex - The regular expression or string to match the URL.
   */
  async waitForURL (urlRegex) {
    await this.page.waitForURL(urlRegex, { timeout: this.defaultTimeout, waitUntil: 'load' })
  }

  /**
   * Waits for the specified duration.
   * @param {number} durationInSeconds - The duration to wait in seconds.
   */
  async waitForDuration (durationInSeconds) {
    await this.page.waitForTimeout(durationInSeconds * 1000)
  }

  /**
   * Clicks on an element specified by the locator.
   * @param {Locator} iconLocator - The locator of the element to click.
   */
  async clickOnElement (iconLocator) {
    await this.webElementHandler.click(iconLocator)
  }

  /**
   * Asserts that all texts from a list of elements match the expected texts.
   * @param {Locator} actualLocator - The locator of the elements to check.
   * @param {string} expectedText - A comma-separated string of expected texts.
   */
  async assertActualAndExpectedAllTexts (actualLocator, expectedText) {
    try {
      const expectedValues = expectedText.split(',').map((item) => item.trim())
      logger.info(`Expected values: ${expectedValues}`)
      const elements = await actualLocator
      const actualValues = await this.webElementHandler.getAllTexts(elements)
      logger.info(`Actual values from UI: ${actualValues}`)
      expect(actualValues).toMatchObject(expectedValues)
    } catch (error) {
      console.error('Error in assertActualAndExpectedAllTexts: ', error)
      throw error
    }
  }

  /**
   * Asserts that the text of an element matches the expected text.
   * @param {Locator} actualLocator - The locator of the element to check.
   * @param {string} expectedText - The expected text to compare against.
   */
  async assertActualAndExpectedText (actualLocator, expectedText) {
    try {
      logger.info(`Expected value: ${expectedText}`)

      const element = await actualLocator
      const actualValue = await this.webElementHandler.getText(element)
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

  async assertObjects (actualObject, expectedObject) {
    logger.info(`The actual object is : ${actualObject}`)
    logger.info(`The expected object is : ${expectedObject}`)
    expect(actualObject).toMatchObject(expectedObject)
  }

  async assertObjectsFalsy (actualObject, expectedObject) {
    expect(this.assertObjects(actualObject, expectedObject)).toBeFalsy()
  }

  async assertForVisibility (element) {
    expect(await element).toBeVisible()
  }

  generateRandomStrings (length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      )
    }
    return result
  }

  generateRandomStringsAsArray (lengthOfEachString, numberOfStrings) {
    const stringArray = []
    for (let i = 0; i < numberOfStrings; i++) {
      stringArray.push(this.generateRandomStrings(lengthOfEachString))
    }
    return stringArray
  }

  generateRandomStringsWithAlphaNumericCharacters (length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const specialCharacters = '!@#$%^&*()_+{}:"<>?[];,./-='
    const allCharacters = characters + specialCharacters
    let result = ''
    for (let i = 0; i < length; i++) {
      result += allCharacters.charAt(
        Math.floor(Math.random() * allCharacters.length)
      )
    }
    return result
  }

  generateRandomStringsWithAlphanumericCharsAsArray (lengthOfEachString, numberOfStrings) {
    const stringArray = []
    for (let i = 0; i < numberOfStrings; i++) {
      stringArray.push(this.generateRandomStringsWithAlphaNumericCharacters(lengthOfEachString))
    }
    return stringArray
  }

  async validateDialogDisplayed (dialogHeader) {
    await this.webElementHandler.waitForVisible(await this.dialog)
    const actualDialogHeader = await this.webElementHandler.getText(
      await this.dialogHeading.last()
    )
    expect(actualDialogHeader).toBe(dialogHeader)
  }

  async validateTableHeaders (tableHeaderLocator, expectedTableHeaders) {
    const expectedTabHeaders = expectedTableHeaders
      .split(',')
      .map((item) => item.trim())
    const actualTableHeaders = await this.webElementHandler.getAllTexts(
      await tableHeaderLocator
    )
    await this.assertObjects(actualTableHeaders).toMatchObject(
      expectedTabHeaders
    )
  }

  async fillInputField (inputLocator, inputValue) {
    await this.webElementHandler.fillInput(await inputLocator, inputValue)
  }

  async setMultiSelectFieldValues (multiSelectElement, itemsToBeSet) {
    for (let i = 0; i < itemsToBeSet.length; i++) {
      await this.page.waitForTimeout(500)
      await this.webElementHandler.fillInputWithoutClear(
        await multiSelectElement,
        itemsToBeSet[i]
      )

      const firstListedTag = await this.webElementHandler.getText(
        await this.optionsList.first()
      )

      if (firstListedTag === itemsToBeSet[i]) {
        // Click on the first tag if it matches
        await this.webElementHandler.click(await this.optionsList.first())
      } else {
        // Scroll down the list and add a new tag if it doesn't match
        await this.webElementHandler.scrollDownListEntirely(
          await this.optionsList
        )
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.optionsList.last())
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.addButton)
      }
    }
  }

  deleteLastNProperties (obj, n) {
    const keys = Object.keys(obj)
    const keysToDelete = keys.slice(-n)
    keysToDelete.forEach((key) => {
      delete obj[key]
    })
  }

  async fillAutoSelectValues (locator, text, options = {}) {
    const textArray = text.split(',').map((item) => item.trim())
    for (let i = 0; i <= textArray.length - 1; i++) {
      await this.webElementHandler.fillInputWithoutClear(
        await locator,
        textArray[i],
        options
      )
      await this.page.waitForTimeout(500)
      const firstListedOption = await this.webElementHandler.getText(
        await this.optionsList.first()
      )
      await this.page.waitForTimeout(500)
      if (firstListedOption === textArray[i]) {
        await this.webElementHandler.click(await this.optionsList.first())
      } else {
        await this.webElementHandler.scrollDownListEntirely(
          await this.optionsList
        )
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.optionsList.last())
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.add_Button)
      }
    }
  }

  shuffleArray (inputArr) {
    for (let i = inputArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [inputArr[i], inputArr[j]] = [inputArr[j], inputArr[i]]
    }
    return inputArr
  }

  async checkLazyLoader () {
    const startTime = Date.now()
    try {
      await this.page.waitForSelector(await this.agGridLoader, { state: 'visible', timeout: this.defaultTimeout })
      const endTime = Date.now()
      if (endTime - startTime >= this.defaultTimeout) {
        logger.info('Lazy loader found for more than 60 seconds, reloading the page...')
        await this.reloadPage()
        logger.info('Page reloaded successfully.')
      }
    } catch (error) {
      logger.info('Lazy loader not found within the timeout period.')
    }
  }
}

module.exports = { BasePage }
