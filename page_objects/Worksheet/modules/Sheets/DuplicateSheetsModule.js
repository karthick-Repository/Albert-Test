const { expect } = require('@playwright/test')

class DuplicateSheetsModule {
  constructor (page, webElementHandler, assertionHandler) {
    this.page = page
    this.webElementHandler = webElementHandler
    this.assertionHandler = assertionHandler
    this.duplicateSheetParent = page.locator('app-duplicate-sheet')
    this.duplicateSheetHeading = this.duplicateSheetParent.locator('[class$="-heading"]')
    this.duplicateSheetName = this.duplicateSheetParent.locator('input[class^="task-name"]')
    this.duplicateSheetsSubTitles = this.duplicateSheetParent.locator('.sub-title')
    this.selectPanelOpen = '.select-panel-open'
    this.panelListItem = '.panel-list-item'
    this.productDesignGridPanel = this.duplicateSheetParent.locator(this.selectPanelOpen).first()
    this.productDesignGridPanelCheckboxes = this.productDesignGridPanel.locator('input')
    this.productDesignGridPanelListItems = this.productDesignGridPanel.locator(this.panelListItem)
    this.productDesignGridPanelArrowIcons = this.productDesignGridPanel.locator('svg')
    this.resultsGridPanel = this.duplicateSheetParent.locator(this.selectPanelOpen).nth(1)
    this.resultsGridPanelCheckboxes = this.resultsGridPanel.locator('input')
    this.resultsGridPanelListItems = this.resultsGridPanel.locator(this.panelListItem)
    this.resultsGridPanelArrowIcons = this.resultsGridPanel.locator('svg')
    this.appsGridPanel = this.duplicateSheetParent.locator(this.selectPanelOpen).last()
    this.appsGridListItems = this.appsGridPanel.locator(this.panelListItem)
    // Select columns to copy locators
    this.selectColumnsToCopyTitles = page.locator('.search-title')
    this.pinnedSectionInformationIcon = this.selectColumnsToCopyTitles.first().locator('svg')
    this.pinnedSection = page.locator('#pinned_section')
    this.pinnedSectionTexts = this.pinnedSection.locator(this.panelListItem)
    this.pinnedSectionCheckboxes = this.pinnedSection.locator('input')
    this.otherColumnsSection = page.locator(this.selectPanelOpen).last()
    this.otherColumnsSectionPanelItems = this.otherColumnsSection.locator(this.panelListItem)
    this.otherColumnsTtiles = this.otherColumnsSection.locator('.panel-list-title')
    this.otherColumnsSubTitles = this.otherColumnsSection.locator('.panel-list-subtitle')
    this.otherColumnsCheckboxes = this.otherColumnsSection.locator('input')

    this.backToCreationFlow = page.getByRole('button', { name: 'Back To Creation Flow' })
  }

  /**
 * Validates the initial state of a product design grid.
 * @param {Array} expectedProductDesignGridListItems - Expected list items for validation.
 */
  async validateProductDesignGridInitialState (expectedProductDesignGridListItems) {
    expect(await this.productDesignGridPanelCheckboxes).toHaveCount(3)
    await this.assertionHandler.assertActualAndExpectedAllTexts(
      await this.productDesignGridPanelListItems,
      expectedProductDesignGridListItems
    )
    expect(await this.productDesignGridPanelCheckboxes.first().isChecked()).toBeTruthy()
    expect(await this.productDesignGridPanelCheckboxes.nth(1).isChecked()).toBeTruthy()
    expect(await this.productDesignGridPanelCheckboxes.last().isChecked()).toBeFalsy()
  }

  /**
     * Validates the initial state of the results design grid.
     * @param {Array} expectedResultsDesignGridListItems - Expected list items for validation.
     */
  async validateResultsDesignGridInitialState (expectedResultsDesignGridListItems) {
    expect(await this.resultsGridPanelCheckboxes).toHaveCount(2)
    await this.assertionHandler.assertActualAndExpectedAllTexts(
      await this.resultsGridPanelListItems,
      expectedResultsDesignGridListItems
    )
    expect(await this.resultsGridPanelCheckboxes.first().isChecked()).toBeFalsy()
    expect(await this.resultsGridPanelCheckboxes.last().isChecked()).toBeFalsy()
  }

  /**
     * Validates the initial state of the apps design grid.
     * @param {Array} expectedAppsDesignGridListItems - Expected list items for validation.
     */
  async validateAppsDesignGridInitialState (expectedAppsDesignGridListItems) {
    await this.assertionHandler.assertActualAndExpectedAllTexts(
      await this.appsGridListItems,
      expectedAppsDesignGridListItems
    )
  }

  /**
     * Validates the initial states of all grids in the duplicate sheet dialog.
     * @param {Array} expectedProductDesignGridListItems - Expected product design grid list items.
     * @param {Array} expectedResultsDesignGridListItems - Expected results design grid list items.
     * @param {Array} expectedAppsDesignGridListItems - Expected apps design grid list items.
     */
  async validateInitialStateOfGridsInDuplicateSheetDialog (
    expectedProductDesignGridListItems,
    expectedResultsDesignGridListItems,
    expectedAppsDesignGridListItems
  ) {
    await this.validateProductDesignGridInitialState(expectedProductDesignGridListItems)
    await this.validateResultsDesignGridInitialState(expectedResultsDesignGridListItems)
    await this.validateAppsDesignGridInitialState(expectedAppsDesignGridListItems)
  }

  async validateStateOfPinnedColumnsSection (expectedSearchTitles, expectedPinnedSectionText) {
    await this.assertionHandler.assertActualAndExpectedAllTexts(await this.selectColumnsToCopyTitles, expectedSearchTitles)
    await this.assertionHandler.assertActualAndExpectedAllTexts(await this.pinnedSectionTexts, expectedPinnedSectionText)
    expect(await this.pinnedSectionCheckboxes.first().isChecked()).toBeTruthy()
    expect(await this.pinnedSectionCheckboxes.last().isChecked()).toBeTruthy()
  }

  async validateStateOfOtherColumnsSection (expectedColumns, expectedunChecked, dataInRows, calculationReferenceToOtherColumns) {
    let itemTitle = []
    let subTitle = []
    const otherColumnsItems = await this.otherColumnsSectionPanelItems.all()
    for(let i = 0; i <= await otherColumnsItems.length - 1 ; i++) {
      itemTitle = await otherColumnsItems[i].locator('.panel-list-title').all()
      subTitle = await otherColumnsItems[i].locator('.panel-list-subtitle').all()
    }
    for(let j = 0; j <= itemTitle.length - 1; j++) {
      await this.assertionHandler.assertForTextContains(await itemTitle[j], expectedColumns[i])
      await this.assertionHandler.assertForTextContains(await subTitle[j], expectedColumns[i])  
    }
  }

  async validateInitialStateOfSelectColumnsToCopyDialog (expectedSearchTitles, expectedPinnedSectionText) {
    await this.validateStateOfPinnedColumnsSection(expectedSearchTitles, expectedPinnedSectionText)
  }

  async checkOtherColumnsToBeIncludedInTheSheet(numberOfColumns) {
    for (let i = 0; i < numberOfColumns; i++) {
      await this.checkOtherColumnCheckbox(i)
    }
  }

  async checkOtherColumnCheckbox(checkBoxNumber) {
    const checkboxes = await this.otherColumnsCheckboxes.all()
    if (checkBoxNumber < checkboxes.length) {
      await this.webElementHandler.checkCheckbox(await checkboxes[checkBoxNumber])
    }
  }

  async validateThePinnedColumnsSection (expectedPinnedColumnsTitle, expectedPinnedColumnsText) {
    await this.assertionHandler.assertActualAndExpectedText(await this.selectColumnsToCopyTitles.first(), expectedPinnedColumnsTitle)
    await this.assertionHandler.assertActualAndExpectedAllTexts(await this.pinnedSectionTexts, expectedPinnedColumnsText)
  }

  async validateTheOtherColumnsSection (expectedOtherColumnsTitle, numberOfCheckBoxes) {
    await this.assertionHandler.assertActualAndExpectedText(await this.selectColumnsToCopyTitles.last(), expectedOtherColumnsTitle)
    expect(await this.otherColumnsCheckboxes).toHaveCount(numberOfCheckBoxes)
  }
}

module.exports = { DuplicateSheetsModule }
