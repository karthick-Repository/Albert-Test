const { When, Before, Then } = require('@cucumber/cucumber')

let wksPage, elementHandler

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
  elementHandler = await wksPage.webElementHandler
})

When('I click on the text {string}', async function (expectedText) {
  // const textElementToClickOn = await this.page.getByText(expectedText).first()
  const textElementToClickOn = await wksPage.frameLocator.getByText(expectedText).first()
  await wksPage.waitForDuration(1)
  await elementHandler.click(await textElementToClickOn)
  await this.page.waitForLoadState('domcontentloaded')
})

When('I click on {string} identified as a hyperlink', async function (textToClick) {
  const elementToClickOn = await wksPage.frameLocator.getByText(textToClick.trim())
  await wksPage.waitForDuration(0.5)
  await elementHandler.click(await elementToClickOn)
  await wksPage.waitForDuration(0.5)
})

When('I click on the {string} button', async function (buttonText) {
  const elementToClickOn = await this.page.locator('maya-button').filter({ hasText: `${buttonText}` })
  await elementHandler.click(await elementToClickOn)
  await wksPage.waitForDuration(1)
  await this.page.waitForLoadState('load')
})

When('I click on the {string} button to add new sheet', async function (buttonText) {
  const elementToClickOn = await this.page.frameLocator('albert-alproject iframe').getByRole('button', { name: `${buttonText}` }).last()
  await elementHandler.click(await elementToClickOn)
  await wksPage.waitForDuration(1)
  await this.page.waitForLoadState('load')
})

When('I {string} the checkbox associated with the text {string} in the non-product filter', async function (checkUnCheck, expectedText) {
  await wksPage.filterModule.searchForThisInNonProductFilter(expectedText)
  const targetElement = await wksPage.frameLocator.locator(`//div[div[text()='${expectedText}']]//input[@type='checkbox']`)
  checkUnCheck === 'check' ? await elementHandler.checkCheckbox(await targetElement) : await elementHandler.uncheckCheckbox(await targetElement)
})

Then('I validate that the checkbox associated with the text {string} is {string} in the non-product filter', async function (expectedText, status) {
  await wksPage.filterModule.searchForThisInNonProductFilter(expectedText)
  const targetElement = await wksPage.frameLocator.locator(`//div[div[text()='${expectedText}']]//input[@type='checkbox']`)
  await wksPage.assertionHandler.assertCheckBoxStatus(await targetElement, status)
})

When('User scrolls using mouse horizontally by {string} pixels and vertically by {string} pixels', async function (horizontalScrollPixels, verticalScrollPixels) {
  this.initialScrollPosition = await this.page.evaluate(() => ({
    x: window.scrollX,
    y: window.scrollY
  }))
  await wksPage.webElementHandler.mouseWheelScroll(Number(horizontalScrollPixels), Number(verticalScrollPixels))
  await wksPage.waitForDuration(1)
  this.finalScrollPosition = await this.page.evaluate(() => ({
    x: window.scrollX,
    y: window.scrollY
  }))
})

Then('User validates that the scroll operation was successful', async function () {
  await wksPage.assertionHandler.assertObjectsFalsy(this.initialScrollPosition, this.finalScrollPosition)
})
