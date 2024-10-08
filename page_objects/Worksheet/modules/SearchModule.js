const { WebElementHandler } = require('../../../utilities/WebElementHandler')

class SearchModule {
  constructor (page) {
    this.page = page
    this.searchInput = page.locator('.wks-search-input')
    this.webElementHandler = new WebElementHandler(this.page)
  }

  async clickInSearchInput () {
    await this.searchInput.click()
  }

  async performSearchInWKS (searchInput) {
    const searchInputElement = await this.searchInput
    await this.webElementHandler.fillInputWithType(await searchInputElement, searchInput)
    await this.webElementHandler.pressUsingKey(await searchInputElement, 'Enter')
  }
}

module.exports = { SearchModule }
