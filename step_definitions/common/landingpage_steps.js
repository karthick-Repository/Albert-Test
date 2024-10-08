const { When, Before, Given } = require('@cucumber/cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(10 * 60000)

let loginPage, landingPage, dialog

Before(async function () {
  loginPage = await this.poManager.fetchLoginPage()
  landingPage = await this.poManager.fetchLandingPage()
  dialog = await this.poManager.fetchDialog()
})

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
  const stringToClick = await landingPage.frameLocator.getByText(textToClick)
  await landingPage.webElementHandler.click(await stringToClick)
})

When('I click on Add New Account', async function () {
  const stringToClick = await landingPage.addNewAccountButton
  await landingPage.webElementHandler.click(await stringToClick)
})

When('I click on the Continue button', async function () {
  const continueButton = await this.loginPage.continueButton
  await landingPage.webElementHandler.click(await continueButton)
})

When('I click on the Sign in with Authenticator button', async function () {
  await landingPage.webElementHandler.click(await loginPage.signInWithAuthenticator_Button)
})

When('I click on the Continue button after entering the MFA code', async function () {
  const continueButton = await this.loginPage.continueButtonInSSO.first()
  await landingPage.webElementHandler.click(await continueButton)
})

When('I click on {string} menu option', async function (linkToClick) {
  const linkElement = await this.page.getByRole('link', { name: `${linkToClick}`, exact: true })
  await landingPage.webElementHandler.click(await linkElement)
  await landingPage.waitForDuration(3)
})

// When('I click on the {string} button', async function (buttonType) {
//   await landingPage.waitForDuration(2)
//   const buttonElementToUse = await this.page.getByRole('button', { name: `${buttonType}` }).last()
//   await landingPage.webElementHandler.click(await buttonElementToUse)
// })

When('I goto to the landing page of the application', async function () {
  await landingPage.gotoPage(await landingPage.landingPageURL)
})


