const { BaseModule } = require('../../Common/BaseModule')
const { expect } = require('@playwright/test')

/**
 * Module to handle calculation highlights and color codes in the UI.
 * @extends BaseModule
 */
class CalculationHighlightsModule extends BaseModule {
  /**
   * Constructor for CalculationHighlightsModule.
   * @param {object} page - The Playwright page object.
   */
  constructor (page) {
    super(page)
    this.page = page
  }

  /**
   * Fetches the color codes for formulas in the UI.
   * @returns {Promise<Array>} An array of objects containing formula range and its corresponding color code.
   */
  async fetchTheColorCodesInTheUI () {
    const formulaDetails = []
    const individualFormulae = await this.refInputCell.locator('span').all()
    for (const formulae of individualFormulae) {
      const colorCode = await this.webElementHandler.getAttributeValue(await formulae, 'style')
      const formulaDetail = {
        formulaRange: await this.webElementHandler.getText(await formulae),
        formulaColor: colorCode.split('#')[1]
      }
      formulaDetails.push(formulaDetail)
    }
    return formulaDetails
  }

  /**
   * Validates color codes in the UI for a specified range.
   * @param {string} actualColorCode - The expected color code.
   * @param {number} rowIndex - The row index.
   * @param {number} fromColIndex - The starting column index.
   * @param {number} toColIndex - The ending column index.
   * @returns {Promise<void>}
   */
  async validateColorCodes (actualColorCode, fromrowIndex, toRowIndex, fromColIndex, toColIndex) {
    const rgbCode = this.convertToRGB(actualColorCode)
    for (let j = Number(fromrowIndex); j <= Number(toRowIndex) - 1; j++) {
      for (let i = Number(fromColIndex); i <= Number(toColIndex) - 1; i++) {
        let elementInFocus
        if (Number(fromColIndex) !== 1 && Number(toColIndex) !== 1) {
          elementInFocus = await this.page.locator(`[row-index='${j.toString()}'] [aria-colindex='${i.toString()}']`)
        } else {
          elementInFocus = await this.page.locator(`[row-index='${j.toString()}'] [aria-colindex='${i.toString()}'] span.ag-cell-value`)
        }
        const styleAttributeValue = await this.webElementHandler.getAttributeValue(await elementInFocus, 'style')
        await this.assertionHandler.assertForContains(styleAttributeValue, rgbCode)
      }
    }
  }

  /**
   * Converts a hex color code to an RGB color code.
   * @param {string} colorCode - The hex color code.
   * @returns {string} The RGB color code.
   */
  convertToRGB (colorCode) {
    colorCode = colorCode.replace(/^#/, '')
    const bInt = parseInt(colorCode, 16)
    const r = (bInt >> 16) & 255
    const g = (bInt >> 8) & 255
    const b = bInt & 255

    return `rgb(${r}, ${g}, ${b})`
  }

  async validateSpansInActiveCell (tagName, count) {
    const countOfSpans = await this.refInputCell.locator(tagName).all()
    expect(countOfSpans.length).toBe(count)
  }
}

module.exports = { CalculationHighlightsModule }
