const { BasePage } = require('./BasePage')

class Dialog extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.dialogBox = page.locator('p-dialog .p-dialog-content').first()
    this.dialogHeader = this.dialogBox.locator('[class*="heading"]').first()
  }

  async validateThatDialogIsDisplayed () {
    await this.assertionHandler.assertForVisibility(await this.dialogBox)
  }

  async validateHeaderOfDialog (expectedHeader) {
    await this.assertionHandler.assertActualAndExpectedText(await this.dialogHeader, expectedHeader)
  }
}

module.exports = { Dialog }
