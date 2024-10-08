const { When, Before, Given } = require('@cucumber/cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(10 * 60000)

let landingPage, dialog

Before(async function () {
  landingPage = await this.poManager.fetchLandingPage()
  dialog = await this.poManager.fetchDialog()
})

When(
  'User clicks the Create button in Landing Page',
  { timeout: 30 * 1000 },
  async function () {
    await landingPage.clickCreateButton()
  }
)

When(
  'User click on {string}',
  { timeout: 60 * 2000 },
  async function (feature) {
    await landingPage.clickFeature(feature)
  }
)

Given(
  '{string} dialog is displayed', async function (popUpHeader) {
    await dialog.validateThatDialogIsDisplayed()
    await dialog.validateHeaderOfDialog(popUpHeader)
  }
)

When('I click on {string}', async function (textToClick) {
  const stringToClick = await this.page.getByText(textToClick)
  await landingPage.webElementHandler.click(await stringToClick)
})

When('I click on {string} menu option', async function (linkToClick) {
  const linkElement = await this.page.getByRole('link', {
    name: linkToClick,
    exact: true
  })
  await landingPage.webElementHandler.click(await linkElement)
})

// When('I click on the {string} button', async function (buttonType) {
//   await landingPage.waitForDuration(2)
//   if (buttonType === 'Create') {
//     await landingPage.webElementHandler.click(await landingPage.createButton.last())
//     await landingPage.waitForDuration(2)
//   } else if (buttonType === 'Save') {
//     await landingPage.webElementHandler.click(await landingPage.saveButton.last())
//   } else if (buttonType === 'Yes') {
//     await landingPage.webElementHandler.click(await landingPage.yesButon.last())
//   }
// })

When('I goto to the landing page of the application', async function () {
  await landingPage.gotoPage(await landingPage.landingPageURL)
})


