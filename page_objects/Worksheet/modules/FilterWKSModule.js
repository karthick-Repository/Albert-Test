const { WebElementHandler } = require('../../../utilities/WebElementHandler')
const { AssertionHandler } = require('../../../utilities/AssertionHandler')

/**
 * FilterWKSModule - A module for handling filter-related actions in the Worksheet (WKS) page.
 */
class FilterWKSModule {
  /**
   * Initializes a new instance of the FilterWKSModule class.
   * @param {Object} page - The Playwright page object.
   */
  constructor (page) {
    this.page = page
    this.webElementHandler = new WebElementHandler(this.page)
    this.assertionHandler = new AssertionHandler(this.page)
    this.filterButtons = page.locator('.filter-icon-chips svg')
    this.facetFilterDialog = page.locator('.filter-show')
    this.clearAllLink = page.getByText('Clear All')
    this.nonProductFilter_Parent = page.locator('[role="dialog"]')
    this.npf_MatchDropDown = this.nonProductFilter_Parent.locator('.ag-picker-field-display').first()
    this.npf_MatchInput = this.nonProductFilter_Parent.locator('[placeholder="Filter..."]').last()
    this.searchInput = page.locator('[placeholder="Search..."]')
    this.selectAllCheckbox = page.locator('[ref="eSetFilterList"] input')
    this.doneLink = page.locator('.link-done')
  }

  /**
   * Clicks on the first filter button.
   */
  async clickOnFilter () {
    await this.filterButtons.first().click()
  }

  /**
   * Ticks a checkbox by its label text.
   * @param {string} checkBox - The label text of the checkbox to tick.
   */
  async tickCheckBox (checkBox) {
    await this.page.locator(`label:has-text('${checkBox}')`).click()
  }

  /**
   * Ticks all checkboxes from the provided list.
   * @param {string[]} checkBoxes - An array of label texts for checkboxes to tick.
   */
  async tickAllFilterCheckboxes (checkBoxes) {
    for (const checkBox of checkBoxes) {
      await this.tickCheckBox(checkBox)
    }
    await this.page.waitForTimeout(1000)
  }

  /**
   * Applies the selected filters.
   */
  async applyFilters () {
    await this.page.getByRole('link', { name: 'Done' }).click()
  }

  /**
   * Clears all filters. The location of the clear all link is determined by the "from" parameter.
   * @param {string} from - The location where to clear filters from ("WKS Page" or other).
   */
  async clearAllFilters (from) {
    const clearLink =
      from === 'WKS Page' ? this.clearAllLink : this.clearAllLink.last()
    await clearLink.waitFor({ state: 'visible', timeout: 3 * 1000 })
    await clearLink.click()
  }

  async validateNonProductFilterContents (assertionHandler) {
    await assertionHandler.assertForVisibility(await this.npf_MatchDropDown)
    await assertionHandler.assertForVisibility(await this.npf_MatchInput)
    await assertionHandler.assertForVisibility(await this.searchInput)
    await assertionHandler.assertForVisibility(await this.selectAllCheckbox)
    await this.page.waitForTimeout(1000)
  }

  async searchForThisInNonProductFilter (textToSearch) {
    const searchInputElement = await this.searchInput
    if (textToSearch !== '(Select All)') {
      await this.webElementHandler.fillInputWithType(await searchInputElement, textToSearch)
    }
  }

  async facetFilterValidationForTagsAndPredecessor (filterType, expectedTags, expectedPredecessor) {
    const facetFilterElement = await this.filterButtons
    const facetFilterDialog = await this.facetFilterDialog
    const isfacetFilterDialogVisible = await facetFilterDialog.isVisible()
    if (isfacetFilterDialogVisible === false) {
      await this.webElementHandler.click(await facetFilterElement)
    }
    const finalExpectedPredecessor = expectedPredecessor + ' || ' + expectedPredecessor
    const expectedElementLocator = `//div[div[label[text()="${filterType}"]]]//div[contains(@class,'checkbox-label')]//label`
    const expectedElement = await this.page.locator(expectedElementLocator)
    await this.assertionHandler.assertActualAndExpectedAllTexts(await expectedElement, filterType === 'Tags' ? expectedTags : finalExpectedPredecessor)
  }
}

module.exports = { FilterWKSModule }
