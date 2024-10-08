const { Then, When, Before } = require('@cucumber/cucumber')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

Then('I validate that {int} intermediate row expansion icons are displayed', async function (expectedNumberOfIcons) {
  await wksPage.assertionHandler.assertForElementCount(await wksPage.rowModule.intermediateRowsIcons, expectedNumberOfIcons + 1)
})

When('I {string} the intermate row at index {int} in the product design grid', async function (expandCollapse, rowIndex) {
  await wksPage.waitForDuration(1)
  const rowIconElements = expandCollapse === 'expand' ? await wksPage.rowModule.intermediateRowsIcons.all() : await wksPage.rowModule.intermediateRowsIconsExpanded.all()
  await wksPage.webElementHandler.click(await rowIconElements[rowIndex - 1])
  await wksPage.waitForDuration(1)
})

When('I validate that the message {string} is displayed after expanding the intermediate row', async function (rowExpansionMessage) {
  const messageElement = await wksPage.rowModule.intermediateRowExpand_Message
  await wksPage.assertActualAndExpectedText(await messageElement, rowExpansionMessage)
})

When('I {string} the intermate row at index {int}', async function (expandCollapse, rowIndex) {
  const rowIconElements = expandCollapse === 'expand' ? await wksPage.rowModule.intermediateRowsIcons.all() : await wksPage.rowModule.intermediateRowsIconsExpanded.all()
  await wksPage.webElementHandler.click(await rowIconElements[rowIndex - 1])
})

When('I {string} all the intermediate rows in the product design grid', async function (expandCollapseOperation) {
  const rowIconElements = expandCollapseOperation === 'expand' ? await wksPage.rowModule.intermediateRows_Contracted_Icons : await wksPage.rowModule.intermediateRows_Expanded_Icons
  let totalMatchingLocators = await wksPage.webElementHandler.getTotalMatchingLocator(await rowIconElements)
  for (; totalMatchingLocators !== 0; totalMatchingLocators = await wksPage.webElementHandler.getTotalMatchingLocator()) {
    await wksPage.webElementHandler.click(rowIconElements.first())
    await wksPage.waitForDuration(5000)
  }
})

When('I {string} the intermate row of group {int}', async (expand,index) => {
  await wksPage.rowModule.expandGroup(expand,index)
})
