const { AssertionHandler } = require('../../utilities/AssertionHandler')
const { WebElementHandler } = require('../../utilities/WebElementHandler')

class BaseModule {
  constructor (page) {
    this.page = page
    this.refInputCell = page.locator('[aria-label="Input Editor"]')
    this.webElementHandler = new WebElementHandler(this.page)
    this.assertionHandler = new AssertionHandler(this.page)
  }
}

module.exports = { BaseModule }
