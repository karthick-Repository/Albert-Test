const { Before, Given, When, Then } = require('@cucumber/cucumber')

let loginPage, landingPage, mayaUrls, reportsPage

Before(async function () {
  loginPage = await this.poManager.fetchLoginPage()
  landingPage = await this.poManager.fetchLandingPage()
  reportsPage = await this.poManager.fetchReportsPage()
  mayaUrls = JSON.parse(
    JSON.stringify(require('../../utilities/configurationFiles/maya_urls.json'))
  )
})

When('I navigate to the login page in maya', async function () {
  await loginPage.gotoMayaLoginPage()
})

When('I enter the email ID in the login page and hit continue', async function () {
  await loginPage.enterMayaEmailIDAndContinue()
})

When('I login to maya', async function () {
  await loginPage.loginToMaya()
})

Then('I validate that the user is in the landing page of maya application', async function () {
  const actualText = await landingPage.webElementHandler.getText(await landingPage.landingPage_Text)
  await landingPage.assertionHandler.assertForStringContains(actualText.trim(), 'Welcome back to Albert. Click on the module headers above to start\ninnovating.')
})

When('I navigate to the {string} page in maya', async function (pageToNavigateTo) {
  await landingPage.gotoPage(mayaUrls[pageToNavigateTo])
})

Then('I validate that the headers {string} are displayed', async function (expectedHeaders) {
  const expectedHeadersToAssert = expectedHeaders.split(',').map(item => item.trim())
  const actualHeaderElements = await reportsPage.reportTableHeaders
  const actualHeadersFromUI = await reportsPage.webElementHandler.getAllTexts(await actualHeaderElements)
  await reportsPage.assertionHandler.assertObjects(actualHeadersFromUI, expectedHeadersToAssert)
})

Then('I validate the UI elements in the login page', async function () {
  await loginPage.validateUIElementsInMaya()
})

Then('I validate the UI elements in the sign in options page', async function () {
  await loginPage.validateUIElementsInSSOSigninPage()
})

When('I logout of maya', async function () {
  await loginPage.logoutOfMaya()
})

Then('I validate that the logged in user name is saved', async function () {
  const savedUser = await loginPage.webElementHandler.getText(await loginPage.addNewAccount_List.first())
  const userName = JSON.parse(
    JSON.stringify(require('../../data/loginData.json'))
  ).email
  await loginPage.assertionHandler.assertForContains(savedUser, userName)
})

When('I delete the saved user name', async function () {
  const removeUserElement = await loginPage.mayaRemoveUserButton
  await removeUserElement.click()
})

Then('I validate that the logged in user name is not saved anymore', async function () {
  await loginPage.assertionHandler.assertForElementCount(await loginPage.addNewAccount_List, 1)
})

Then('I validate that the error message {string} is displayed in the page', async function (warningMessage) {
  await loginPage.assertionHandler.assertForTextContains(await loginPage.errorMessage.first(), warningMessage)
})

Then('I validate the UI elements in the authenticator page', async function () {
  await loginPage.validateUIElementsInAuthenticatorPage()
})

When('I enter the following {string} {string}', async function (type, value) {
  type === 'email' ? await loginPage.enterSpecificEmailID(value) : await loginPage.enterSpecificPasscode(value)
})
