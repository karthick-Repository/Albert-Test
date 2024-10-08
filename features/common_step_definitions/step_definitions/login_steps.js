const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const { setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(2 * 60 * 1000)

let loginPage

Before(async function () {
  loginPage = await this.poManager.fetchLoginPage()
})

Given(
  'User logs into the application',
  async function () {
    await loginPage.gotoLoginPage()
    await loginPage.loginToTheApplication()
  }
)

When('User closes the modal dialog', async function () {
  await this.landingPage.closeModalDialog()
  await this.landingPage.selectTheTenant()
})

Then('User is in the landing page', async function () {
  // await this.landingPage.waitForURL("**/home");
  expect(await this.landingPage.validateLandingPageUIElements()).toBeTruthy()
})
