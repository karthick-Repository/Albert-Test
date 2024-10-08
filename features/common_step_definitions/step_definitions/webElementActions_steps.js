const { When, Before, Then } = require('@cucumber/cucumber')

let wksPage, elementHandler

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
  elementHandler = await wksPage.webElementHandler
})

When('I click on the text {string}', async function (expectedText) {
  const textElementToClickOn = await this.page.getByText(expectedText).first()
  await wksPage.waitForDuration(1)
  await elementHandler.click(await textElementToClickOn)
})

When('I click on {string} identified as a hyperlink', async function (textToClick) {
  const elementToClickOn = await this.page.locator(`//a[text()='${textToClick}']`)
  await wksPage.waitForDuration(0.5)
  await elementHandler.click(await elementToClickOn)
  await wksPage.waitForDuration(0.5)
})

When('I click on the {string} button', async function (buttonText) {
  const elementToClickOn = await this.page.getByRole('button', { name: buttonText }).last()
  await elementHandler.click(await elementToClickOn)
})

When('I {string} the checkbox associated with the text {string} in the non-product filter', async function (checkUnCheck, expectedText) {
  await wksPage.filterModule.searchForThisInNonProductFilter(expectedText)
  const targetElement = await this.page.locator(`//div[div[text()='${expectedText}']]//input[@type='checkbox']`)
  checkUnCheck === 'check' ? await elementHandler.checkCheckbox(await targetElement) : await elementHandler.uncheckCheckbox(await targetElement)
})

Then('I validate that the checkbox associated with the text {string} is {string} in the non-product filter', async function (expectedText, status) {
  await wksPage.filterModule.searchForThisInNonProductFilter(expectedText)
  const targetElement = await this.page.locator(`//div[div[text()='${expectedText}']]//input[@type='checkbox']`)
  await wksPage.assertionHandler.assertCheckBoxStatus(await targetElement, status)
})
