const VISIBLE_TIMEOUT = 30 * 1000
const { expect } = require('@playwright/test')
const { ColumnsModule } = require('./ColumnsModule')
const { WebElementHandler } = require('../../../utilities/WebElementHandler')
const logger = require('../../../utilities/Logger')
/**
 * @class CopyFromExistingModule
 * @description Represents the CopyFromExisting UI module and provides methods to interact with its components.
 */
class CopyFromExistingModule {
  /**
   * @constructor
   * @param {object} page - The Playwright page object.
   */
  constructor (page) {
    this.page = page
    this.copyFromExistingInput = page.locator('#copyto_Existing')
    this.copyFromExistingButtons = page.locator('.popover-submenu button')
    this.copyFromExistingRadioButtons = page.locator(
      "input[type='radio']"
    )
    this.columnsModule = new ColumnsModule(this.page)
    this.webElementHandler = new WebElementHandler(this.page)
    this.formulaColumnToCopyFrom = page.locator('.mdc-list-item__primary-text').first()
  }

  /**
   * Clicks either the first or the last button in the list of copyFromExistingButtons.
   * @private
   * @param {string} position - 'first' or 'last'.
   */
  async _clickButtonByPosition (position) {
    const button =
      position === 'first'
        ? await this.copyFromExistingButtons.first()
        : await this.copyFromExistingButtons.last()
    await button.waitFor({ state: 'visible', timeout: VISIBLE_TIMEOUT })
    await button.click()
  }

  /**
   * Clicks the "Cancel" button.
   */
  async clickCancelButton () {
    await this._clickButtonByPosition('first')
  }

  /**
   * Clicks the "Done" button.
   */
  async clickDoneButton () {
    await this._clickButtonByPosition('last')
  }

  /**
   * Enters a formula name into the copyFromExistingInput field.
   * @param {string} formula - The formula name to be entered.
   */
  async enterFormulaName (formula) {
    await this.webElementHandler.fillInputWithoutClear(await this.copyFromExistingInput, formula)
  }

  /**
   * Clicks on a given formula in the list of formulas.
   * @param {string} formula - The formula name to be clicked.
   */
  async clickOnTheEnteredFormula (
    columnIndexToBeUsed,
    projectID,
    formulaColumn
  ) {
    // const locatorID = this.getIdByColId(fullListOfColumns, colIDToMatch);
    const toClickOn =
      formulaColumn + ' ' + projectID + '-' + columnIndexToBeUsed
    toClickOn.trim()
    logger.info(`String formed : ${toClickOn}`)
    // const formulaToClickOn = await this.page
    //   .locator("div")
    //   .filter({ hasText: `${toClickOn}` })
    //   .click();
    const formulaToClickOn = await this.page.getByRole('option', {
      name: `${toClickOn}`
    })
    await formulaToClickOn.waitFor({
      state: 'visible',
      timeout: VISIBLE_TIMEOUT
    })
    await this.page.waitForTimeout(3000)
    await formulaToClickOn.click()
  }

  async clickOnFormedFormula (formedFormula) {
    const trimmedFormula = formedFormula.trim()
    await this.enterFormulaName(trimmedFormula)
    await this.webElementHandler.click(await this.formulaColumnToCopyFrom)
  }

  getIdByColId (data, targetColId) {
    for (const column of data.Columns) {
      if (column.colId === targetColId) {
        if (column.id.startsWith('INV')) {
          return column.id.split('INV')[1]
        }
        return column.id // Return the full id if it doesn't start with 'INV'
      }
    }
    return null // Return null if no match is found
  }

  /**
   * Selects a type of radio button based on the provided description.
   * @param {string} typeOfRadio - The type/description of the radio button ('Copy with calculations' or other).
   */
  async selectCopyFromExistingType (typeOfRadio) {
    const buttonToClick =
      typeOfRadio === 'Copy with calculations'
        ? await this.copyFromExistingRadioButtons.first()
        : await this.copyFromExistingRadioButtons.last()
    await buttonToClick.waitFor({ state: 'visible', timeout: VISIBLE_TIMEOUT })
    await buttonToClick.click()
  }

  /**
   * Validates the UI of the CopyFromExisting module against a set of predefined expectations.
   * @param {string} formulaName - The formula name used for specific validations.
   */
  async validateCopyFromExistingUI (formulaName) {
    expect(await this.copyFromExistingInput).toHaveAttribute(
      'placeholder',
      'Select Product to copy'
    )
    expect(await this.copyFromExistingButtons).toHaveCount(2)
    expect(await this.copyFromExistingButtons.first().textContent()).toBe(
      'Cancel'
    )
    expect(await this.copyFromExistingButtons.last().textContent()).toBe(
      'Done'
    )
    await this.enterFormulaName(formulaName)
    expect(await this.copyFromExistingRadioButtons).toHaveCount(2)
    expect(await this.copyFromExistingRadioButtons.first().textContent()).toBe(
      'Copy with calculations'
    )
    expect(await this.copyFromExistingRadioButtons.last().textContent()).toBe(
      'Copy values only'
    )
  }

  async validateNoRecordFound () {
    const noRecordFoundElement = await this.page.getByText('No Record Found')
    await noRecordFoundElement.waitFor({
      state: 'visible',
      timeout: VISIBLE_TIMEOUT
    })
    expect(noRecordFoundElement).toBeVisible()
  }

  async performCopyFromExisting (toCol, fromCol, calcInvolved) {
    await this.columnsModule.clickActionIconByColumnID(toCol)
    await this.columnsModule.clickOnAction('Copy From Existing')
    const columnText = await this.webElementHandler.getText(await this.page.locator(`[col-id='${fromCol}']`).first())
    const columnTextSplit = columnText.trim().split(' ')
    const textToUse = columnTextSplit[1] + columnTextSplit[0]
    logger.info(`Formula to use is : ${textToUse}`)
    await this.enterFormulaName(columnTextSplit[1])
    await this.page.waitForTimeout(1000)
    await this.webElementHandler.click(await this.formulaColumnToCopyFrom)
    if (calcInvolved !== 'calculations') {
      await this.selectCopyFromExistingType('Copy values only')
      await this.webElementHandler.click(await this.page.getByText('Done'))
    } else {
      await this.webElementHandler.click(await this.page.getByText('Done'))
    }
    await this.page.waitForTimeout(2000)
  }
}

module.exports = { CopyFromExistingModule }
