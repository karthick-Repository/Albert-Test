const { When, Before, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

let basePage, webElementHandler

Before(async function () {
  basePage = await this.poManager.fetchBasePage()
  webElementHandler = await basePage.webElementHandler
})

Then(
  'I validate that {string} is displayed as the dialog content',
  async function (expectedDialogText) {
    const dialogContentElement = await basePage.dialog.locator('p').first()
    await basePage.assertActualAndExpectedText(
      dialogContentElement,
      expectedDialogText
    )
  }
)

Then(
  'I validate that the {string} page is displayed',
  async function (pageType) {
    await basePage.waitForURL(`${pageType}`)
    await basePage.assertForURL(`${pageType}`)
  }
)

When('I goto the {string} list page', async function (component) {
  await basePage.gotoPage(basePage.envURL + component + '?sortBy=createdAt')
  await basePage.assertForURL(`${component}`)
})

When('I click on {string} tab', async function (tabName) {
  const tabElement = await basePage.getByText('tabName')
  await basePage.webElementHandler.click(tabElement)
})

Then(
  'I validate that {string} is the default owner',
  async function (owner) {
    const defaultOwnerText = await basePage.defaultOwner_Text
    const defaultOwner = await webElementHandler.getText(
      await defaultOwnerText
    )
    expect(defaultOwner).toBe(owner)
  }
)

Then('I wait till the {string} page is reloaded', async function (pageName) {
  await basePage.reloadPage()
  await basePage.waitForURL(`**/${pageName}*`)
})

When('I close the snack bar container', async function () {
  await basePage.webElementHandler.click(await basePage.snackBarContainerCloseIcon.last())
})
