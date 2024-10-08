const { expect } = require('@playwright/test')
const { BasePage } = require('./BasePage')

class Grids extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.tableHeaders = page.locator('#tableHeader th')
    this.shareIcon = page.locator('.mat-tooltip-trigger').first()
    this.ellipsisIcon = page.locator('.p-pl-3 > .mat-tooltip-trigger')
    this.searchInput = page.getByLabel('State')
    this.sortByDropDown = page
      .locator('span')
      .filter({ hasText: 'Sort By:Relevancy' })
    this.sortByDropDownOptions = page.locator("li[role='option']")
    this.actualObjectAfterSearch = page
      .locator('.p-datatable-tbody tr')
      .first()
  }

  async verifyPresenceOfSearchInput () {
    expect(
      await this.webElementHandler.waitForVisible(await this.searchInput)
    ).toBeTruthy()
    await this.assertForAttributeValuesa(
      await this.searchInput,
      'data-placeholder',
      'Search Data Templates'
    )
  }

  async validateComponentInTheFirstPosition (actualComponentID, expectedComponentID, matchType) {
    const assertionMethod = matchType === 'matches' ? 'assertWithToBe' : 'assertForFalsy'
    await this.assertionHandler[assertionMethod](actualComponentID, expectedComponentID)
  }

  async verifyPresenceOfSortByDropDown () {
    expect(
      await this.webElementHandler.waitForVisible(await this.sortByDropDown)
    ).toBeTruthy()
  }

  async verifySortByDropDownOptions (expectedDropDownOptions) {
    await this.webElementHandler.click(await this.sortByDropDown)
    await this.assertActualAndExpectedAllTexts(
      await this.sortByDropDownOptions,
      expectedDropDownOptions
    )
  }

  async verifyGridHeaders (expectedGridHeaders) {
    await this.assertActualAndExpectedAllTexts(
      await this.tableHeaders,
      expectedGridHeaders
    )
  }

  async verifyShareIcon () {
    expect(
      await this.webElementHandler.waitForVisible(await this.shareIcon)
    ).toBeTruthy()
  }

  async verifyEllipsesIcon () {
    expect(
      await this.webElementHandler.waitForVisible(await this.ellipsisIcon)
    ).toBeTruthy()
  }

  async verifyTextAfterClickingShareIcon (expectedText) {
    await this.webElementHandler.click(this.shareIcon)
    const expectedTextLocator = await this.page
      .locator('a')
      .filter({ hasText: `${expectedText}` })
    await this.assertActualAndExpectedText(
      await expectedTextLocator,
      expectedText
    )
  }

  async searchInGrid (searchItem) {
    await this.page.waitForTimeout(1000)
    await this.webElementHandler.fillInput(this.searchInput, searchItem)
    await this.webElementHandler.pressUsingKey(this.searchInput, 'Enter')
    await this.page.waitForTimeout(2000)
  }

  async buildActualDataTemplateObject () {
    const actualObjectElement = await this.actualObjectAfterSearch
    const firstTdElement = actualObjectElement.locator('td').first()
    const dtNameElement = firstTdElement.locator('div a u').first()
    const dtIdElement = firstTdElement.locator('div').last()
    const dtDescriptionElement = actualObjectElement
      .locator('td:nth-of-type(2) div')
    const dtResultsElement = actualObjectElement
      .locator('td')
      .last()
      .locator('div li')

    return {
      dtName: await this.webElementHandler.getText(dtNameElement),
      dtID: await this.webElementHandler.getText(dtIdElement),
      dtDescription: await this.webElementHandler.getText(
        dtDescriptionElement
      ),
      dtResults: await this.webElementHandler.getAllTexts(dtResultsElement)
    }
  }

  async buildActualInventoryObject () {
    const actualObjectElement = await this.actualObjectAfterSearch
    const inventoryName = await actualObjectElement.locator('td:nth-of-type(2) u')
    const inventoryCode = await actualObjectElement.locator('td:nth-of-type(2) div').last()
    const inventoryManufacturer = await actualObjectElement.locator('td:nth-of-type(3) div')
    const ivnentoryAlias = await actualObjectElement.locator('td:nth-of-type(4) div')
    const inventoryDescription = await actualObjectElement.locator('td:nth-of-type(5) div')

    return {
      Name: await this.webElementHandler.getText(inventoryName),
      Code: await this.webElementHandler.getText(inventoryCode),
      Manufacturer: [await this.webElementHandler.getText(inventoryManufacturer)],
      Alias: await this.webElementHandler.getText(ivnentoryAlias),
      Description: await this.webElementHandler.getText(inventoryDescription)
    }
  }

  async buildActualProjectObject () {
    const actualObjectElement = await this.actualObjectAfterSearch
    await this.page.waitForTimeout(1000)
    const name = await actualObjectElement.locator('td:nth-of-type(1) u')
    const code = await actualObjectElement.locator('td:nth-of-type(1) div.sopid-color')
    const status = await actualObjectElement.locator('td:nth-of-type(2) span')
    const customerMarketSegment = await actualObjectElement.locator('td:nth-of-type(3) div')
    const applications = await actualObjectElement.locator('td:nth-of-type(4) span')
    const technologies = await actualObjectElement.locator('td:nth-of-type(5) span')
    const technologiesText = await this.webElementHandler.getAllTexts(await technologies)
    const technologiesNonEmpty = technologiesText.filter(text => text.trim().length > 0)

    return {
      Name: await this.webElementHandler.getText(await name),
      Code: await this.webElementHandler.getText(await code),
      Status: await this.webElementHandler.getText(await status),
      Customer_Market_Segment: await this.webElementHandler.getText(await customerMarketSegment),
      Application: await this.webElementHandler.getAllTexts(await applications),
      Technology: technologiesNonEmpty
    }
  }

  async buildActualParameterGroupObject () {
    const actualObjectElement = await this.actualObjectAfterSearch.locator('td')
    await this.page.waitForTimeout(1000)
    const actualObjectText = await this.webElementHandler.getAllTexts(await actualObjectElement)
    return {
      pgName: actualObjectText[0],
      pgCode: actualObjectText[1],
      pgType: actualObjectText[2],
      pgDescription: actualObjectText[3],
      pgParameters: actualObjectText[4].split()
    }
  }
}

module.exports = { Grids }
