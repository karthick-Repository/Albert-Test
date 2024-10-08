const { expect } = require('@playwright/test')

/**
 * This class contains methods for interacting with and validating the CopyToNewModule.
 */
class CopyToNewModule {
  /**
   * Initializes a new instance of the CopyToNewModule class.
   * @param {Page} page - The Playwright Page object.
   */
  constructor (page) {
    this.page = page
    this.initializeLocators()
  }

  /**
   * Initializes locators.
   */
  initializeLocators () {
    this.defaultFormulaEllipses = this.page.locator('.add-row a').last()
    this.copyToNew_Box = this.page.locator('.tippy-box').last()
    this.copyToNewInput = this.page.locator('#copyto_new')
    this.copyToNewWithCalculations = this.copyToNew_Box
      .locator('label')
      .first()
    this.copyToNewWithValues = this.copyToNew_Box.locator('label').last()
    this.copyToNewWithCalculations_Radio = this.copyToNew_Box
      .locator("input[type='radio']")
      .first()
    this.copyToNewWithValues_Radio = this.copyToNew_Box
      .locator("input[type='radio']")
      .last()
    this.copyToNew_Cancel_Button = this.copyToNew_Box.locator('button').first()
    this.copyToNew_Done_Button = this.copyToNew_Box.locator('button').last()
    this.errorInCopyToNew = this.page.locator('.error-text')
  }

  /**
   * Clicks the ellipsis icon for the default formula.
   */
  async clickEllipsesOfDefaultFormula () {
    await this.defaultFormulaEllipses.click()
  }

  /**
   * Clicks the "Copy To New" link.
   */
  async clickCopyToNew () {
    await this.page.getByRole('link', { name: 'Copy To New' }).click()
  }

  /**
   * Validates the UI elements of the Copy To New module.
   */
  async validateCopyToNewCheckBoxUI () {
    await this.checkVisibilityAndCount(this.copyToNew_Box, 1)
    await this.checkVisibilityAndCount(this.copyToNewInput, 1)
    await this.checkVisibility(this.copyToNewWithCalculations_Radio)
    await this.checkVisibility(this.copyToNewWithValues_Radio)
    await this.checkVisibilityAndCount(this.copyToNew_Cancel_Button, 1)
    await this.checkVisibilityAndCount(this.copyToNew_Done_Button, 1)
  }

  /**
   * Checks if a locator is visible and has a specified count.
   * @param {Locator} locator - The Playwright locator object.
   * @param {number} count - The expected count.
   */
  async checkVisibilityAndCount (locator, count) {
    expect(await locator.isVisible()).toBeTruthy()
    expect(await locator.count()).toBe(count)
  }

  /**
   * Checks if a locator is visible.
   * @param {Locator} locator - The Playwright locator object.
   */
  async checkVisibility (locator) {
    expect(await locator.isVisible()).toBeTruthy()
  }

  /**
   * Enters a value into the Copy To New input field.
   * @param {string} value - The value to enter.
   */
  async enterCopyToNewValue (value) {
    await this.copyToNewInput.clear()
    await this.copyToNewInput.type(value, { delay: 100 })
  }

  /**
   * Checks for an error message in the Copy To New module.
   * @param {string} value - The value to check for an error.
   */
  async checkForError (value) {
    const intValue = parseInt(value, 10)
    const isVisible = await this.errorInCopyToNew.isVisible()

    if (intValue <= 10) {
      expect(isVisible).toBeFalsy()
    } else {
      expect(isVisible).toBeTruthy()
      expect(await this.errorInCopyToNew.textContent()).toBe(
        'Enter value between 1-10 no of formulas'
      )
    }
  }

  /**
   * Selects the type of Copy To New operation (Calculations or Values).
   * @param {string} typeOfOperation - The type of operation to select ("Copy with calculations" or otherwise).
   */
  async selectTypeOfCopyToNew (typeOfOperation) {
    const radioElement =
      typeOfOperation === 'Copy with calculations'
        ? this.copyToNewWithCalculations_Radio
        : this.copyToNewWithValues_Radio

    if (!(await radioElement.isChecked())) {
      await radioElement.check()
    }
  }

  /**
   * Clicks the Cancel button.
   */
  async clickCancelButton () {
    await this.copyToNew_Cancel_Button.click()
  }

  /**
   * Verifies the Copy To New box is not displayed.
   */
  async copyToNewBoxShouldNotBeDisplayed () {
    expect(await this.copyToNew_Box.isVisible()).toBeFalsy()
  }

  /**
   * Clicks the Done button.
   */
  async clickDoneButton () {
    await this.copyToNew_Done_Button.click()
  }
}

module.exports = { CopyToNewModule }
