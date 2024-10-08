const { When, Before, Then } = require('@cucumber/cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(10 * 60000)

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When('User clicks the filter icon', async function () {
  await wksPage.filterModule.clickOnFilter()
})

When(
  'User applies filter for columns containing text {string}',
  async function (fiterToBeAppliedOn) {
    const filterOptions = fiterToBeAppliedOn.split(',')
    await wksPage.filterModule.tickAllFilterCheckboxes(filterOptions)
    await wksPage.filterModule.applyFilters()
    await wksPage.isInWKSPage()
  }
)

When(
  'User clears all the applied filters from {string}',
  async function (from) {
    await wksPage.filterModule.clearAllFilters(from)
  }
)

When(
  'User clicks on the search input in WKS',
  async function () {
    await wksPage.searchModule.clickInSearchInput()
  }
)

When('I search for {string} in the worksheet', async function (searchText) {
  await wksPage.searchModule.performSearchInWKS(searchText)
})

Then('I validate that the non product filter is displayed', async function () {
  await wksPage.filterModule.validateNonProductFilterContents(await wksPage.assertionHandler)
  await wksPage.waitForDuration(1)
})

Then('I validate that the facet filter displays the {string}', async function (filterType) {
  await wksPage.filterModule.facetFilterValidationForTagsAndPredecessor(filterType, this.appsGridTagsToSet, this.selectedPredecessor)
})

When('I close the facet filter dialog by clicking the Done link', async function () {
  const doneElement = await wksPage.filterModule.doneLink
  await wksPage.webElementHandler.click(await doneElement)
})
